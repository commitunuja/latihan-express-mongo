const express = require('express');
const routers = express.Router()
require('./connection')
const Product = require('./product')
const Doa = require('./doa')
const multer = require('multer')

routers.get('/products', async (req, res) => {
    const products = await Product.find()
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
})

routers.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send({
            status: 'success',
            message: 'single product ditemukan',
            data: product
        })
    } else {
        res.send({
            status: 'warning',
            message: 'single product tidak ditemukan',
        })
    }
})

routers.post('/products', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body
    try {
        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            status: status
        })
        if (product) {
            res.send({
                status: 'success',
                message: 'tambah product success',
                data: product
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal',
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message,
        })
    }
})

routers.put('/products/:id', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body
    try {
        const result = await Product.updateOne(
            { _id: req.params.id },
            {
                name: name,
                price: price,
                stock: stock,
                status: status
            },
            { runValidators: true }
        )
        if (result.ok == 1) {
            res.send({
                status: 'success',
                message: 'update product success',
                data: result
            })
        } else {
            res.send({
                status: 'warning',
                message: 'update product gagal',
                data: result
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message,
        })
    }
})

routers.delete('/products/:id', async (req, res) => {
    try {
        const result = await Product.deleteOne(
            { _id: req.params.id }
        )
        if (result.deletedCount == 1) {
            res.send({
                status: 'success',
                message: 'delete product success',
                data: result
            })
        } else {
            res.send({
                status: 'warning',
                message: 'delete product gagal',
                data: result
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message,
        })
    }
})

routers.get('/doa', async (req, res) => {
    const doa = await Doa.find()
    if (doa.length > 0) {
        res.send({
            status: 'success',
            message: 'list doa ditemukan',
            data: doa
        })
    } else {
        res.send({
            status: 'success',
            message: 'list doa tidak ditemukan',
        })
    }
})

routers.post('/doa', multer().none(), async (req, res) => {
    const { title, body } = req.body
    try {
        const doa = await Doa.create({
            title: title,
            body: body,
        })
        if (doa) {
            res.send({
                status: 'success',
                message: 'tambah doa success',
                data: doa
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah doa gagal',
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message,
        })
    }
})
module.exports = routers