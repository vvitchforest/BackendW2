'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const catRoute =  require('./routes/catRoute');
const userRoute =  require('./routes/userRoute');
const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}),  catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}),  userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
