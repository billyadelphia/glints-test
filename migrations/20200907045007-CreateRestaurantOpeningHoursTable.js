'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('RestaurantOpeningHours', {
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
            day: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            from: {
                allowNull: false,
                type: Sequelize.TIME,
            },
            to: {
                allowNull: false,
                type: Sequelize.TIME,
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