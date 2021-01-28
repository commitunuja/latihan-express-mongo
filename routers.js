const express = require('express')
const routers = express.Router();

routers.get('/', (req, res) => res.send('Hello World!'))

// req semua method
routers.all('/universal', function (req, res) {
    res.send('request dengan method ' + req.method)
})

// req parameter
routers.get('/post/:id?', (req, res) => {
    if (req.params.id) res.send('artikel-' + req.params.id)
})

// req query
routers.get('/foods', (req, res) => {
    const page = req.query.page ? req.query.page : 1
    res.write('Foods page: ' + page + '\n')
    if (req.query.sort) res.write('Sort by: ' + req.query.sort)
    res.end();
});


// kode routing lainnya

module.exports = routers