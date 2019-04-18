const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

module.exports = (app) => {
    app.post('/api/post', requireLogin, requireCredits, async (req, res) =>{
        console.log('from post');
    })
}