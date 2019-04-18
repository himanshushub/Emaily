const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


const Survey = mongoose.model('surveys');

module.exports = (app) => {

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        res.send({});
    });


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        //console.log(req.user);

        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map((email) => {return {email: email.trim()}}),
            _user: req.user._id,
            dateSent: Date.now()
        });
         //res.send('yes');
       
        // Great place to send the email

        const mailer = new Mailer(survey, surveyTemplate(survey));
        //console.log(survey);

        try{
            const response = await mailer.send();
            //console.log(response);
            const surveySave = await survey.save();
            //console.log(surveySave);
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch(err){
            res.status(422).send(err);
        }

    });
}