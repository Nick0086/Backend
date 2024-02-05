const commentModel = require("../model/commentModel");


// function for create comment
exports.createComment = async (req, res) => {
    try {

        const commentData = req.body;

        if (!commentData.text || !commentData.postId || !commentData.userId) {
            res.status(400).json({ message: "Missing fields" })
        } else {
            const response = await commentModel.create(commentData);
            if (response) {
                res.status(201).json({
                    status: 'success',
                    data: response,
                    message: 'Comment Create'
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
            const total = await commentModel.find(postId).countDocuments();
            const comments = await commentModel.findByPostId(postId);
            if (comments) {
                res.status(200).json({
                    status: 'success',
                    data: comments,
                    total: total,
                });
            } else {
                res.status(500).json({ message: 'No such Post in the database' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error during getting comments ' });
    }
};

// function for delete a specific comment  
exports.deleteComment = async (req, res) => {
    try {
        const commnetId = req.params.id;
        let deletedComment = await commentModel.remove(commnetId);
        if (!deletedComment) {
            res.status(400).json({ message: "No such Comment in the database." })
        } else {
            res.status(200).json({
                status: 'succes',
                message: 'Comment Delete'
            });
        };
    } catch (error) {
        console.log('Error in deleting comment : ', error);
        res.status(500).json({ message: 'Server Error while Deleting Comment.' });
    }
}