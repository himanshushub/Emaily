
const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, async (accessToken, refreshToken, profile, done) => {

        const existingUser = await User.findOne({ googleId: profile.id });
        if(existingUser){
            // user already exist
            done(null, existingUser);
        }
        else{
            var mail = profile.emails[0].value;
            const user = await new User({ googleId: profile.id, mailId: mail }).save();
            done(null, user);
        }

    //     User.findOne({ googleId: profile.id }).then((existingUser) => {
    //         if(existingUser){
    //             //user already exist;
    //             done(null, existingUser);
    //         }
    //         else{
    //             var mail = profile.emails[0].value;
    //             new User({ googleId: profile.id, mailId: mail }).save().then((user) => {
    //                 done(null, user);
    //             });

    //         }
    //     })

    // /*     console.log('accessToken::', accessToken);
    // //     console.log('refreshToken::', refreshToken);
    // //     console.log('profile::',profile);
    // //     console.log(done); */
     })
);