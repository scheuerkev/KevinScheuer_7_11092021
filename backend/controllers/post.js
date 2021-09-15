const db = require('../config/database.js');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Like = require('../models/Like.js');
const Comment = require('../models/comment.js');
const fs = require('fs');

exports.getPosts = (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ["username", "avatar", "createdAt"]
            },
            {
                model: Comment,
                required: false,
                attributes: ["content", "id"],
                include: [
                    {
                        model: User,
                        attributes: ["username", "avatar", "createdAt"]
                    },
                ],
            },
            {
                model: Like,
                required: false
            },
        ], order : [["updatedAt", "DESC"]],
    })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json({err}));
}

exports.getPost = (req, res) => {
    Post.findOne({where: {id: req.params.id}})
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json({err}));
}

exports.createPost = (req, res) => {
    User.findOne({where: {id: req.body.userId}})
        .then(user => {
            let imageUrl;
            if (req.file == undefined) imageUrl = null;
            else imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

            Post.create({
                title: req.body.title,
                content: req.body.content,
                image: imageUrl,
                userId: user.id,
                createdAt: db.DATE,
                updatedAt: db.DATE,
                isUp: 0,
                isDown: 0
            })
                .then(() => res.status(201).json({message: 'Post created successfully!'}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(500).json({err}));
}

exports.updatePost = (req, res) => {
    const id = req.params.id;
    const postObject = req.file ?
        {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.id,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } :
        {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.id
        }
    Post.findOne({where: {id: id}})
        .then(post => {
            if (post) {
                User.findOne({
                        attributes: ["isAdmin"],
                        where: {id: req.body.userId}
                    }
                )
                    .then((userGranted) => {
                        if (req.body.userId == post.userId || userGranted.isAdmin == true) {
                            Post.findByPk(id)
                                .then(() => {
                                    Post.update(postObject, {
                                        where: {id: id}
                                    })
                                        .then(() => res.status(201).json({message: 'Post updated successfully!'}))
                                        .catch(err => res.status(400).json({err}));
                                })
                                .catch(err => res.status(500).json({err}));
                        } else {
                            return res.status(403).json({message: "You're not allow to update this message"});
                        }
                    })
                    .catch(err => res.status(400).json({err}));
            }
        })
        .catch(err => res.status(400).json({err}));
}

exports.deletePost = (req, res) => {
    const id = req.params.id;
    Post.findOne({where: {id: id}})
        .then(post => {
            if (post) {
                User.findOne({
                    attributes: ["isAdmin"],
                    where: {id: req.body.userId}
                })
                    .then((userGranted) => {
                        if (req.body.userId == post.userId || userGranted.isAdmin == true) {
                            Post.findByPk(id)
                                .then((postById) => {
                                    if (postById.image) {
                                        const filename = postById.image.split("/images/")[1];
                                        fs.unlink(`images/${filename}`, () => {
                                            Post.destroy({where: {id: postById.id}})
                                                .then(() => res.end())
                                                .catch(err => res.status(501).json({err}));
                                        });
                                    } else {
                                        Post.destroy({where: {id: postById.id}})
                                            .then(() => res.end())
                                            .catch(err => res.status(501).json({err}));
                                    }
                                })
                                .then(() => res.status(201).json({message: 'Post deleted successfully!'}))
                                .catch(err => res.status(401).json({err}));
                        } else {
                            return res.status(403).json({message: "You're not allow to delete this message"});
                        }
                    })
                    .catch(err => res.status(402).json({err}));
            }
        })
        .catch(err => res.status(404).json({err}));
}

exports.manageArrows = (req, res) => {
    const id = req.params.id;
    switch (req.body.isUp) {
        case 0:
            Post.findByPk(id)
                .then(post => {
                    if (post) {
                        Like.findOne({
                            attributes: ["hasUpped", "hasDowned", "userId", "postId"],
                            where: {userId: post.UserId}
                        })
                            .then(like => {
                                if (like.hasUpped == req.userId) {

                                }
                                if (like.hasDowned == req.userId) {

                                }
                            })
                    }
                })
                .catch()
            break;

        case 1:
            Post.update()
    }
}





