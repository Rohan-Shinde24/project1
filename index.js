const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/db');
const orderRoute = require('./routes/orderRoute');


connectDB();

app.use(express.json());
app.use('/api', orderRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});