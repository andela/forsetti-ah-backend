/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [
    {
      id: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4'
    },
    {
      id: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com'
    },
    {
      id: '0be4313e-cbc8-41e3-b473-3305f3a9f79f',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com'
    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
  ,
};
