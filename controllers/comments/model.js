const {Schema,model} = require('mongoose');

const commentSchema=new Schema({
    postId:{
        type:Schema.ObjectId,
        ref:'Product',
        required:true
    },
    authorId:{
        type:Schema.ObjectId,
        ref:'User',
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
});

module.exports= model('Comment',commentSchema);