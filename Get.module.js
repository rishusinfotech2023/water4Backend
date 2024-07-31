const mongoose= require("mongoose");
const GetRoute=require('./Get.route');
const {Schema}= mongoose;

let user= new Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
   
    email:{
        type: String
    },
    description:{
     type:String
    }
},
{
collection:"getintouch"
});
module.exports= mongoose.model("getintouch",user);