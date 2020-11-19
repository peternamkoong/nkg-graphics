const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catalogSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Transfer Stickers", "Vinyl Lettering", "Die-Cut Stickers"],
    },
    category: {
        type: String,
        enum: ["Disney Characters", "Animals", "Words", "Quotes", "Letters", "KakaoFriends"],
    },
    variant: [
        {
            height: {
                type: Number,
                required: true,
            },
            width: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    imagePath: {
        type: String,
    },
});

const Catalog = mongoose.model("Catalog", catalogSchema);
module.exports = Catalog;
