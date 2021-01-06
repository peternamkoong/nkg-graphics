const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        billingAddress: {
            billingName: String,
            address: String,
            city: String,
            province: String,
            postalCode: String,
            phone: String,
        },
        paymentMethod: {
            paymentName: String,
            cardNumber: String,
            month: String,
            year: String,
            code: String,
        },
        orders: [
            {
                billingAddress: {
                    billingName: String,
                    address: String,
                    city: String,
                    province: String,
                    postalCode: String,
                    phone: String,
                },
                paymentMethod: {
                    paymentName: String,
                    cardNumber: String,
                    month: String,
                    year: String,
                    code: String,
                },
                totalQuantity: Number,
                orderTotal: String,
                orderDate: String,
                orderNumber: Number,
                details: Schema.Types.Mixed,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
