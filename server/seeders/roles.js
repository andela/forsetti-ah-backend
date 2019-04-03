module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      id: 'd002d107-bb04-4846-9313-01a45f26306a',
      type: 'user'
    },
    {
      id: 'a11f440b-eae3-4d28-990d-700c7b965709',
      type: 'superadmin'
    },
    {
      id: 'b26180b4-b84f-42c3-bc2f-842854d4b6cb',
      type: 'admin'
    }
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
