var express = require('express');
const { countLikeOnPost, addLike, removeLike } = require('../controller/likeController');
var router = express.Router();

/* GET users listing. */
router.get('/',countLikeOnPost);
router.post('/addLike',addLike);
router.delete('/removeLike/:id',removeLike);

module.exports = router;
