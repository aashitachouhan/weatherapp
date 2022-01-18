require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");


const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
        res.render("strt");
})

app.post("/weather",function(req,res){
    const query=req.body.cityName;
    const unit="metric";
    const apiKey=process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit +"&appid="+ apiKey;

    https.get(url,function(response){
        //console.log(response);
        response.on("data",function(data){
             const weatherData= JSON.parse(data);
             var location=query;
             var country=weatherData.sys.country;
             var temp= weatherData.main.temp;
             var humidity= weatherData.main.humidity;
             var pressure= weatherData.main.pressure;
             var tempmin=weatherData.main.temp_min;
             var tempmax=weatherData.main.temp_max;
             var type= weatherData.weather[0].main;
             var wind=weatherData.wind.speed;
             //res.render("list",{location: location,country: country,temp: temp,temp_max: temp_max,temp_min: temp_min,type: type});
             res.render("list",{location: location,humidity: humidity,pressure: pressure,wind: wind,country: country,temp: temp,tempmax: tempmax,tempmin: tempmin,type: type});
        })
    })
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server has started successfully!!");
})