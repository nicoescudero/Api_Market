const getExpeditiousCache=require('express-expeditious');

const options={
    namesSpace:'productList',
    defaultTtl:'1 minute'
}

const cache=getExpeditiousCache(options);

module.exports=cache;
