const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/privateApi');

//connect with the .env files
dotenv.config();

//DB connect
mongoose.connect(process.env.DB_CONNECTOR,()=>{console.log('Connected to DB')});

app.use(express.json());

//route middleware
app.use('/api/user',authRoutes);
app.use('/api/post',privateRoutes);

app.listen(3100,()=>{console.log('Server up and running')});