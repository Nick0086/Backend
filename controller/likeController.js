const likeModel = require("../model/likeModel")

// functionn for add like
exports.addLike = async (req, res) => {
    try {
        const likeExist = await likeModel.findOne({ userId: req.body.userId, postId: req.body.postId });
        if (likeExist) {
            return res.status(409).json({ message: 'You already liked this post' });
        }

        const newLike = await likeModel.create(req.body);
        if (!newLike) return res.status(500).json('Server error')
        return res.status(201).json({
            message: "Like Add",
            data: newLike
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};

// function for remove like
exports.removeLike = async (req, res) => {
    try {
        // find the like in database by id and delete it
        const like = await likeModel.findByIdAndDelete(req.params.id);
        if (!like) return res.status(404).json({ message: "Like not found" });
        return res.status(200).json({
            message: "Like removed successfully!"
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// function for coount like  on a post and check user already like or not
exports.countLikeOnPost = async (req, res) => {
    try {
        let likes = await likeModel.find({ postId: req.params.id }).count();
        let isUserLiked = await likeModel.findOne({ userId: req.body.userId, postId: req.body.postId });
        return res.status(200).json({
            countLikes: likes,
            isUserLiked: isUserLiked ? true : false
        })
    } catch (error) {
        console.error("Error from counting likes on posts");
        return res.status(500).send(error);
    }
}


