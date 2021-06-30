import Sequelize from 'sequelize';
import db from '../config/database';

const user = db.define('users', {
    created: {
        type: Sequelize.DATE,
        allowNull: false
    },
    modified: {
        type: Sequelize.DATE,
        allowNull: false
    },
    deleted: {
        type: Sequelize.DATE,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    nom: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
    freezeTableName: true
});


export default user;