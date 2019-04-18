
const passport = require('passport');


module.exports = (app) => {


       // app.get('/', (req, res) => {
    //     res.send( {h0la! : "himanshu"} );

    // });


    app.get('/auth/google', passport.authenticate('google',{
        scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'),(req, res) =>{
        res.redirect('/surveys');
    });

 

    app.get('/api/logout', (req, res) => {
        var byeMail = req.user.mailId; // "user" is records in our dB
        req.logout();
        res.redirect('/')
        //res.send( {bye : byeMail});
        //res.send(req.user); // 2 "res.send" is not possible it shows warning something, anyway we dont need this
        
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}