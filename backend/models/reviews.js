const Sequelize = require('sequelize');
const sequelize = require('../database');

const Reviews = sequelize.define('reviews', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productid:{
        type: Sequelize.STRING(500),
        allowNull: true        
    },
    comment: {
        type: Sequelize.STRING(500),
        allowNull: true
    }
});

module.exports = Reviews;
