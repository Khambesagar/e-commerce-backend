import { Cart } from "../model/Cart.model.js";

// Add to cart also add (number of product count)....
export const addToCart = async (req, res) => {
    const { productId, name, price, qty, image } = req.body;

    const userId = "674fdee25903986cb2c0cf94"; // Replace with the actual user ID
    // userId = req.user;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });   // Initialize cart with user ID and empty items array (Cart.model)
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId); //items = [{productId,name,price,qty,image}]
    // plus qty & price 
    if (itemIndex > -1) {
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price * qty;
    } else {
        cart.items.push({ productId, name, price, qty, image });
    }
    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });
};


//Get User Cart

export const userCart = async (req, res) => {
    const userId = "674fdee25903986cb2c0cf94"; // Replace with the actual user ID

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ message: "Cart not found" });

    res.json({ message: "User Cart", cart });
}

// remove product from cart

export const productRemoveFromCart = async (req, res) => {

    const productId = req.params.productId;
    const userId = "674fdee25903986cb2c0cf94"; // Replace with the actual user ID

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();

    res.json({ message: "Product remove from  Cart" });
};

// CleareCart
export const clearCart = async (req, res) => {

    const userId = "674fdee25903986cb2c0cf94"; // Replace with the actual user ID

    try {

        let cart = await Cart.findOne({ userId });

        // If the cart does not exist, create a new one
        if (!cart) {
            cart = new Cart({ items: [] });
        } else {
            // Clear the items in the cart
            cart.items = [];
        }

        // Save the updated cart to the database
        await cart.save();

        // Respond with a success message
        res.json({ message: "Cart cleared successfully" });

    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "An error occurred while clearing the cart" });
    }
}

// decrease qty & price from cart

export const decreaseProductQty = async (req, res) => {
    const { productId, qty } = req.body;

    const userId = "674fdee25903986cb2c0cf94"; // Replace with the actual user ID

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });   // Initialize cart with user ID and empty items array (Cart.model)
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId); //items = [{productId,qty}]
    // minus qty & price 
    if (itemIndex > -1) {

        const item = cart.items[itemIndex];
        if (item.qty > qty) {
            const pricePerUnit = item.price / item.qty;
            item.price -= pricePerUnit * qty;
            item.qty -= qty;
        } else {
            cart.items.splice(itemIndex, 1);
        }


    } else {
        return res.json({ message: "Product not found in cart" });
    }
    await cart.save();
    res.status(200).json({ message: 'items qty decrease', cart });
};