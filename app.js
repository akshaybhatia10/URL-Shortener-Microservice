var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
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

app.get("/")
app.get("/new/:url(*)",function(req,res){
    var url = req.params.url ;
    if(yesOrNo(url)){
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

app.get("/:code",function(req, res) {
   var code = req.params.code ;
   Url.findOne({short : code},function(err,foundUrl){
       if(err){
           console.log(err);
       }
       else{
           res.redirect(foundUrl.url);
       }
       
   });
});

//To validate URL
function yesOrNo(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }
app.listen(process.env.PORT, process.env.IP);


