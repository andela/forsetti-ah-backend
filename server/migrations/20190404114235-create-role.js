module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Roles', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
          },
          type: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        });
      },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Roles')
};
