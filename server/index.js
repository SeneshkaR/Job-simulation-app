import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs.js';
import aiRouter from './routes/ai.js';
import careersRouter from './routes/careers.js';
import { globalLimiter } from './middleware/rateLimit.js';

const app = express();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));

app.use(globalLimiter);

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'job-simulation-ai-server' });
});

app.use('/api/jobs', jobsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/careers', careersRouter);

app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(err.status || 500).json({ error: 'Server error' });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
