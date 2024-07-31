const express= require ("express");
const Router= express.Router();
const Get= require('./Get.module');
const bodyParser= require('body-parser');
const app = express();
const validator = require('validator');
const GetModule = require("./Get.module");



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/Get',Router);
Router.post('/', async(req,res)=>{
    const {firstname,lastname,email,description}= req.body;
    if(!firstname || !lastname || !email || !description){
        return res.status(400).json({message:'All fields are require'});    
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    
      // Additional validation for name (letters and spaces only)
      if (!validator.isAlpha(firstname.replace(/\s/g, '')) || !validator.isAlpha(lastname.replace(/\s/g, ''))) {
        return res.status(400).json({ message: 'Invalid name format' });
      }

    const newUser = new Get({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        description:req.body.description
    });
    try{
const result = await newUser.save();
res.json({message: 'Data saved successfully'});
    } catch (err){
        console.error('error saving user to database :',err);
        res.status(500).json({message:'error saving user to database', error:err});
    }
});
module.exports = Router;

