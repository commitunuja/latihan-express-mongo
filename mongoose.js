const mongoose = require('mongoose')
mongoose.connect('mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// membuat schema untuk collection quotes
const quoteSchema = new mongoose.Schema({
    word: String
})
// Membuat model schema
const Quote = mongoose.model('Quote', quoteSchema)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    const quote = new Quote({ word: 'Belajar mongoose' });

    quote.save((error, quote) => {
        if (error) console.error(error);
        console.log(quote);
    })
})
