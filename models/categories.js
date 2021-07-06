import Sequelize from 'sequelize';
import db from '../config/database';

const Categories = db.define('categories',{
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
    nom:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Categories;
