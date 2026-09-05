import { query, body, validationResult } from 'express-validator';

export function validate(rules) {
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Invalid input',
          details: errors.array().map(e => ({
            field: e.path,
            message: e.msg
          }))
        });
      }
      next();
    }
  ];
}

export const jobSearchRules = [
  query('q')
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage('q must be 2-120 characters')
    .matches(/^[A-Za-z0-9\s.,'&\-]+$/)
    .withMessage('q contains invalid characters'),
  query('country')
    .optional()
    .isLength({ min: 2, max: 8 })
    .withMessage('country must be 2-8 characters')
    .matches(/^[a-zA-Z]{2,8}$/)
    .withMessage('country is invalid'),
  query('page')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('page must be 1-100'),
  query('results_per_page')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('results_per_page must be 1-50'),
  query('provider')
    .optional()
    .isIn(['adzuna', 'jooble', 'usajobs'])
    .withMessage('provider must be adzuna, jooble, or usajobs'),
  query('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage('location must be 1-80 characters')
];

export const aiChatRules = [
  body('messages')
    .isArray({ min: 1, max: 20 })
    .withMessage('messages must be an array of 1-20 items'),
  body('messages.*.role')
    .isIn(['system', 'user', 'assistant'])
    .withMessage('role must be system, user, or assistant'),
  body('messages.*.content')
    .isString()
    .isLength({ min: 1, max: 4000 })
    .withMessage('content must be 1-4000 characters'),
  body('model')
    .optional()
    .isLength({ min: 1, max: 40 })
    .matches(/^[A-Za-z0-9.\-_]+$/)
    .withMessage('model is invalid'),
  body('temperature')
    .optional()
    .isFloat({ min: 0, max: 2 })
    .withMessage('temperature must be between 0 and 2')
];
