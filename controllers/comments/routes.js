const {Router}=require('express');
const routes=Router();
const ctrlComments=require('./controller');

routes.get('/:id',ctrlComments.getCommentsByPostId);
routes.post('/new/:id',ctrlComments.createComment);

module.exports=routes;