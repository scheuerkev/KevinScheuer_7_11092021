//Post model to feed Posts table

module.exports = (sequelize, Sequelize) => {

    const Post = sequelize.define('Post', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        isUp: {
            type: Sequelize.BOOLEAN
        },
        isDown: {
            type: Sequelize.BOOLEAN
        }
    });
    return Post;
}

