import Sequelize from 'sequelize';
import db from '../config/database';

const Client = db.define('clients',{
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
    },
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
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nom:{
        type: Sequelize.STRING,
        allowNull: false
    },
    prenom:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "WKRHJGDJAHFhkjhead676a75f65a6d5f78z5f78ajaf7s6786FUGJBF"
    },
    telephone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    adresse:{
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Client;
