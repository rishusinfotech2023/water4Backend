const express= require ("express");
const Router= express.Router();
const submit = require('./submit.module');
const bodyParser= require('body-parser');
const app = express();
const validator = require('validator');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/submit',Router);
Router.post('/', async(req,res)=>{
    const {name,email,number,feedback}= req.body;
    if(!name ||  !email || !number || !feedback){
        return res.status(400).json({message:'All fields are require'});    
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    
      // Additional validation for name (letters and spaces only)
      if (!validator.isAlpha(name.replace(/\s/g, '')|| !validator.isAlpha(feedback.replace(/\s/g,'')))) {
        return res.status(400).json({ message: 'Invalid name format' });
      }
      if (!validator.isNumeric(number.toString()) || number.toString().length !== 10) {
        return res.status(400).json({ message: 'Invalid number format. Must be 10 digits' });
      }
    const newUser = new submit({
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        feedback:req.body.feedback
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
