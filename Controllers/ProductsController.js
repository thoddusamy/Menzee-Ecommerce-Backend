const Products = require("../Schema/productSchema")


const AddProducts = async (req, res) => {
    try {
        let addProd = await Products.create(req.body)
        if (addProd) {
            res.status(200).json({ message: "Product added" })
        } else {
            res.status(400).json({ message: "Failed to add product" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to add product" })
    }
}

const FetchProducts = async (req, res) => {
    try {
        let fetchData = await Products.find()
        if (fetchData) {
            res.status(200).json(fetchData)
        } else {
            res.status(400).json({ message: 'Product getdata error' })
        }
    } catch (error) {
        console.log(error);
    }
}

const FetchProductById = async (req, res) => {
    try {
        let { id } = req.params
        let fetchProductById = await Products.findOne({ _id: id })
        if (fetchProductById) {
            res.status(200).json(fetchProductById)
        } else {
            res.status(400).json({ message: 'Product getDataById error' })
        }
    } catch (error) {
        console.log(error);
    }
}

const EditProduct = async (req, res) => {
    try {
        let { id } = req.params
        let { prod_name, prod_style_no, prod_sizes, prod_price, prod_category } = req.body
        let editProduct = await Products.findByIdAndUpdate({ _id: id }, { $set: { prod_name, prod_style_no, prod_sizes, prod_price, prod_category } })
        if (editProduct) {
            res.status(200).json({ message: "Product Updated!" })
        } else {
            res.status(400).json({ message: 'Product Updated error' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Product Updated error' })
    }
}

const DeleteProductById = async (req, res) => {
    try {
        let { id } = req.params
        let deleteProdById = await Products.findByIdAndDelete({ _id: id })
        if (deleteProdById) {
            res.status(200).json({ message: "Product Deleted!" })
        } else {
            res.status(400).json({ message: 'Product Deleted error' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Product Deleted error' })
    }
}


module.exports = { AddProducts, FetchProducts, FetchProductById, EditProduct, DeleteProductById }