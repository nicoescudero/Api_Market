const {Router}=require('express');
const routes=Router();
const token=require('../utils/verifyToken');
routes.use('/user',require('../controllers/user/routes'));
routes.use('/products',token,require('../controllers/products/routes'));
routes.use('/comments',token,require('../controllers/comments/routes'));
routes.get('/authenticated',token,(req,res)=>{
    return res.status(200);
});

routes.get('/',(req,res)=>{return res.json({message:'Api Market Light'})});

module.exports = routes;