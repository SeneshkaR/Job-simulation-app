import admin from 'firebase-admin';

let initialized = false;
let authInstance = null;

// FIX (Bug #2): Handle the case where Firebase Admin credentials are not configured.
// Previously, if FIREBASE_PRIVATE_KEY was missing or invalid, admin.initializeApp()
// would throw, crashing every single request that hits requireAuth.
//
// Now: if credentials are missing, the server either:
//   a) Uses dev bypass (if ALLOW_DEV_AUTH_BYPASS=true) — no auth needed
//   b) Returns clear 401 error with setup instructions

const hasFirebaseCredentials = () =>
  Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY &&
    !process.env.FIREBASE_PRIVATE_KEY.includes('your-')
  );

const isDevBypassEnabled = () =>
  process.env.ALLOW_DEV_AUTH_BYPASS === 'true';

export function getAuth() {
  if (!initialized) {
    if (!hasFirebaseCredentials()) {
      if (isDevBypassEnabled()) {
        console.warn('[auth] Firebase credentials not configured — dev bypass enabled, all requests allowed');
      } else {
        console.error('[auth] Firebase credentials not configured! Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in server/.env');
        console.error('[auth] Or set ALLOW_DEV_AUTH_BYPASS=true for local development without Firebase');
      }
      initialized = true;
      return null;
    }

    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
        })
      });
      authInstance = admin.auth();
      initialized = true;
    } catch (error) {
      console.error('[auth] Failed to initialize Firebase Admin:', error.message);
      initialized = true;
      return null;
    }
  }
  return authInstance;
}

export async function requireAuth(req, res, next) {
  // FIX: Dev bypass — skip token verification entirely when enabled
  if (isDevBypassEnabled()) {
    req.user = { uid: 'dev-user' };
    return next();
  }

  // If Firebase is not configured and dev bypass is off, return helpful error
  const firebaseAuth = getAuth();
  if (!firebaseAuth) {
    return res.status(503).json({
      error: 'Server auth not configured',
      hint: 'Set Firebase credentials in server/.env or set ALLOW_DEV_AUTH_BYPASS=true for development'
    });
  }

  const header = req.get('Authorization') || '';
  const match = /^Bearer (.+)$/i.exec(header);
  if (!match) {
    return res.status(401).json({ error: 'Missing bearer token — please log in' });
  }
  try {
    const decoded = await firebaseAuth.verifyIdToken(match[1]);
    req.user = { uid: decoded.uid };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token — please log in again' });
  }
}
