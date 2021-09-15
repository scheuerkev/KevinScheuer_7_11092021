const db = require('../config/database.js');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

exports.createComment = (req, res) => {
    User.findOne({
        attributes: ["id", "username", "email"],
        where: {id: req.body.userId}
    })
        .then(user => {
            if (!user) return res.status(401).json({message: 'Unknown user'});
            Post.findOne({where: {id: req.params.id}})
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
    Comment.findOne({where: {id: req.params.id}})
        .then(comment => {
            if (comment) {
                User.findOne({
                    attributes: ["isAdmin"],
                    where: {id: req.body.userId}
                })
                    .then(user => {
                        if (req.body.userId == comment.userId || user.isAdmin == true) {
                            Comment.destroy({
                                where: {id: req.params.id}
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