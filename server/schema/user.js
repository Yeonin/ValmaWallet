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
            required: [true, "Please put the uid."]
        },
        balance: {
            type: Number,
            default: 0
        }
    }),
    selllog: mongoose.model("sell", {
        uid: {
            type: String,
            required: [true, "Please put the uid."]
        },
        products: [{
            type: mongoose.Types.ObjectId
        }],
        total: {
            type: Number,
            required: [true, "Please put the total."]
        },
        date: {
            type: Date,
            default: Date.now
        }
    }),
    addlog: mongoose.model("topup", {
        uid: {
            type: String,
            required: [true, "Please put the uid."]
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