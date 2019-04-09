/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Followers', [
    {
      followee: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      follower: 'ab32abe7-8233-482e-a6fe-d4ffab90c9be'
    },
    {
      followee: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      follower: 'ffffabd5-4a5b-45eb-8247-ba47a978070e',
    },
    {
      followee: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      follower: 'c912c595-3ced-4fbe-b951-cd07953acef6',
    },
    {
      followee: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      follower: 'd7eeb81e-48de-45c3-8147-827c6e111290',
    },
    {
      followee: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      follower: 'fd7355e2-5593-4547-8444-79d4bc1622bc',
    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Followers', null, {})
  ,
};
