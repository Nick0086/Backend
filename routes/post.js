var express = require('express');
var router = express.Router();
const { allPosts, singlePost, createPost, deletePost, updatePost, getFilteredPosts } = require('../controller/postController');
const upload = require('../middleware/multerMiddleware');

/* GET users listing. */
router.get('/', allPosts);
router.get('/post/:id', singlePost);
router.put('/update/:id', upload.single(`file`), updatePost);
router.post('/create', createPost);
router.get('/post', getFilteredPosts);
router.delete('/delete/:id', deletePost);
module.exports = router;
