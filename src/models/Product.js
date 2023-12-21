/**
 *  user_id
 *  name
 *  quantity
 *  price
 *  created_at
 */
const mongoose  = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, "Please enter product name."],
            validate: {
                validator: (value) => {
                    return validator.isAlphanumeric(value.replace(" ", ""));
                },
                message: "Invalid product name, it has symbols."
            },
            trim: true
        },
        quantity: {
            type: Number,
            required: [true, "Please enter the quantity."],
            validate: {
                validator: (value) => {
                    return value >= 0;
                },
                message: "Quantity should be a positive number"
            }
        },
        price: {
            type: Number,
            required: [true, "Please enter the price."],
            validate: {
                validator: (value) => {
                    return value > 0;
                },
                message: "Price should be a positive number"
            }
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;