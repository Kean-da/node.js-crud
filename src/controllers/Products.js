const JH_Controller 	= require('../system/core/JH_Controller');
const asyncHandler 		= require('express-async-handler');

class Products extends JH_Controller {
	constructor() {
		super();
		this.user       = this.load.Model('User');
        this.product    = this.load.Model('Product');
	}

    /* This function is returning the data of the user and the product came model
     */
    getProducts = asyncHandler(async (req, res) => {
        try {
            const { _id } = req.user; //data of the user from Auth_middleware

            if(_id) {
                const product = await this.product.find({ user_id: _id });

                res.status(200).json(product);
            } else {
                res.status(401);
                throw new Error("You don't have permission.");
            }
        }catch (error) {
            res.status(500);
			throw new Error(error.message);
        }
    });

    /* This function is adding product in the database.
     */
    addProduct = asyncHandler(async (req, res) => {
        try {
            const user = req.user; //data of the user from Auth_middleware
            const { name, quantity, price } = req.body;

            const product = await this.product.create({
                user_id : user._id,
                name,
                quantity,
                price,
            }); 

            if(product) {
                res.status(200).json(`You've successfully add a product!`);
            } else {
                res.status(400);
				throw new Error(result);
            }
        } catch (error) {
            res.status(500);
			throw new Error(error.message);
        }
    });

    /* This function is deleting the product in the database.
     */
    deleteProduct = asyncHandler(async (req, res) => {
        try {
            const user = req.user; //data of the user from Auth_middleware
            const { id } = req.params;

            const product = await this.product.findById(id);
            console.log(product.user_id);
            
            if(product.user_id === (user._id).toString()) {
                const result = await product.deleteOne();
                
                res.status(200).json(`You've successfully delete the product!`);
            } else {
                res.status(404);
                throw new Error(`This product is not found.`);
            }
        } catch (error) {
            res.status(500);
			throw new Error(error.message);
        }
    });

    /* This function is update the product in the database.
     */
    updateProduct = asyncHandler(async (req, res) => {
        try{
            const user = req.user; //data of the user from Auth_middleware
            const { id } = req.params;

            const product = await this.product.findById(id);

            if(product.user_id === (user._id).toString()) {
                product.name = req.body.name || product.name;
                product.quantity = req.body.quantity || product.quantity;
                product.price = req.body.price || product.price;

                const updateProduct = await product.save();

                res.status(200).json(`${req.body.name} is successfully updated!`);
            } else {
                res.status(404);
                throw new Error(`This product is not found.`);
            }
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    });
}

module.exports = new Products();
