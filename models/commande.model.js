import Sequelize from 'sequelize';
import db from '../config/database';

const Commande = db.define('commandes',{
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    client_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantite:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    panier_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
});

export default Commande;
