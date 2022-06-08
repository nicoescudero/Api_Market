const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
require('dotenv').config();
require('./settings/mongoose');
//middlewares
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
app.use('/',require('./routes/index.routes'));

app.listen(process.env.PORT || 3000);