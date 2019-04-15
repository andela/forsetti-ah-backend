export default {
  validShareObject: {
    email: 'test@example.com',
  },
  invalidShareObject: [
    {
      email: '',
    },
    {
      email: 'test@',
    }
  ]
};
