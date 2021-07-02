import Sequelize from 'sequelize';
import db from '../config/database';

const Panier = db.define('paniers',{
    id: {
        type: sequelize.BIGINT,
        allowNull: false
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
    commande_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Panier;
