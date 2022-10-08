module.exports = (sequelize,Sequelize) => {
    const UserSchema = sequelize.define('User',{
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            values: ['admin','member','trainer']
        },
        status: {
            type: Sequelize.STRING
        }
    });
    return UserSchema;
};