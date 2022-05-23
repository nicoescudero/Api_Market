const Product=require('./model');
const User=require('../user/model');
const {unlinkSync}=require('fs');
const controller={};

controller.getAllProducts=async(req,res)=>{
    const products=await Product.find({seller: req.user});
    (products.length>0)?
    res.json(products):
    res.status(404).json({message:'No products found'});
}

controller.getProductById=async(req,res)=>{
    const product=await Product.find({_id:req.params.id,seller:req.user});
    if(product)
    return res.json(product)
    return res.status(404).json({message:'No product found'});
}

controller.createProduct=async(req,res)=>{
    try{
        let image=req.file;
        const newProduct= new Product({
            seller:req.user,
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:image.path,
            url_image:image.filename
        });
        await newProduct.save();
        const user=await User.findById(req.user);
        user.products.push(newProduct._id);
        user.save();
        return res.status(201).json({message:'Product saved'});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:error})
    }
}

controller.updateProductById=async(req,res)=>{
    try{
        const {name,description,price}=req.body;
        const image=req.file;
        const product=await Product.findOneAndUpdate({_id:req.params.id,seller:req.user},{
            name:name,
            description:description,
            price:price,
            image:image.path,
            url_image:image.filename
        });
        if(!product)return res.status(404).json({message:'Product not found'});
        return res.json(product);
    }catch(error) {
        console.log(error);
        return res.status(422).json({message:'Error de Entradas'});
    }
}

controller.deleteProductById=async(req,res)=>{
     try{
        const product=await Product.findOneAndDelete({_id:req.params.id,seller:req.user});
        if(!product)return res.status(404).json({message:"Product not found"});
        unlinkSync(product.image);
        return res.json({message:'product deleted'});
     }catch(error){
         console.log(error);
        return res.status(404).json({message:"Product not found"});
     }
}

module.exports=controller;