import express from 'express'; // use instead of require ("type":"module")
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes import
import bookRoute from "./route/Book.route.js"
import userRoute from "./route/user.route.js"
import productRoute from "./route/product.route.js"
import cartRoute from "./route/cart.route.js"

const app = express();

app.use(cors());

app.use(express.json()); // for data pass in json (POST)

dotenv.config();

const PORT = process.env.PORT || 3000;
const URI =  process.env.MongoDBURI;

//Connect to mongoDB
try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
} catch (error) {
    console.log('Error:', error);
    
}

//Defining Routes//
 
app.use('/book',bookRoute);

//Authentication Routes
app.use('/user' ,userRoute); // Signup & Login

// .......... Product Routes ......................

//Add Product Routes
app.use('/addproduct',productRoute); 

//Get Products Routes and GetById (same route)
app.use('/getproduct',productRoute);

//Update Product Byid 
app.use('/update',productRoute)

//Delete Product Byid
app.use('/delete',productRoute)

//............. Cart Routes.........................

//Add to cart   
app.use('/addtocart',cartRoute);

//Get User Cart
app.use('/usercart',cartRoute);

//Remove product from cart
app.use('/removeproduct',cartRoute)

//Clear cart
app.use('/clearcart',cartRoute)

//Decrease product
app.use('/decreaseproduct',cartRoute)

app.listen(PORT, () =>{
    console.log(`server runnig on port ${PORT}`);
    
})