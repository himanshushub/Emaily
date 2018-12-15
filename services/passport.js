const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');




const Usermodel = mongoose.model('User');//calling the collection "User" and assigning to "usermodel"


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Usermodel.findById(id).then((user) => {
        done(null, user);
    })
});



passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecrete,
    callbackURL: "/auth/google/callback"},
    (accessToken,refreshToken, profile, done) => {/* this arrow func will be executed 
    after user login via google */
    // console.log("accessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);
    //console.log("profile:", profile);
    
    Usermodel.findOne({googleId: profile.id}).then((isUser) => {
        if(isUser){
            console.log(isUser);
            done(null, isUser);
        }
        else{
            const Userloggedin = new Usermodel({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            }).save(() => {console.log('saved')})
            .then((user) => {done(null, user);});
            console.log(Userloggedin);
        }
        })
        
        /*
        const gotUser = Usermodel.findOne({googleId: profile.id});
        if(gotUser){console.log(gotUser);}
        else{
            const Userloggedin = new Usermodel({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            }).save(() => {console.log('saved')});
            console.log(Userloggedin);
        }
        */ 
    })
);