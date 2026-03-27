import dotenv from "dotenv";
dotenv.config();
import express from "express";
import './modules/categories/Category.model.js';
import authRoutes from './modules/auth/auth.route.js';
import userRouter from './modules/users/user.route.js';
import workerRoutes from './modules/workers/worker.route.js';

import mongoose from "mongoose";
const app = express();

app.use(express.json());

// هنا تحطي كل routes
// app.use("/api/users", userRoutes);
console.log('📊 Registered models:', mongoose.modelNames());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRouter);
app.use('/api/workers', workerRoutes);

export default app;