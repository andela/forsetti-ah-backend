

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Bookmarks', [{
    id: '676af7e4-1dab-41b3-bcaa-9175d962f547',
    articleId: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
    userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43'
  }, {
    id: '7ee668b7-ccb6-4f60-9c35-3ddc2c629339',
    articleId: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34',
    userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43'
  }, {
    id: '0fa26f93-65ac-4da1-bda9-3abf67ec0eef',
    articleId: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34',
    userId: 'ffffabd5-4a5b-45eb-8247-ba47a978070e'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Bookmarks', null, {})
};
