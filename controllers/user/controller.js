const jwt=require('jsonwebtoken');
const User=require('./model');
const controller={};

controller.signin=async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user)return res.status(404).json({message: 'User not found'});
    const validatePassword=await user.validatePassword(req.body.password);
    if(!validatePassword)return res.status(401).json({auth: false, token: null});
    const token=jwt.sign(
        {id:user._id, email:user.email},
        process.env.SECRET_KEY,
        {
            expiresIn:60*60*24
        });
    return res.json({token,user:{email:user.email,userName:user.userName}});
}

controller.signup=async(req,res)=>{
    const oldmail=await User.findOne({email:req.body.email});
        if(oldmail)return res.status(401).json({message: 'This email already exists'});
        else{
            const user=new User({
                userName:req.body.userName,
                password:req.body.password,
                email:req.body.email
            });  
            user.password=await user.encryptPassword(req.body.password);
            await user.save();
            const token=jwt.sign(
                {id:user._id, email:user.email, password: user.password},
                process.env.SECRET_KEY,
                {
                    expiresIn:60*60*24
                });
                return res.status(201).json({user,auth:true,token});
        }
}

controller.update=async(req,res)=>{
    try {
        const {userName,email,password,newPassword}=req.body;
        const user=await User.findById(req.user);
        if(!user)return res.status(404).json({message: 'Not user found'});
        const match=await user.validatePassword(password);
        if(!match) return res.status(403).json({message:'Invalid Password'})
        const hash=await user.encryptPassword(newPassword);
        const update=await User.findOneAndUpdate({_id:req.user},{userName:userName,email:email,password:hash});
        return res.json({user:update});
    } catch (error) {
        res.status(400).json({message: 'Bad Request'});
    }
};  

controller.addProduct= async (id,product) => {
    const user=await User.findById(id);
    if(!user) return false;
    await user.products.push(product);
    await user.save();
    return true;
};

module.exports=controller;