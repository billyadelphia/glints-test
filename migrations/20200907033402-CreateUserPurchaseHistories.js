'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserPurchaseHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            userId: {
                allowNull: true,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            dishName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            restaurantName: {
                allowNull: true,
                type: Sequelize.STRING,
                // references: {
                //     model: 'Restaurants',
                //     key: 'restaurantName',
                // },
                // onUpdate: 'NO ACTION',
                // onDelete: 'NO ACTION',
            },
            transactionAmount: {
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
        return queryInterface.dropTable("UserPurchaseHistories");
    }
};