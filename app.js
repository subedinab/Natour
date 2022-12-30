const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // err = new Error(`CANT find${req.orginalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';
  next(new Error(`CANT find ${req.orginalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
