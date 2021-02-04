const express = require('express')
const routers = express.Router();
const client = require('./connection')
const ObjectId = require('mongodb').ObjectId

const multer = require('multer')
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false)
    }
    cb(null, true)
}
const upload = multer({ dest: 'public', fileFilter: imageFilter })


routers.get('/', (req, res) => res.send('Hello World!'))

routers.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file
    if (file) {
        const target = path.join(__dirname, 'public', file.originalname)
        fs.renameSync(file.path, target)
        res.send('file berhasil diupload')
    } else {
        res.send('file gagal diupload')
    }
})


routers.post('/register', upload.single('avatar'), (req, res) => {
    const name = req.body.name
    const avatar = req.file
    res.send({ name: name, avatar: avatar })
})

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

// Route Products

routers.get('/products', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('latihan')
        const products = await db.collection("products").find().toArray()
        if (products.length > 0) {
            res.send({
                status: 'success',
                message: 'list products ditemukan',
                data: products
            })
        } else {
            res.send({
                status: 'success',
                message: 'list products tidak ditemukan',
            })
        }
    } else {
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })
    }
})

routers.get('/products/:id', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db("latihan");
        const productId = await db.collection("products").findOne({
            _id: ObjectId(req.params.id)
        })
        res.send({
            status: "success",
            message: "single products",
            data: productId
        })
    } else {
        res.send({
            status: "error",
            message: "Koneksi Database Gagal"
        })
    }
})

routers.post('/products', multer().none(), async (req, res) => {
    if (client.isConnected()) {
        const { name, price, stock, status } = req.body
        const db = client.db('latihan')

        const result = await db.collection('products').insertOne({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if (result.insertedCount == 1) {
            res.send({
                status: "success",
                message: "add products success",
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal',
            })
        }
    } else {
        res.send({
            status: "error",
            message: "Koneksi Database Gagal"
        })
    }
})

routers.put('/products/:id', multer().none(), async (req, res) => {
    if (client.isConnected()) {
        const { name, price, stock, status } = req.body
        const db = client.db('latihan')

        const result = await db.collection('products').updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {
                    name: name,
                    price: price,
                    stock: stock,
                    status: status
                },
            }
        )

        if (result.matchedCount == 1) {
            res.send({
                status: "success",
                message: "update products success",
            })
        } else {
            res.send({
                status: 'warning',
                message: 'update product gagal',
            })
        }
    } else {
        res.send({
            status: "error",
            message: "Koneksi Database Gagal"
        })
    }
})

routers.delete('/products/:id', multer().none(), async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('latihan')
        const result = await db.collection('products').deleteOne(
            { _id: ObjectId(req.params.id) },
        )

        if (result.deletedCount == 1) {
            res.send({
                status: "success",
                message: "delete products success",
            })
        } else {
            res.send({
                status: 'warning',
                message: 'delete product gagal',
            })
        }
    } else {
        res.send({
            status: "error",
            message: "Koneksi Database Gagal"
        })
    }
})


module.exports = routers