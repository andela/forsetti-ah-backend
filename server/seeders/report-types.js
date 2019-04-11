module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ReportTypes', [
    {
      id: 'fc73ad52-1b04-4cba-a54f-e88b74555472',
      name: 'Plagiarism'
    },
    {
      id: 'b2b67e1e-d40c-47ef-8abf-62e1a330d4ef',
      name: 'Rules violation'
    }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ReportTypes', null, {}),
};
