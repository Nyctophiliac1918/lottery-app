const mongoose = require('mongoose');
const {ticketSchema} = require('./Ticket')
const {eventSchema} = require('./Event')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    tickets: [ ticketSchema ],
    event: [ {type:String} ],
});

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};