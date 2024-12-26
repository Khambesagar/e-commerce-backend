import Product from "../model/product.model.js";

// Add products
export const addProducts = async (req, res) => {
    const { name, price, category, image,qty, description } = req.body
    try {
        let product = await Product.create({
            name,
            price,
            category,
            image,
            description,
            qty
        });
        res.status(200).json({message: 'Product added Successfully', product});

    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Get Products
export const getProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Find Products by ID

export const getProductsById =  async ( req,res) => {
    const id = req.params.id;
    try {
        let product = await Product.findById(id);
        if(!product){
            res.status(404).json('Product not found');
        }
        res.status(200).json(product);
    } catch (error) {
            res.status(500).json(error.message);
    }
}

//Update product by id
export const updateProductsById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const product = await Product.findByIdAndUpdate(id, req.body); 
      if (!product) {
        return res.status(404).json('Product not found');
      }
      res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
//Delete Product by id

export const deleteProductsById = async (req,res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json('Product not found');
        }
        res.status(200).json({mesaage: 'Product deleted successfully' , product});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// ...............End........................