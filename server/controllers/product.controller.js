import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'


const create = async (req, res) => {
    const product = new Product(req.body)
    try {
    await product.save()
    return res.status(200).json({
    message: "Successfully created a new product!"
    })
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
    }
     
    /*const list = async (req, res) => {
    try {
    let products = await Product.find()
    res.json(products)
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
    }*/
     
     
    const productByID = async (req, res, next, id) => {
    try {
    let product = await Product.findById(id)
     
    if (!product)
    return res.status('400').json({
    error: "Product not found"
    })
     
    req.profile = product
    next()
    } catch (err) {
    return res.status('400').json({
    error: "Could not retrieve product"
    })
    }
    }
     
     
    const read = (req, res, next) => {
     
    return res.json(req.result)
    }
     
     
    const update = async (req, res) => {
    try {
    let product = req.profile
    product = extend(product, req.body)
    product.updated = Date.now()
    await product.save() 
    res.json(product)
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
    }
     
    const remove = async (req, res) => {
    try {
    let product = req.profile
    let deletedProduct = await Product.deleteOne()
     
    res.json(deletedProduct)
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }
    }

    const removeALL = async (req, res) => { 
        try {
        let deletedProduct = await Product.deleteMany() 
        res.json(deletedProduct) 
        } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
        } 
        }

        const list = async (req, res) => {
            const keyword = req.query.name;
            console.log(typeof Product)
            try {	
                let product = await Product.find({ "name": {$regex: keyword} 
                })
                                  	
                //console.log('this is outside the try block')
                if(product){
                    res.json(product);
                }
                //console.log('product', product)
            }catch (err) {
                console.log('error ', err)
                return res.status('400').json({
                error: "No product match"
            })
            }
        }
    export default { create, productByID, read, list, remove, update, removeALL }
     