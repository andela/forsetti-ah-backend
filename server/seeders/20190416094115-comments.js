module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comments', [
    {
      id: 'c22c38cf-894c-417c-acf8-68eb0712bdaa',
      userId: 'b2b67e1e-d40c-47ef-8abf-62e1a330d4ef',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum'
    },
    {
      id: 'c0f22eac-218b-43ff-b998-caf67d5b9ce8',
      userId: 'fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      comment: 'Fusce aliquet metus at tristique dapibus'
    },
    {
      id: 'bcf38432-2c98-4008-afaf-e510eb9c69e5',
      userId: 'fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      comment: 'Quisque ultrices nunc at quam vulputate, vitae maximus risus pharetra'
    }
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {})
};
