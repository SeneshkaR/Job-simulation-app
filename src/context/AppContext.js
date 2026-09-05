import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { createEmptyAppState, getAppState, saveAppState } from '../database/localDatabase';
import { useAuth } from './AuthContext';

const AppContext = createContext();
const initialState = createEmptyAppState();

function mergePersistedState(savedState) {
  const emptyState = createEmptyAppState();
  return {
    ...emptyState,
    ...savedState,
    user: { ...emptyState.user, ...savedState?.user },
    trials: { ...emptyState.trials, ...savedState?.trials },
    settings: { ...emptyState.settings, ...savedState?.settings },
  };
}

export async function loadPersistedStateForUser(uid) {
  try {
    const savedState = await getAppState(uid);
    return savedState ? mergePersistedState(savedState) : null;
  } catch (err) {
    console.warn('Failed to load persisted state for user', err);
    return null;
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_FULL_STATE':
      return mergePersistedState(action.payload);

    case 'SET_USER':
      return { ...state, user: { ...state.user, ...action.payload } };

    case 'START_TRIAL':
      return {
        ...state,
        trials: { ...state.trials, active: action.payload },
        user: { ...state.user, currentTrial: action.payload.id },
      };

    case 'UPDATE_TRIAL':
      return {
        ...state,
        trials: {
          ...state.trials,
          active: { ...state.trials.active, ...action.payload },
        },
      };

    case 'COMPLETE_TRIAL':
      const completedTrial = { ...state.trials.active, ...action.payload, completedAt: new Date().toISOString() };
      return {
        ...state,
        trials: {
          active: null,
          history: [...state.trials.history, completedTrial],
        },
        user: {
          ...state.user,
          currentTrial: null,
          completedTrials: [...state.user.completedTrials, completedTrial.id],
        },
      };

    case 'ADD_SCORE':
      return { ...state, scores: [...state.scores, action.payload] };

    case 'ADD_TO_COMPARISON':
      if (state.comparisons.find(c => c.careerId === action.payload.careerId)) return state;
      return { ...state, comparisons: [...state.comparisons, action.payload] };

    case 'REMOVE_FROM_COMPARISON':
      return { ...state, comparisons: state.comparisons.filter(c => c.careerId !== action.payload) };

    case 'CLEAR_COMPARISONS':
      return { ...state, comparisons: [] };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };

    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'RESET':
      return createEmptyAppState(action.payload);

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [hydratedForUid, setHydratedForUid] = useState(null);
  const activeUid = user?.uid || null;

  // Load persisted state whenever the signed-in user changes.
  useEffect(() => {
    if (authLoading) return undefined;
    let cancelled = false;

    const loadState = async () => {
      try {
        const raw = await getAppState(activeUid);
        if (cancelled) return;

        if (raw) {
          dispatch({ type: 'SET_FULL_STATE', payload: raw });
        } else {
          // Never carry profile or history from one account into another.
          dispatch({
            type: 'RESET',
            payload: user
              ? {
                  name: user.name || user.displayName || '',
                  email: user.email || '',
                  hasCompletedOnboarding: Boolean(user.isGuest),
                }
              : undefined,
          });
        }
      } catch (err) {
        if (!cancelled) console.warn('Failed to load app state', err);
      } finally {
        if (!cancelled) {
          setHydratedForUid(activeUid);
          setHydrated(true);
        }
      }
    };

    setHydrated(false);
    setHydratedForUid(null);
    loadState();

    return () => {
      cancelled = true;
    };
  }, [activeUid, authLoading]);

  // Persist only after the currently active account has finished hydrating.
  useEffect(() => {
    if (!user || user.isGuest || !hydrated || hydratedForUid !== activeUid || authLoading) return;

    const saveState = async () => {
      try {
        await saveAppState(activeUid, state);
      } catch (err) {
        console.warn('Failed to save app state', err);
      }
    };

    saveState();
  }, [state, activeUid, user?.isGuest, hydrated, hydratedForUid, authLoading]);

  const actions = {
    setUser: (data) => dispatch({ type: 'SET_USER', payload: data }),
    startTrial: (trial) => dispatch({ type: 'START_TRIAL', payload: trial }),
    updateTrial: (data) => dispatch({ type: 'UPDATE_TRIAL', payload: data }),
    completeTrial: (data) => dispatch({ type: 'COMPLETE_TRIAL', payload: data }),
    addScore: (score) => dispatch({ type: 'ADD_SCORE', payload: score }),
    addToComparison: (item) => dispatch({ type: 'ADD_TO_COMPARISON', payload: item }),
    removeFromComparison: (careerId) => dispatch({ type: 'REMOVE_FROM_COMPARISON', payload: careerId }),
    clearComparisons: () => dispatch({ type: 'CLEAR_COMPARISONS' }),
    addNotification: (notif) => dispatch({ type: 'ADD_NOTIFICATION', payload: notif }),
    dismissNotification: (id) => dispatch({ type: 'DISMISS_NOTIFICATION', payload: id }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
  };

  // Do not render one account's screen while another account is loading.
  if (!hydrated || hydratedForUid !== activeUid) return null;

  return (
    <AppContext.Provider value={{ state, hydrated, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
