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
    },
    {
      id: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      firstname: 'Samorano',
      lastname: 'David',
      email: 's.david@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: 'ffffabd5-4a5b-45eb-8247-ba47a978070e',
      firstname: 'Dimkpa',
      lastname: 'Mark',
      email: 'd.mark@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: 'ab32abe7-8233-482e-a6fe-d4ffab90c9be',
      firstname: 'Joy',
      lastname: 'Adam',
      email: 'j.adam@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: 'c912c595-3ced-4fbe-b951-cd07953acef6',
      firstname: 'Somto',
      lastname: 'Chidinma',
      email: 's.chidinma@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: 'd7eeb81e-48de-45c3-8147-827c6e111290',
      firstname: 'Dele',
      lastname: 'Ola',
      email: 'd.ola@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: 'fd7355e2-5593-4547-8444-79d4bc1622bc',
      firstname: 'Biola',
      lastname: 'Saheed',
      email: 'b.saheed@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    {
      id: '47e3f628-7d76-41f5-a133-fab4ed5c8d2c',
      firstname: 'Rasheed',
      lastname: 'Kazeem',
      email: 'r.kazeem@example.com',
      password: '$2b$10$FoT6VpWTxgqUuyVs76KoSu9.NshF62b.wPEQnOp5uLJQU/8vFzyeK',
      roleId: 'd002d107-bb04-4846-9313-01a45f26306a'
    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
  ,
};
