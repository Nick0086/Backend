var express = require('express');
var router = express.Router();
const { createComment, getComments, deleteComment, } = require('../controller/commentController');

router.get('/:id',getComments);
router.post('/addComment',createComment);
router.delete('/deletecomment/:id',deleteComment);

module.exports = router;