import { Router } from 'express';
const adminController = require('../controllers/adminController');

const router = Router();

router.get('/login', (req, res) => res.render('admin/login'));
router.post('/login', adminController.loginAdmin);

router.get('/dashboard', adminController.getDashboard);
router.post('/edit-user/:id', adminController.editUser);
router.get('/add-user', adminController.addUserGet);
router.post('/add-user', adminController.addUserPost);
router.post('/delete-user/:id', adminController.deleteUser)
export default router;
