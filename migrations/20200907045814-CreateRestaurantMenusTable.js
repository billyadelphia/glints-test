'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('RestaurantMenus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            restaurantId: {
                allowNull: true,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Restaurants',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            dishName: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            price: {
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
        return queryInterface.dropTable("RestaurantOpeningHours");
    }
};