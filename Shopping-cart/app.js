const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(adminRoutes);


app.listen(3000, () => {
    console.log("running 3000....");
});