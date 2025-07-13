import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import admin_route from './routes/admin.route.js';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

config({ path: './config.env' });

const app = express();

// -------------------- CORS --------------------
app.use(cors({
	origin: [process.env.LOCAL_HOST],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
}));

// -------------------- Middleware --------------------
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// -------------------- Rate Limiter --------------------
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// -------------------- Routes --------------------
app.use('/api/admin', admin_route);

// -------------------- Export App --------------------
export default app;
