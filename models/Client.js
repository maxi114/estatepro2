const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({

    //Client info

    //full name
    Name: {
        type: String,
        required: true,
    },

    //Email:{
    Email: {
        type: String,
        required: true,
        unique: true,
    },

    //phone
    Phone: {
        type: String,
    },

})

const Model = mongoose.model("client", ClientSchema);
module.exports = Model;