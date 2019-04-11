module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Claps', [
    {
      id: 'c22c38cf-894c-417c-acf8-68eb0712bdaa',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      userId: 'b2b67e1e-d40c-47ef-8abf-62e1a330d4ef'
    },
    {
      id: 'c699ed24-6f95-46fe-9de7-27647e54cdfe',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4'
    }
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Claps', null, {})
};
