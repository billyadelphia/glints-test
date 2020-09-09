'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Restaurants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            restaurantName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            cashBalance: {
                allowNull: false,
                type: Sequelize.DECIMAL(16, 2),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Restaurants");
    }
};