var express  = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request")
    
app.use(bodyParser.urlencoded({extended: true}));    
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

var quote = [];
var author = [];
app.get("/",function(req,res){
    res.render("index",{quote:quote,author:author});
})

app.post("/",function(req,res){
    request('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',function(error,response,body){
    if(!error && response.statusCode == 200 ){
        var parsedData = JSON.parse(body);
        quote = [];
        author = [];
        author.push(parsedData[0]["title"]);
        quote.push(parsedData[0]["content"]);
        res.redirect("/");
        }
    } );
    
});




    
    
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Has Started");
})