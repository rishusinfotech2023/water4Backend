const mongoose = require("mongoose");
const GetRoute = require('./Get.route');
const { Schema } = mongoose;

let user = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: Number
    },

    feedback: {
        type: String
    }
},
    {
        collection: "submit"
    });
module.exports = mongoose.model("submit", user);