const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

const commentCtrl = require('../controllers/comment.js');

router.post('/:idPost', auth,  commentCtrl.createComment);
router.delete('/:idComment/user/:idUser', auth, commentCtrl.deleteComment);

module.exports = router;