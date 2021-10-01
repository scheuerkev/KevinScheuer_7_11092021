const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');
const multerAvatar = require('../middlewares/multer-avatar-config.js');
const passwordValidator = require('../middlewares/passwordValidator.js');

//User routes requirements
const userCtrl = require('../controllers/user.js');

//User CRUD
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getProfile);
router.get('/me', auth, userCtrl.getMe);
router.put('/profile/:id', auth, multerAvatar, userCtrl.updateProfile);
router.delete('/profile/:id', auth, userCtrl.deleteProfile);


//Export router to the app
module.exports = router;