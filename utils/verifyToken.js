const jwt=require('jsonwebtoken');

module.exports=function verify(req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1];
        if(!token)return res.status(401).json({message:'No Token Provided'});
        const user=jwt.verify(token,process.env.SECRET_KEY);
        if(user){
            req.user=user.id;
            next();
        }else return res.status(403).json({message:'Invalid Token'});
    }
    catch(err){
        return res.send(401).json({message:'NO TOKEN PROVIDED'});
    };
};
