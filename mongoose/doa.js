/* file: Product.js */
const mongoose = require('mongoose')
// schema
const DoaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'field title harus ada'],
        minlength: 3,
        maxlength: 50,
    },
    body: {
        type: String,
        required: [true, 'body nama harus ada'],
        minlength: 3,
        maxlength: 200,
    }
})
// model
const Doa = mongoose.model('Doa', DoaSchema)
module.exports = Doa