import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage is the app's on-device database. No Firebase or network
// connection is required for registration, sign-in, sessions, or progress.
const LOCAL_USERS_KEY = '@careertrial_local_users';
const SESSION_KEY = '@careertrial_session';
const APP_STATE_KEY_PREFIX = '@careertrial_app_state';

export const DEFAULT_USER = {
  uid: 'default-user',
  email: 'user@careertrial.app',
  password: 'password123',
  name: 'Demo User',
  createdAt: '2026-01-01T00:00:00.000Z',
};

const DEFAULT_USER_PROFILE = {
  name: 'Demo User',
  firstName: 'Demo',
  lastName: 'User',
  gender: 'prefer-not-to-say',
  age: 22,
  email: DEFAULT_USER.email,
  ageGroup: 'young-adult',
  interests: ['tech', 'business'],
  hasCompletedOnboarding: true,
};

export function createEmptyAppState(profile = {}) {
  return {
    user: {
      name: '',
      firstName: '',
      lastName: '',
      gender: null,
      age: null,
      email: '',
      ageGroup: null,
      interests: [],
      completedTrials: [],
      currentTrial: null,
      hasCompletedOnboarding: false,
      ...profile,
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
}

function getStateKey(uid) {
  return `${APP_STATE_KEY_PREFIX}_${uid || 'guest'}`;
}

// Registered users
export async function getUsers() {
  try {
    const raw = await AsyncStorage.getItem(LOCAL_USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveUsers(users) {
  await AsyncStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

export async function ensureDefaultUser() {
  const users = await getUsers();
  const existingDefault = users.find((user) => user.uid === DEFAULT_USER.uid);

  if (!existingDefault) {
    await saveUsers([...users, DEFAULT_USER]);
  }

  const defaultState = await getAppState(DEFAULT_USER.uid);
  if (!defaultState) {
    await saveAppState(
      DEFAULT_USER.uid,
      createEmptyAppState(DEFAULT_USER_PROFILE)
    );
  } else if (!defaultState.user?.hasCompletedOnboarding) {
    // Upgrade an older demo-account record while preserving any trial history.
    await saveAppState(DEFAULT_USER.uid, {
      ...createEmptyAppState(DEFAULT_USER_PROFILE),
      ...defaultState,
      user: {
        ...DEFAULT_USER_PROFILE,
        ...defaultState.user,
        name: defaultState.user?.name || DEFAULT_USER_PROFILE.name,
        email: DEFAULT_USER.email,
        age: defaultState.user?.age || DEFAULT_USER_PROFILE.age,
        ageGroup: defaultState.user?.ageGroup || DEFAULT_USER_PROFILE.ageGroup,
        interests: defaultState.user?.interests?.length
          ? defaultState.user.interests
          : DEFAULT_USER_PROFILE.interests,
        hasCompletedOnboarding: true,
      },
    });
  }
}

export async function createUser({ name, email, password }) {
  const users = await getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error('This email is already registered.');
  }

  const newUser = {
    uid: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email: normalizedEmail,
    password,
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  await saveUsers([...users, newUser]);
  await saveAppState(
    newUser.uid,
    createEmptyAppState({ name: newUser.name, email: newUser.email })
  );

  return newUser;
}

export async function findUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await getUsers();
  return users.find((user) => user.email.toLowerCase() === normalizedEmail) || null;
}

export async function verifyPassword(email, password) {
  const user = await findUserByEmail(email);
  return user && user.password === password ? user : null;
}

// Current session
export async function getSession() {
  try {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveSession(session) {
  if (session) {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    await AsyncStorage.removeItem(SESSION_KEY);
  }
}

// Profile, settings, trial history, scores, and progress for one account
export async function getAppState(uid) {
  try {
    const raw = await AsyncStorage.getItem(getStateKey(uid));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveAppState(uid, state) {
  await AsyncStorage.setItem(getStateKey(uid), JSON.stringify(state));
}
