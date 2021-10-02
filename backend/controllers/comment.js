const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.createComment = (req, res) => {
    User.findOne({
        attributes: ["id", "username", "email"],
        where: {id: req.body.userId}
    })
        .then(user => {
            if (!user) return res.status(401).json({message: 'Unknown user'});
            Post.findOne({where: {id: req.params.idPost}})
                .then(post => {
                    if (!post) return res.status(401).json({message: 'Unknown post'});
                    Comment.create({
                        content: req.body.content,
                        userId: user.id,
                        postId: post.id,
                        createdAt: db.DATE,
                        updatedAt: db.DATE
                    })
                        .then(() => res.status(201).json({message: 'Comment successfully created'}))
                        .catch(err => res.status(400).json({err}));
                })
                .catch(err => res.status(404).json({err}));
        })
        .catch(err => res.status(500).json({err}));
}

exports.deleteComment = (req, res) => {
    const commentId = req.params.idComment;
    const userId = req.params.idUser;

    Comment.findByPk(commentId)
        .then(comment => {
            if (comment) {
                User.findOne({
                    attributes: ["isAdmin"],
                    where: {id: userId}
                })
                    .then(user => {
                        if (userId == comment.userId || user.isAdmin == true) {
                            Comment.destroy({
                                where: {id: commentId}
                            })
                                .then(() => res.status(201).json({message: 'Comment successfully deleted'}))
                                .catch(err => res.status(400).json({err}));
                        }
                        else {
                            return res.status(403).json({ message: 'You\'re not allow to manage this comment'});
                        }
                    })
                    .catch(err => res.status(404).json({err}));
            }
        })
        .catch(err => res.status(500).json({err}));
}