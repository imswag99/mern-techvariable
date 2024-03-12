const express = require('express');
const { register, login, profile, deleteUser, logout, getUsers, updateUser } = require('../controllers/userCtrl');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)
router.get('/getUsers', getUsers);
router.get('/profile', authenticate, profile);
router.delete('/deleteUser/:id', authenticate, deleteUser);
router.put('/updateUser/:id', authenticate, updateUser);

module.exports = router;