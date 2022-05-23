const {Router}=require('express');
const routes=Router();
const token=require('../utils/verifyToken');
routes.use('/user',require('../controllers/user/routes'));
routes.use('/products',token,require('../controllers/products/routes'));

routes.get('/',(req,res)=>{
    res.send('LocalHost 3000');
})

module.exports = routes;