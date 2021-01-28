const http = require('http');
const hello = require('./helloworld');
const moment = require('moment');

const hostname = '127.0.0.1'; // atau localhost
const port = 3000;

// menampilkan text/html
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.write(moment().calendar());
//     res.end();
// });

// menampilkan JSON
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/json');
//     res.write(JSON.stringify({
//         'status': 'success',
//         'message': 'response success'
//     }));
//     res.end();
// });

// Menangani Routing
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const url = req.url
    if (url === '/employee') {
        res.write('data employee');
    } else {
        res.write('data apa yang kamu perlukan?');
    }
    res.end();
});


// menjalankan server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});