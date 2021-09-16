const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./User.js')(sequelize, Sequelize);
db.posts = require('./Post.js')(sequelize, Sequelize);
db.comments = require('./Comment.js')(sequelize, Sequelize);
db.likes = require('./Like.js')(sequelize,Sequelize);

db.users.hasMany(db.posts, { onDelete: "CASCADE", hooks: true });
db.users.hasMany(db.comments, { onDelete: "CASCADE", hooks: true });
db.users.hasMany(db.likes, { onDelete: "CASCADE", hooks: true });

db.posts.belongsTo(db.users, {foreignKey: "userId"});
db.posts.hasMany(db.comments, { onDelete: "CASCADE", hooks: true });
db.posts.hasMany(db.likes, { onDelete: "CASCADE", hooks: true });

db.comments.belongsTo(db.users, {foreignKey: "userId"});
db.comments.belongsTo(db.posts, {foreignKey: "postId"});

db.likes.belongsTo(db.users, {foreignKey: "userId"});
db.likes.belongsTo(db.posts, {foreignKey: "postId"});

module.exports = db;