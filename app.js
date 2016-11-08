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

app.get("/new/:url(*)",function(req,res){
    var url = req.params.url ;
    if(validUrl.isUri(url)){
        var code = shortid.generate();
        var newUrl = {url:url,short:code};
        Url.create(newUrl,function(err,foundUrl){
           if(err){
               console.log(err);
           } else{
                   res.json({original:url,new: foundUrl.short });
           }
        });
        
    }
    else{
        res.json({ error: "Wrong url format, make sure you have a valid protocol and real site." });
    }
});

    
app.listen(process.env.PORT, process.env.IP);


