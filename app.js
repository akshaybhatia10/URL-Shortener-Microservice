var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    validurl = require("valid-url"),
    shortid = require("shortid");
    
    
mongoose.connect("mongodb://localhost/url-shortener");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

var urlSchema = new mongoose.Schema({
    url : String,
    short : String
    
});

var Url = mongoose.model("Url", urlSchema);

app.get("/",function(req,res){
    
    res.render("index");
});

app.get("/new/:url(*)",function(req,res){
    Url.findById({},function(err,url){
        if(err){console.log(err)}
        else{res.send("ok")}
        
    });
    var url = req.params.url ;
    res.json({original:url});
});
    
app.listen(process.env.PORT, process.env.IP);