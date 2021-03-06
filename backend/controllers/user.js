//Controller user requirements
const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

//Dotenv requirement to load locals env variables
require('dotenv').config();

//regexp mask definition
const emailMask = /^[a-z0-9-_]*[.]{0,1}[a-zA-Z0-9-_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,15}){1}$/;


//login controller looking for matching credentials in db and allow user to connect with existing account
exports.signup = (req, res) => {
    if (!(emailMask.test(req.body.email))) {
        return res.status(400).json({message: 'Please provide a valid email address'});
    }
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user) return res.status(409).json({message: 'This user already exists'});
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        avatar: req.body.image,
                        isAdmin: req.body.isAdmin,
                        createdAt: db.DATE,
                        updatedAt: db.DATE
                    })
                        .then((user) => {
                            res.status(201).json({
                                message: 'User successfully created',
                                id: user.id
                            });
                        })
                        .catch(err => res.status(400).json({err}));
                })
                .catch(err => res.status(404).json({err}));
        })
        .catch(err => res.status(400).json({err}));
};

//login controller : look for one user by his email and then compare bwt crypt passwords
exports.login = (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) return res.status(404).json({message: 'Unable to find user with this email'});

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({message: 'The provided password is incorrect'});

                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            {userId: user.id},
                            process.env.TOKEN_KEY,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(err => res.status(500).json({err}));
        })
        .catch(err => res.status(500).json({err}));
};

//to get profile info from one user by his id provided by url
exports.getProfile = (req, res) => {
    User.findOne({where: {id: req.params.id}})
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(400).json({err}));
}

//update allow user to put new datas in DB, check if request contains files
exports.updateProfile = (req, res) => {
    const userObject = req.file ?
        {
            ...req.body,
            avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
        } : {...req.body}
    User.update({...userObject, id: req.params.id}, {where: {id: req.params.id}})
        .then(() => res.status(200).json({message: 'User successfully updated'}))
        .catch(err => res.status(400).json({err}));
}

//to delete one profile by his id. if avatar exists, unlink it to remove it from server
exports.deleteProfile = (req, res) => {
    User.findOne({where: {id: req.params.id}})
        .then(profile => {
            const filename = profile.avatar.split('/images/avatars/')[1];
            fs.unlink(`images/avatars/${filename}`, () => {
                User.destroy({where: {id: req.params.id}})
                    .then(() => res.status(200).json({message: 'User successfully deleted'}))
                    .catch(err => res.status(400).json({err}));
            });
        })
        .catch(err => res.status(500).json({err}));
}

//getMe controller is linked to a get route to provide all user info after providing auth token and decode it
exports.getMe = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    User.findOne({where: {id: userId}})
        .then(profile => res.status(201).json({
            userId: userId,
            username: profile.username,
            email: profile.email,
            avatar: profile.avatar,
            isAdmin: profile.isAdmin,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        }))
        .catch(err => res.status(400).json({err}))
}
