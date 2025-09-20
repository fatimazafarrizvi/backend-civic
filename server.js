const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // load .env variables
const userRoutes = require('./Routes/user_routes');
const adminRoutes = require('./Routes/admin_routes');
const issueRoutes = require('./Routes/issue_routes');

let url = require('./url');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, { dbName: "sih" }).then(() => {
    console.log("Connection successful");
}).catch(err => {
    console.log("Connection Failed - ", err);
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/issue', issueRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server listening on port:', port);
});


// to run this paste url http://localhost:8080/issue/issue_all :D
