import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Products",  // take data from  products schema
        required : true
    },
    name: {
        type: String,
        required : true
    },
    price: {    
        type: Number,
        required : true 
    },
    image:{
        type: String,
        required : true
    },
    qty: {
        type: Number
    },
})

const cartSchema = new mongoose.Schema({  
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users",  // take data from  users schema
        required : true
    },
    items: [cartItemSchema],
    }); 

    export const Cart = mongoose.model('Carts', cartSchema);