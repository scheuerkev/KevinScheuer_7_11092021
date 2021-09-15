const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

const commentCtrl = require('../controllers/comment.js');

router.post('/:id/comment', auth,  commentCtrl.createComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;