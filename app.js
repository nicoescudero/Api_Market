const express=require('express');
const app=express();
const morgan=require('morgan');
const path=require('path');
const cors=require('cors');
require('dotenv').config();
require('./settings/mongoose');
//settings
app.set('port',process.env.PORT || 3000);
//middlewares
app.use(cors({origin:['https://nicoescudero.github.io/React-Market-App']}))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
//routes
app.use('/',require('./routes/index.routes'));


app.listen(app.get('port'),()=>console.log(`PORT: ${app.get('port')}`));