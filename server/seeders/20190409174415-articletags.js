/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ArticleTags', [
    {
      tagId: '99b3479e-f090-419f-870f-00f48c14c817',
      articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577'
    }, {
      tagId: 'ae79232b-bc94-42ca-9dec-30a39edf87e9',
      articleId: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34'
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ArticleTags', null, {})
};
