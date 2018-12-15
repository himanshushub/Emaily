const passport = require('passport');

module.exports = function(app){
  

    app.get('/auth/google', passport.authenticate('google',{
        scope: ['profile', 'email']
    })); /* when we visit the route '/auth/google' passport sends to google for login,
        we need to define'scope'
        */
       
    app.get('/auth/google/callback', passport.authenticate('google'));/*
       here we giving passport.authenticate('google' again as the argument but this time passport 
       wont send us to google for login, it could be because when google send the user back to this 
       route google attaches the code with it, so may be passport sees that code and says Ah!
        we have code in URL so i will not send you to google instead i will use that code to
        get the details about the user who has just authenticated via google.
    
        after this only we will get the details about the user. and that function which is 
        present in 2nd argument of 'passport.use' will be executed
    */
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
    app.get('/api/logout', (req, res) => {
        var goodbye = req.user.name;
        req.logout();
        res.send({bye: goodbye});
    });
    
    
    // app.get('/',(req,res) => {
    //     res.send({"hi":"Him"});
    // })
    

}