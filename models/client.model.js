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
    telephone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    adresse:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Client;
