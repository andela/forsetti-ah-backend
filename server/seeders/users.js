/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      id: 'fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8',
      firstname: 'Gildard',
      lastname: 'Dickson',
      email: 'gildard@dickson.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeKdickson',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: 'b2b67e1e-d40c-47ef-8abf-62e1a330d4ef',
      firstname: 'Melanie',
      lastname: 'Dara',
      email: 'melanie@dara.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'a11f440b-eae3-4d28-990d-700c7b965709'
    },
    {
      id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      firstname: 'Mofe',
      lastname: 'Okoro',
      email: 'mofe@okoro.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
  ,
};
