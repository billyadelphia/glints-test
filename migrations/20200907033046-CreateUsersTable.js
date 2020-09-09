'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            cashBalance: {
                allowNull: false,
                type: Sequelize.DECIMAL(16, 2),
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING,
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
        return queryInterface.dropTable("Users");
    }
};