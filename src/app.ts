import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', userRoutes);
app.use('/admin', adminRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
