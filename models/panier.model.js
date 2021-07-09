import Sequelize from 'sequelize';
import db from '../config/database';

const Panier = db.define('paniers',{
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    created: {
        type: Sequelize.DATE,
    },
    modified: {
        type: Sequelize.DATE,
    },
    deleted: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    client_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Panier;
