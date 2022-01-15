require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");


const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var temp= "";
var location= "";
var country= "";
var temp_max= "";
var temp_min= "";
var type="Unknown";

app.get("/",function(req,res){
   res.render("list",{location: location,country: country,temp: temp,temp_max: temp_max,temp_min: temp_min,type: type});
})

app.post("/",function(req,res){
    const query=req.body.cityName;
    const unit="metric";
    const apiKey=process.env.API_KEY;
    //https://api.openweathermap.org/data/2.5/weather?q=Ajmer&units=metric&appid=b320904132dd6dd782303b48f82434ba
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit +"&appid="+ apiKey;

    https.get(url,function(response){
        //console.log(response);
        response.on("data",function(data){
             const weatherData= JSON.parse(data);
             location=query;
             country=weatherData.sys.country;
             temp= weatherData.main.temp;
             tempmin=weatherData.main.temp_min;
             tempmax=weatherData.main.temp_max;
             type= weatherData.weather[0].main;
             res.render("list",{location: location,country: country,temp: temp,temp_max: temp_max,temp_min: temp_min,type: type});
            //  const weatherDescription= weatherData.weather[0].description;
            //  const icon = weatherData.weather[0].icon;
            //  const imageURL= "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            //  res.write("<p> The weather is currently " + weatherDescription + "</p>");
            //  res.write("<h1>The temp. at "+ query +" is "+ temp + " degree Celsius </h1>");
            //  res.write(" <img src=" + imageURL +" >")
            //  res.send();
            //const weatherData= JSON.stringify(data);
        })
    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})