const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');
const CookieParser = require('cookie-parser');
const orderRoute = require('./routes/orderRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');



connectDB();
app.use(CookieParser());


app.use(express.json());
app.use('/api', orderRoute);
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', categoryRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});