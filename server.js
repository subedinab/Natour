const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose.set('strictQuery', true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('db connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('the server is running here');
});
