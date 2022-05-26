const Comment=require('./model');
const controller={};
const Product=require('../products/model');

controller.createComment=async(req,res)=>{
    try {
        const {comment,username}=req.body;
        const newComment = new Comment({postId:req.params.id,authorId:req.user,comment:comment,username:username});
        const match=await addCommentToProduct(req.params.id,newComment);
        if(match===false)return res.status(404).json({message:'Not Found'});
        await newComment.save();
        return res.json(newComment);
    } catch (error) {
        return res.status(400).json({message:'Bad Request'});
    };
};

controller.getCommentsByPostId=async(req,res)=>{
    try {
        const comments=await Comment.find({postId:req.params.id});
        return res.json(comments);
    } catch (error) {
        return res.status(404).json({message:'No Comments Found'});
    };
};

const addCommentToProduct=async(id,comment)=>{
    const product=await Product.findById(id);
    if(!product)return false;
    await product.comments.push(comment._id);
    return true;
};
module.exports=controller;