//Post route requirements
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');
const multer = require('../middlewares/multer-post-config.js');

//controllers file
const postCtrl = require('../controllers/post.js');

//route endpoints
router.get('/', auth, postCtrl.getPosts);
router.get('/:id', auth, postCtrl.getPost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id/:user', auth, postCtrl.deletePost);
router.post('/:id/arrow', auth, postCtrl.manageArrows);

//Export router to the app
module.exports = router;


