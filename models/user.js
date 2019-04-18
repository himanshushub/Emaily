
const mongoose = require('mongoose');

const { Schema } = mongoose; /* the way we have defined here its called Destructuring available in ES2015 
                                same as :-> const Schema = mongoose.Schema; */

const userSchema = new Schema({
    googleId: String,
    mailId: String,
    credits: { type: Number, default: 0 }

});

mongoose.model('users', userSchema);