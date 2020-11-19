const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    invoiceNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    billingAddress: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
    },
    items: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            quantity: {
                type: Number,
                min: 1,
                max: 999,
            },
            colour: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            unitPrice: {
                type: Number,
                required: true,
            },
            subtotal: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
