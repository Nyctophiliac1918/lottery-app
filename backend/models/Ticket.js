const mongoose = require('mongoose');

//Schema for Ticket model
const ticketSchema = new mongoose.Schema(
  {
    mobile: String
  },
  {
    timestamps: true
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Ticket, ticketSchema };