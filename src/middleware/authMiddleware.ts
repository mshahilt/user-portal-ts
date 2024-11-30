import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  console.log('token', token);
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
    console.log('decoded', decoded);
    const user = await User.findById(decoded.id).select('-password');
    console.log('user', user);
    if (!user) {
      return res.redirect('/login');
    }

    req.body.user = user;
    next();
  } catch (error) {
    console.log('error', error);
    res.redirect('/login');
  }
};

