var express = require('express');
const { allPosts, singlePost, createPost, deletePost, updatePost, getFilteredPosts } = require('../controller/postController');
var router = express.Router();

/* GET users listing. */
router.get('/',allPosts);
router.get('/post/:id' , singlePost);
router.get('/post' , getFilteredPosts);
router.post('/create',createPost);
router.put('/update/:id',updatePost);
router.delete('/delete/:id',deletePost);

module.exports = router;
