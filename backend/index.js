import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {

  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
