/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [
    {
      id: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
    },
    {
      id: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
    },
    {
      id: '0be4313e-cbc8-41e3-b473-3305f3a9f79f',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
    },
    {
      id: 'ddbc0491-f25b-44c1-a5df-25795fc7fada',
      title: 'Test Article 1',
      slug: 'Gildard is working on it-12345678',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ac nulla ut pulvinar.',
      description: 'gildard@dickson.com',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
    },
    {
      id: '8ec9d2a8-89c0-4af5-9406-240eb9fc1746',
      title: 'Test Article 2',
      slug: 'Gildard is working on it-12345678',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ac nulla ut pulvinar',
      description: 'gildard@dickson.com',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
  ,
};
