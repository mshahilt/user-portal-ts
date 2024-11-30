import { Router } from 'express';
const userController = require('../controllers/userController');
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/register', (req, res) => res.render('user/register'));
router.post('/register', userController.registerUser);

router.get('/login', (req, res) => res.render('user/login'));
router.post('/login', userController.loginUser);

router.get('/', protect, userController.getDashboard);

export default router;
