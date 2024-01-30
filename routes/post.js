var express = require('express');
const { allPosts, singlePost, createPost, deletePost, updatePost } = require('../controller/postController');
var router = express.Router();

/* GET users listing. */
router.get('/',allPosts);
router.get('/post/:id' , singlePost);
router.post('/create',createPost);
router.post('/update/:id',updatePost);
router.delete('/delete/:id',deletePost);

module.exports = router;
