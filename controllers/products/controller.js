const Product=require('./model');
const User=require('../user/model');
const Comment=require('../comments/model');
const {unlinkSync}=require('fs');
const controller={};

controller.getProducts=async(req,res)=>{
    const products=await Product.find({seller: req.user});
    return res.json(products);
}

controller.getAllProducts=async(req,res)=>{
    try {
        const products=await Product.find();
        return res.json(products);    
    } catch (error) {
        res.status(404).json({message:'No products found'});
    }
};

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
        const match=await ctrlUser.addProduct(req.user,newProduct._id);
        if(match===false) return res.status(404).json({message:'Not Found'});
        await newProduct.save();
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
        const match=await deleteProductToUser(req.user,req.params.id);
        if(match===false) return res.status(404).json({message:'Not Found'});
        const product=await Product.findOneAndDelete({_id:req.params.id,seller:req.user});
        if(!product)return res.status(404).json({message:"Product not found"});
        unlinkSync(product.image);
        return res.json({message:'Product Deleted'});
     }catch(error){
         console.log(error);
        return res.status(404).json({message:"Product not found"});
     }
};

const deleteProductToUser= async (id,product) => {
    const user=await User.findById(id);
    if(!user) return false;
    await user.products.forEach((item,index,object)=>{
        if(item._id == product)object.splice(index,1);
    });
    await user.save();
    await Comment.deleteMany({postId:product});
    return true;
};

module.exports=controller;