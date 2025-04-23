import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db-config.js';
import bootStrap from './boot-strap.js';
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB 
connectDb();

bootStrap(app);
