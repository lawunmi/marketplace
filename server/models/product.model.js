import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Product name is required'
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: 'Number of quantity is required'
    },
    category: {
        type: String,
        trim: true
    },
    });
    export default mongoose.model('Product', ProductSchema);
