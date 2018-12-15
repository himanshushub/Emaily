const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({ // created a new record template kind of
    name: String,
    googleId: String,
    email: String,
})


const Usermodel = mongoose.model('User', userSchema);//A new collection of "userSchema" record
// module.exports = userSchema;
