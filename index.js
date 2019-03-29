import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Forsetti');
});

app.listen(process.env.PORT || 5000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

export default app;
