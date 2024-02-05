const likeModel = require("../model/likeModel")

// functionn for add like
exports.addLike = async (req, res) => {
    try {
        const likeExist = await likeModel.findOne({ userId: req.body.userId, postId: req.body.postId });
        if (likeExist) {
            res.status(409).json({ message: 'You already liked this post' });
        }

        const newLike = await likeModel.create(req.body);
        if (!newLike) return res.status(500).json('Server error');
        res.status(201).json({
            message: "Like Add successfully!",
            likeId: newLike.id
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// function for remove like
exports.removeLike = async (req, res) => {
    try {
        // find the like in database by id and delete it
        const like = await likeModel.findByIdAndDelete(req.params.id);
        if (!like) res.status(404).json({ message: "Like not found" });
        res.status(200).json({
            message: "Like removed successfully!"
        })
    } catch (err) {
        res.status(500).send(err);
    }
};

// function for coount like  on a post and check user already like or not
exports.countLikeOnPost = async (req, res) => {
    try {
        let likes = await likeModel.find({ postId: req.query.postId })
        let isUserLiked = await likeModel.findOne(req.query);
        res.status(200).json({
            countLikes: likes.length,
            isUserLiked: isUserLiked ? true : false,
            likeId: isUserLiked.id,
        })
    } catch (error) {
        res.status(500).send(error);
    }
};
