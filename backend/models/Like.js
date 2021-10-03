//Like model to feed Likes table : for arrow feature

module.exports = (sequelize, Sequelize) => {

    const Like = sequelize.define('Like', {
        hasUpped: {
            type: Sequelize.INTEGER,
        },
        hasDowned: {
            type: Sequelize.INTEGER,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {timestamps: false})
    return Like;
}
