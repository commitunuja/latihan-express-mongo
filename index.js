const express = require('express');
const app = express();
const port = 3000;

// router
const router = require('./routers');
app.use(router);

// menangani request body
app.use(express.urlencoded({ extended: true }))
// parse JSON
app.use(express.json())


// middleware log
const log = (req, res, next) => {
    console.log(Date.now() + ' ' + req.ip + ' ' + req.originalUrl)
    next()
}
app.use(log)


// middleware menangani 404
const notFound = (req, res, next) => {
    res.json({
        status: 'error',
        message: 'resource tidak ditemukan',
    })
}
app.use(notFound)

// error handling
const errorHandling = (err, req, res, next) => {
    res.json({
        status: 'error',
        message: 'terjadi kesalahan pada server',
    })
}
app.use(errorHandling)




app.listen(port, () => {
    console.log(`Server berjalan di http:://localhost/${port}`);
})
