import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import logger from './server/utils/logger.util';
import router from './server/routes';
import { facebookStrategy, twitterStrategy, googleStrategy } from './server/services/passport-strategies.service';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const swaggerDocument = YAML.load(path.join(process.cwd(), './swagger.yml'));

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

passport.use(facebookStrategy);
passport.use(twitterStrategy);
passport.use(googleStrategy);
app.use(passport.initialize());

app.use('/api/v1', router);
app.get('/', (req, res) => {
  res.send('Hello Forsetti');
});

app.listen(process.env.PORT || 5000, () => {
  logger.log('info', `Listening on port ${port}`);
});

export default app;
