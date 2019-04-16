

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comments', [
    {
      id: 'bfee5ce0-d1fd-4ef3-83ce-07a03041c5e8',
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      comment: 'Hello forsetti, how is everything?'
    },
    {
      id: '41b5a92a-cd04-4b89-badb-a9c418f3b1a2',
      userId: '47e3f628-7d76-41f5-a133-fab4ed5c8d2c',
      articleId: '0be4313e-cbc8-41e3-b473-3305f3a9f79f',
      comment: 'Hello forsetti, how ARE YOU GUYS?'
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {})
  ,
};
