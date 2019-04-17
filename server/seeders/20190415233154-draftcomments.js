module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('DraftComments', [
    {
      id: '59968089-65d6-438a-b5d3-03ae275fa2de',
      userId: 'b2b67e1e-d40c-47ef-8abf-62e1a330d4ef',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      comment: 'This is a comment.',
    },
    {
      id: '3bcbff41-7285-42f4-a934-e346382f3fbc',
      userId: 'b2b67e1e-d40c-47ef-8abf-62e1a330d4ef',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      comment: 'This is a thread comment',
      parentId: '59968089-65d6-438a-b5d3-03ae275fa2de',
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('DraftComments', null, {})
  ,
};
