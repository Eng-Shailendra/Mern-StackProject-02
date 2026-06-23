import { Product } from "../models/product-model.js";
import cloud from "../config/cloudinary.js";


/**
 * @name createProduct 
 * @description "Add your product"
 * @access private
 */
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is not uploaded"
            })
        }
        const imageurl = await cloud.uploader.upload(req.file.path);
        if (!name || !description || !price || !category || !stock || !imageurl) {
            console.log(name, description, price, category, stock)
            return res.status(400).json({
                success: false,
                message: "All feilds are required"
            })
        }
        const product = new Product({
            name, description, price, category,
            admin: req.user._id,
            imageUrls: [{ url: imageurl.secure_url }],
            stock,
        })
        await product.save(product);
        res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: product
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }

}

/**
 * @name getProductById 
 * @description "Any User can see the any specifc product "
 * @access public
 */
export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product id not found"
            })
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product fetch successfully",
            data: product
        })
    } catch (err) {
        console.log(err);
    }
}

/**
 * @name getProduct 
 * @description "Any User cann see this product  "
 * @access public
 */
export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({})
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "No any product avilabe yet",
            })
        }
        res.status(200).json({
            success: true,
            message: "All Product found successfully",
            data: product
        })
    } catch (err) {
        console.log(err);
    }
}

/**
 * @name updateProductById 
 * @description "Only admin can update the product "
 * @access private
 */
export const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const { description, price, stock, } = req.body;
        if (!description || !price || !stock) {
            return res.status(400).json({
                success: false,
                message: "all field are required "
            })
        }
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product id not found"
            })
        }
        const product = await Product.findByIdAndUpdate(id, { description, price, stock }, { new: true }, { runValidators: true })
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal error Can't update product"
        })
    }

}

/**
 * @name deleteProductById 
 * @description "Only admin can delete the product "
 * @access private
 */
export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product id not found"
            })
        }
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal error Can't delete product"
        })
    }

}