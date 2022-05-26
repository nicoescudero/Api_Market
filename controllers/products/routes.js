const {Router}=require('express');
const routes=Router();
const multerConfig=require('../../utils/multerConfig');
//const cache=require('../../utils/cache');
const ctrlProducts=require('./controller');

routes.get('/',ctrlProducts.getProducts);

routes.get('/all',ctrlProducts.getAllProducts);

routes.get('/id/:id',ctrlProducts.getProductById);

routes.post('/new',multerConfig,ctrlProducts.createProduct);

routes.put('/update/:id',multerConfig,ctrlProducts.updateProductById);

routes.delete('/delete/:id',ctrlProducts.deleteProductById);


module.exports=routes;