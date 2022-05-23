const {Schema,model}=require('mongoose');
const productModel=new Schema({
    seller:{
        type:Schema.ObjectId,
        ref:'User'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    url_image:{
        type: String,
        required:true
    }
});



module.exports =model('Product',productModel);