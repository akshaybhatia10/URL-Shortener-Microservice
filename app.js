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
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
    
    
app.get("/",function(req,res){
    
    res.render("index");
});    


app.get("/new/:url(*)",function(req,res){
    var url = req.params.url ;
    if(validateURL(url)){
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
   var code = req.params.code;
   Url.findOne({short : code},function(err,foundUrl){
       if(foundUrl != null){
       if(err){
        res.redirect("/");
        }
       else{
           res.redirect(foundUrl.url);
       }
      }else{
          
            res.json({ error: "No corresponding shortlink found in the database." });
      }
       
   });
  
});



function validateURL(url) {
    
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }

app.listen(process.env.PORT, process.env.IP);


