
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./models/survey');
require('./services/passport');

const surveyRoutes = require('./routes/surveyRoutes');

mongoose.connect(keys.mongooseURI);

const app = express();


app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milli seconds. How long you want yopur cookie to be valid
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);
require('./routes/postCheck')(app);

if(process.env.NODE_ENV === 'production'){
    //Express will serve up the production assets
    // like our main.js or main.css file!

    app.use(express.static('client/build'));


    //Express will serve up the index.html file
    // if it doesnt recognize the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
