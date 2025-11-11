 const mongoose = require("mongoose");

 const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    productNumbers: {
         type: [
            {
            number: Number,
            unavaibleDates: [Date]
         },
        ],
    },
 });

 module.exports = mongoose.model("Product", productSchema);