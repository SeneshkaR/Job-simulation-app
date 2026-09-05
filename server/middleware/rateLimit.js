import rateLimit from 'express-rate-limit';

// In express-rate-limit v7+, ipKeyGenerator was removed. The default keyGenerator
// already uses req.ip, so we use it directly as a fallback when no user is set.
const keyGenerator = (req) =>
  (req.user && req.user.uid) || req.ip;

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 240,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator,
  message: { error: 'Too many requests' }
});

export const jobSearchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator,
  message: { error: 'Too many job searches' }
});

export const aiChatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator,
  message: { error: 'Too many AI requests' }
});
