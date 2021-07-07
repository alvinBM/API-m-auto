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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false,
        field: created
    },
    modified: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
        field: modified
    },
    deleted: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP'),
        field: deleted
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
