 const mongoose = require('mongoose');

 const customerSchema = mongoose.Schema({
    date: {
      type: Date,
      required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true  
    }
 });

 const Customer = mongoose.model('Customer', customerSchema);

 module.exports = Customer;