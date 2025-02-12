import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRouter from './src/routes/ai.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/ai', aiRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});