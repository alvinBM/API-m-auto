import Sequelize from 'sequelize';
import db from '../config/database';

const categories = db.define('categories', {
    created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now
    },
    modified: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now
    },
    deleted: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Date.now
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});


export default categories;