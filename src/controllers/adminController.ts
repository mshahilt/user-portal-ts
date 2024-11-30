import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs'

export const loginAdmin = async (req: Request, res: Response) => {
    console.log('login worked');
    console.log(req.body);
    const email : string = req.body.email;
    const pass : string = req.body.pass;

    if(email === 'admin' && pass === 'pass') {
      res.redirect('/admin/dashboard')
    }
};
export const getDashboard = async (req: Request, res: Response) => {
    const users = await User.find();
    res.render('admin/dashboard',{users})
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'An error occurred while updating the user' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      console.log('log worked');
      console.log(userId)
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
};
export const addUserGet = (req: Request, res: Response) => {
    res.render('admin/addUser');
};

export const addUserPost = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect('/admin/dashboard')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};