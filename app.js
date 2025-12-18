const express = require('express');
const app = express();
const env = require('dotenv').config();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.json());

const songRoutes = require('./routes/songRoutes');
const { default: mongoose } = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('successfully connected to mongodb!');
}).catch((err) => {
    console.log(`error while trying to connect to mongodb: ${err}`);
})

app.use('/', songRoutes);


app.listen(process.env.PORT, () => {
    console.log(`your app is listening through port ${process.env.PORT}`);
});

