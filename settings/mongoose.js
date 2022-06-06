const mongoose=require('mongoose');

const {NODE_ENV,DB_URI_DEVELOPMENT,DB_URI_CONNECTION}=process.env;
let uri='';

if(NODE_ENV === 'production')uri=DB_URI_CONNECTION;
else uri=DB_URI_DEVELOPMENT;


const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}

const connect=async()=>
await mongoose.connect(uri,options)
.then(()=>console.log(`Connected to mongodb`))
.catch(error=>console.log(error));

connect();