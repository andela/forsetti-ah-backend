/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Tags', [
    {
      id: '99b3479e-f090-419f-870f-00f48c14c817',
      name: 'social',
    }, {
      id: 'ae79232b-bc94-42ca-9dec-30a39edf87e9',
      name: 'politics',
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tags', null, {})
};
