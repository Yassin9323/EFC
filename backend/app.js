const express = require('express');

//Routers
const eventRouter = require('./routes/eventRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const userRouter = require('./routes/userRoutes');

//Main app
const app = express();

//Midellwares
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middelware');
  next();
});

//Routes
app.use('/efc/v1/events', eventRouter);
app.use('/efc/v1/services', serviceRouter);
app.use('/efc/v1/feedbacks', feedbackRouter);
app.use('/efc/v1/users', userRouter);

module.exports = app;
