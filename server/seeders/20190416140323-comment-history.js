module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('CommentHistories', [
    {
      id: '551f7399-e112-423b-abff-8e5e6b6f95cb',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum | updated first',
      commentId: 'c22c38cf-894c-417c-acf8-68eb0712bdaa'
    },
    {
      id: 'e3852a8e-8fa9-4f27-bf6f-3afc09643c16',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum | updated again',
      commentId: 'c22c38cf-894c-417c-acf8-68eb0712bdaa'
    }
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('CommentHistories', null, {})
};
