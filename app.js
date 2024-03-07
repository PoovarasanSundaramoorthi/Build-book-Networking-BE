import express, { json } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import xss from 'xss-clean';

// Error file
import AppError from './utils/appError.js';
// const AppError = require("./utils/appError");
import globalErrHandler from './controllers/errorController.js';
// const globalErrHandler = require("./controllers/errorController.js");

// Router imports
import BookRouter from './routes/bookRoutes.js';
import UserRouter from './routes/userRoutes.js';
import UserBookRouter from './routes/userBookRouter.js';
// Express using
const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
  max: 150000,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(bodyParser.json());

app.use(
  express.json({
    limit: '15kb',
  })
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use('/api/v1/books', BookRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/user/books', UserBookRouter);

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route');
  next(err, req, res, next);
});

app.use(globalErrHandler);

export default app;
