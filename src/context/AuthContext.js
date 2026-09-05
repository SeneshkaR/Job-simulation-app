import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  createUser,
  ensureDefaultUser,
  findUserByEmail,
  getSession,
  saveSession,
  verifyPassword,
} from '../database/localDatabase';

const AuthContext = createContext();

function toSessionUser(account) {
  return {
    uid: account.uid,
    email: account.email,
    displayName: account.name,
    name: account.name,
    provider: 'local',
    isGuest: false,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize the on-device database and restore the saved local session.
  useEffect(() => {
    const init = async () => {
      try {
        await ensureDefaultUser();
        const session = await getSession();

        if (session?.isGuest) {
          // Explore sessions are temporary; every new app launch starts at Welcome.
          await saveSession(null);
        } else if (session?.email) {
          const account = await findUserByEmail(session.email);
          if (account) {
            setUser(toSessionUser(account));
          } else {
            await saveSession(null);
          }
        }
      } catch (err) {
        console.warn('Failed to initialize local authentication', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const loginWithEmail = async (email, password) => {
    setError(null);

    try {
      const account = await verifyPassword(email, password);
      if (!account) {
        throw new Error('Invalid email or password.');
      }

      const sessionUser = toSessionUser(account);
      await saveSession(sessionUser);
      setUser(sessionUser);
      return sessionUser;
    } catch (err) {
      const message = err.message || 'Unable to sign in.';
      setError(message);
      throw err;
    }
  };

  const register = async (email, password, name) => {
    setError(null);

    try {
      const account = await createUser({ name, email, password });
      const sessionUser = toSessionUser(account);
      await saveSession(sessionUser);
      setUser(sessionUser);
      return sessionUser;
    } catch (err) {
      const message = err.message || 'Unable to create the account.';
      setError(message);
      throw err;
    }
  };

  const continueAsGuest = useCallback(async () => {
    setError(null);
    const guestSession = {
      uid: `guest-${Date.now()}`,
      email: '',
      displayName: 'Guest',
      name: 'Guest',
      provider: 'guest',
      isGuest: true,
    };

    setUser(guestSession);
    return guestSession;
  }, []);

  const logout = async () => {
    setError(null);
    try {
      await saveSession(null);
      setUser(null);
    } catch (err) {
      setError(err.message || 'Unable to sign out.');
      throw err;
    }
  };

  const clearError = () => setError(null);
  const isAuthenticated = Boolean(user && !user.isGuest);
  const isGuest = Boolean(user?.isGuest);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        isGuest,
        loginWithEmail,
        register,
        continueAsGuest,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
