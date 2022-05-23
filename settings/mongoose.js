const mongoose=require('mongoose');
const connect=async()=>
await mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log(`Connected to mongodb`))
.catch(error=>console.log(error));

connect();