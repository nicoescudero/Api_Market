const {Schema, model}=require('mongoose');
const bcrypt=require('bcryptjs');
const validator=require('validator');

const userScheme=new Schema({
    userName: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        validate:(value)=>validator.isEmail(value)
    },
    products:[
        {
            idProduct:{
                type:Schema.ObjectId,
                ref:'Product'
            }
        }
    ]
});

userScheme.methods.encryptPassword = async(password)=>{
    const response=await bcrypt.hashSync(password,10);
    return response;
}

userScheme.methods.validatePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}


module.exports=model('User',userScheme);