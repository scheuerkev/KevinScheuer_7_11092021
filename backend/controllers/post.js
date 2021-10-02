const db = require('../models');
const Post = db.posts;
const User = db.users;
const Like = db.likes;
const Comment = db.comments;
const fs = require('fs');

exports.getPosts = (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar", "createdAt"]
            },
            {
                model: Comment,
                required: false,
                attributes: ["content", "id", "createdAt"],
                include: [
                    {
                        model: User,
                        attributes: ["id", "username", "avatar", "createdAt"]
                    },
                ],
            },
            {
                model: Like,
                required: false
            },
        ], order: [["updatedAt", "DESC"]],
    })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json({err}));
}

exports.getPost = (req, res) => {
    Post.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar", "createdAt"]
            },
            {
                model: Comment,
                required: false,
                attributes: ["content", "id", "createdAt"],
                include: [
                    {
                        model: User,
                        attributes: ["id", "username", "avatar", "createdAt"]
                    },
                ],
            },
            {
                model: Like,
                required: false
            },
        ],
    })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json({err}));
}

exports.createPost = (req, res) => {
    User.findOne({where: {id: req.body.userId}})
        .then(user => {
            let imageUrl;
            if (req.file === undefined) imageUrl = null;
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
    const userId = req.params.user;
    Post.findOne({where: {id: id}})
        .then(post => {
            if (post) {
                User.findOne({
                    attributes: ["isAdmin"],
                    where: {id: userId}
                })
                    .then((userGranted) => {
                        if (userId == post.userId || userGranted.isAdmin == true) {
                            Post.findByPk(id)
                                .then((postById) => {
                                    if (postById.image) {
                                        const filename = postById.image.split("/images/")[1];
                                        fs.unlink(`images/${filename}`, () => {
                                            Post.destroy({where: {id: postById.id}})
                                                .then(() => res.status(201).json({message: 'Post deleted successfully!'}))
                                                .catch(err => res.status(501).json({err}));
                                        });
                                    } else {
                                        Post.destroy({where: {id: postById.id}})
                                            .then(() => res.status(201).json({message: 'Post deleted successfully!'}))
                                            .catch(err => res.status(501).json({err}));
                                    }
                                })
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
                                where: {userId: req.body.userId}
                            })
                                .then(like => {
                                        if (like.hasUpped == req.body.userId) {
                                            Like.update({
                                                hasUpped: null
                                            }, {
                                                where: {id: id}
                                            })
                                                .then(() => {
                                                    Post.update({
                                                        isUp: Post.decrement('isUp', {by: 1, where: {id: id}})
                                                    }, {
                                                        where: {id: id}
                                                    })
                                                        .then(res.status(201).json({message: 'Like successfully removed!'}))
                                                        .catch(err => res.status(402).json({err}))
                                                })
                                                .catch(err => res.status(402).json({err}));
                                        } else if (like.hasDowned == req.body.userId) {
                                            Like.update({
                                                hasDowned: null
                                            }, {
                                                where: {id: id}
                                            })
                                                .then(() => {
                                                    Post.update({
                                                        isDown: Post.decrement('isDown', {by: 1, where: {id: id}})
                                                    }, {
                                                        where: {id: id}
                                                    })
                                                        .then(res.status(201).json({message: 'Dislike successfully removed!'}))
                                                        .catch(err => res.status(402).json({err}))
                                                })
                                                .catch(err => res.status(402).json({err}));

                                        }
                                    }
                                )
                        }
                    }
                )
                .catch()
            break;

        case
        1
        :
            Post.findByPk(id)
                .then(post => {
                    Like.create({
                        hasUpped: req.body.userId,
                        postId: post.id,
                        userId: req.body.userId
                    })
                        .then(() => {
                            Post.update({
                                    isUp: Post.increment('isUp', {by: 1, where: {id: id}})
                                }, {where: {id: id}}
                            )
                                .then(res.status(201).json({message: 'Like successfully added!'}))
                                .catch(err => res.status(402).json({err}));
                        })
                        .catch(err => res.status(404).json({err}));


                })
                .catch(err => res.status(500).json({err}));
            break;

        case
        -1
        :
            Post.findByPk(id)
                .then(post => {
                    Like.create({
                        hasDowned: req.body.userId,
                        postId: post.id,
                        userId: req.body.userId
                    })
                        .then(() => {
                            Post.update({
                                    isDown: Post.increment('isDown', {by: 1, where: {id: id}})
                                }, {where: {id: id}}
                            )
                                .then(res.status(201).json({message: 'Dislike successfully added!'}))
                                .catch(err => res.status(402).json({err}));
                        })
                        .catch(err => res.status(404).json({err}));


                })
                .catch(err => res.status(500).json({err}));
            break;

        default:
            return res.status(500).json({message: 'Impossible to proceed value'});
            break;
    }

}



