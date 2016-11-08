var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    validUrl = require("valid-url"),
    shortid = require("shortid");

mongoose.connect("mongodb://localhost/url-shortener");
app.set("view engine", "ejs");

var urlSchema = new mongoose.Schema({
    
    url : String,
    short : String
    
});

var Url = mongoose.model("Url", urlSchema);    
    
app.get("/",function(req,res){
    
    res.render("index");
});    
    
app.listen(process.env.PORT, process.env.IP);


