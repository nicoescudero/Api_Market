const {Router}=require('express');
const routes=Router();
const token=require('../utils/verifyToken');
routes.use('/user',require('../controllers/user/routes'));
routes.use('/products',token,require('../controllers/products/routes'));
routes.use('/comments',token,require('../controllers/comments/routes'));
routes.get('/authenticated',token);

module.exports = routes;