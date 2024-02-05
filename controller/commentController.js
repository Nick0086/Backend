
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone'); const commentModel = require("../model/commentModel");


// function for create comment
exports.createComment = async (req, res) => {
    try {

        const commentData = req.body;
        commentData.createdAt = moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        commentData.updatedAt = moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        if (!commentData.Comment || !commentData.postId || !commentData.userId) {
            res.status(400).json({ message: "Missing fields" })
        } else {
            const response = await commentModel.create(commentData);
            if (response) {
                res.status(201).json({
                    status: 'success',
                    data: response,
                    message: 'Comment created successfully'
                });
            } else {
                res.status(500).json({ message: 'Failed to create new comment' });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

// function for get comments on post
exports.getComments = async (req, res) => {
    try {
        const postId = req.params.id;
        if (postId) {
            const total = await commentModel.find({ postId }).countDocuments();
            const comments = await commentModel.find({ postId }).sort("-createdAt").populate("userId", "name");
            if (comments) {
                res.status(200).json({
                    status: 'success',
                    data: comments,
                    total: total,
                });
            } else {
                res.status(500).json({ message: 'No comments found for this post...!' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error while getting comments' });
    }
};

// function for delete a specific comment  
exports.deleteComment = async (req, res) => {
    try {
        const commnetId = req.params.id;
        let deletedComment = await commentModel.findByIdAndDelete(commnetId);
        if (!deletedComment) {
            res.status(400).json({ message: "No such comment found...!" })
        } else {
            res.status(200).json({
                status: 'succes',
                message: 'Comment deleted successfully'
            });
        };
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting comment...!' });
    }
}