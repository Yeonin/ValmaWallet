const mongoose = require('mongoose');
const randtoken = require('rand-token');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/valmawallet', {
    useNewUrlParser: true
});
module.exports = {
    Product: mongoose.model("product", {
        name: {
            type: String,
            required: [true, "Please put the product name."]
        },
        price: {
            type: Number,
            required: [true, "Please put the price."]
        }
    }),
    Student: mongoose.model("student", {
        name: {
            type: String,
            required: [true, "Please put the student name."]
        },
        section: {
            type: String,
            required: [true, "Please put the section."]
        },
        uid: {
            type: String,
            required: [true, "Please put the uid."],
            unique: true
        },
        balance: {
            type: Number,
            default: 0
        }
    }),
    selllog: mongoose.model("sell", {
        uid: {
            type: String,
            required: [true, "UID not found. Please retry."]
        },
        stud:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }],
        totalamt: {
            type: Number,
            required: [true, "No products added. Please put something on the cart."]
        },
        date: {
            type: Date,
            default: Date.now
        }
    }),
    addlog: mongoose.model("topup", {
        uid: {
            type: String,
            required: [true, "UID not found. Please retry."]
        },
        amount: {
            type: Number,
            required: [true, "Please put the amount."]
        },
        date: {
            type: Date,
            default: Date.now
        }
    }),

}