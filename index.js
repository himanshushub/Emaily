const express = require('express');
const authRoutes = require('./routes/authRoutes');

const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/users');
require('./services/passport');
const mongoose = require('mongoose');


mongoose.connect(keys.mongoURI);

const app = express();
    
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);


    
app.listen(5000);