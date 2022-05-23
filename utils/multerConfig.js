const multer=require('multer');
const {v4 : uuid}=require('uuid');
const path=require('path');

const storage=multer.diskStorage({
    destination:path.join(__dirname, '../public'),
    filename:(req,file,cb)=>
    cb(null,uuid()+path.extname(file.originalname))
})

const config=multer({
    storage,
    dest:path.join(__dirname, '../public'),
    limits:{fileSize:9000000},
    fileFilter:(req,file,cb)=>{
        const types=/jpeg|jpg|png/;
        const mimetype=types.test(file.mimetype);
        const extname=types.test(path.extname(file.originalname));
        if(mimetype && extname) return cb(null,true);
        cb("Error: the file must be an image");
    }
}).single('image');

module.exports=config;
