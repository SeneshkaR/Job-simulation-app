import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: {
    name: '',
    age: null,
    email: '',
    ageGroup: null, // 'teen' (13-17) | 'young-adult' (18-24) | 'adult' (25+)
    interests: [],
    completedTrials: [],
    currentTrial: null,
  },
  trials: {
    active: null,
    history: [],
  },
  scores: [],
  comparisons: [],
  notifications: [],
  settings: {
    openaiKey: '',
    notificationsEnabled: true,
    hapticEnabled: true,
  },
};

function appReducer(state, action) {
  switch (action.type) {
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

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };

    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (data) => dispatch({ type: 'SET_USER', payload: data }),
    startTrial: (trial) => dispatch({ type: 'START_TRIAL', payload: trial }),
    updateTrial: (data) => dispatch({ type: 'UPDATE_TRIAL', payload: data }),
    completeTrial: (data) => dispatch({ type: 'COMPLETE_TRIAL', payload: data }),
    addScore: (score) => dispatch({ type: 'ADD_SCORE', payload: score }),
    addToComparison: (item) => dispatch({ type: 'ADD_TO_COMPARISON', payload: item }),
    removeFromComparison: (careerId) => dispatch({ type: 'REMOVE_FROM_COMPARISON', payload: careerId }),
    addNotification: (notif) => dispatch({ type: 'ADD_NOTIFICATION', payload: notif }),
    dismissNotification: (id) => dispatch({ type: 'DISMISS_NOTIFICATION', payload: id }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
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
