const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Like = db.define('Like', {
    hasUpped: {
        type: Sequelize.INTEGER,
    },
    hasUpped: {
        type: Sequelize.INTEGER,
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {updatedAt: false})

module.exports = Like;