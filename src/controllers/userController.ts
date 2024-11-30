import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  console.log(req.body)
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ name, email, password: hashedPassword });

    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
    console.log(req.body, 'sdf')
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getDashboard = (req: Request, res: Response) => {
  res.render('user/index', { user: req.body.user });
};
