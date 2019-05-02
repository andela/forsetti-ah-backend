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
    },
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
    },
    {
      id: 'f24afaca-a55f-44c3-9705-539f36fd8f45',
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      articleId: '8ab8f8c6-1be8-44df-8f4f-0d80e30a3522',
      comment: 'Quisque ultrices nunc at quam vulputate, vitae maximus risus pharetra'
    }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {})
};
