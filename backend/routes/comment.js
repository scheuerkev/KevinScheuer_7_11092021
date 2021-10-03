//Comment route requirements
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

//controllers file
const commentCtrl = require('../controllers/comment.js');

//route endpoints
router.post('/:idPost', auth, commentCtrl.createComment);
router.delete('/:idComment/user/:idUser', auth, commentCtrl.deleteComment);

//Export router to the app
module.exports = router;