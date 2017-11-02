const request = require('request');
const axios = require('axios');
const forecastApiUrl = 'https://api.darksky.net/forecast/3022e11034c8388c1b56edcffad4f23e/';

var weatherCallback = (body)=>{
    return {
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
    }
}
var getWeather = (latitude,longitude,callback)=>{
    request({
        url:`${forecastApiUrl}${latitude},${longitude}`,
        json:true
    },(err,response,body)=>{
       if(err){
        callback("Unable to connect to Forecast.io server.");
       }
       else if(!err && response.statusCode === 200){
        callback(undefined,weatherCallback(body));
       }else{
        callback("Unable to fetch weather.");
       }
    });
};

var getWeatherPromise = (latitude,longitude) =>{
    return new Promise((resolve,reject)=>{
        axios.get(`${forecastApiUrl}${latitude},${longitude}`)
        .then(respone=>{
           if(respone.status === 200){
            resolve(weatherCallback(respone.data));
           }else{
            reject("Unable to fetch weather.");
           }
        }).catch(err=>{
           reject(err);
       });
    });
}

module.exports = {
    getWeather,
    getWeatherPromise
}