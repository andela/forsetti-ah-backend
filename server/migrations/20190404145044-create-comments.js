module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      articleId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      highlightedText: {
          allowNull: true,
          type: Sequelize.TEXT
      },
      spanId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      commentType: {
        type: Sequelize.ENUM('normal', 'criticism'),
        allowNull: true,
        defaultValue: 'normal'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
