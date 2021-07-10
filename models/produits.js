import Sequelize from 'sequelize';
import db from '../config/database';

const produits = db.define('products', {
    created: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Date.now
    },
    modified: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Date.now
    },
    deleted: {
        type: Sequelize.DATE,
        allowNull: true,
        default: Date.now
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: true
    },
    prix: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quanitite: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});


export default produits;