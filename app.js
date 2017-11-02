const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
.command("setDefault","set a default location",{
    location:{
        describe:"location for set a default.",
        alias:'a',
        demand:true
    }
})
.options({
    a:{
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
})
.help()
.alias('help','h')
.argv;

if(argv._[0] == "setDefault"){
    geocode.setDefaultAddress(argv.a);
}else{
    geocode.geocodeAddress(argv.a,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            weather.getWeather(result.latitude,result.longitude,(err,weather)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`It's currently ${weather.temperature} It feels like ${weather.apparentTemperature}`);
                }
            });
        }
    });
}






