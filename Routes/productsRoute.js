const express = require("express")
const {
    AddProducts,
    FetchProducts,
    FetchProductById,
    EditProduct,
    DeleteProductById,
} = require('../Controllers/ProductsController')
const { Authentication } = require("../Middlewares/Authenticate")
const router = express.Router()

router.get('/getproducts', Authentication, FetchProducts)
router.get('/getproduct/:id', Authentication, FetchProductById)
router.post('/addproduct', Authentication, AddProducts)
router.put('/editproduct/:id', Authentication, EditProduct)
router.delete('/deleteproduct/:id', Authentication, DeleteProductById)


module.exports = router