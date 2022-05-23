const {Router}=require('express');
const routes=Router();
const ctrlUsers=require('./controller');
const token=require('../../utils/verifyToken');

routes.put('/update',token,ctrlUsers.update);

routes.post('/signIn',ctrlUsers.signin);

routes.post('/signUp',ctrlUsers.signup);

module.exports = routes;