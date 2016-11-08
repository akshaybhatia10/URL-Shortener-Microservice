var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    validUrl = require("valid-url"),
    shortid = require("shortid");
    
    
app.get("/",function(req,res){
    
    res.render("index");
});    
    
app.listen(process.env.PORT, process.env.IP);


