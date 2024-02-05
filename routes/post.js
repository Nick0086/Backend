var express = require('express');
var router = express.Router();
const { allPosts, singlePost, createPost, deletePost, updatePost, getFilteredPosts } = require('../controller/postController');
const upload = require('../middleware/multerMiddleware');

/* GET users listing. */
router.get('/',allPosts);
router.get('/post/:id' , singlePost);
router.get('/post' , getFilteredPosts);
router.put('/update/:id',updatePost);
router.delete('/delete/:id',deletePost);

// Route for creating a post with file upload
router.post('/create', upload.single('file'),createPost);

module.exports = router;
