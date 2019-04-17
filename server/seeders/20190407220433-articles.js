/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [
    {
      id: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      readingTime: '1 min read',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg',
      published: true,
    },
    {
      id: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      readingTime: '1 min read',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: '0be4313e-cbc8-41e3-b473-3305f3a9f79f',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      readingTime: '3 min read',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: 'ddbc0491-f25b-44c1-a5df-25795fc7fada',
      title: 'Test Article 1',
      slug: 'Gildard is working on it-12345678',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ac nulla ut pulvinar.',
      description: 'gildard@dickson.com',
      readingTime: '1 min read',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: '8ec9d2a8-89c0-4af5-9406-240eb9fc1746',
      title: 'Test Article 2',
      slug: 'Gildard is working on it-12345678',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ac nulla ut pulvinar',
      description: 'gildard@dickson.com',
      readingTime: '5 min read',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg',
      published: true,
    },
    {
      id: '8ab8f8c6-1be8-44df-8f4f-0d80e30a3522',
      title: 'The boy drank palm wine',
      slug: 'the-boy-drank-palm-wine-3456677788',
      body: 'His name is Joshua',
      description: 'he should be fined',
      readingTime: '1 min read',
      published: true,
      tagList: ['hello', 'catch'],
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: '072cbf1f-3935-42b4-8aef-44c23628554f',
      title: 'The fattest girl',
      slug: 'the-fattest-girl-3654677788',
      body: 'Unfortunately for me, I seem to be the fattest',
      description: 'my fat',
      readingTime: '1 min read',
      published: true,
      tagList: ['fat'],
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg',
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
  ,
};
