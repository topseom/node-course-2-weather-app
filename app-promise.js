const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
.options({
    a:{
        demand: true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddressPromise(argv.a).then(result=>{
    return weather.getWeatherPromise(result.latitude,result.longitude);
}).then(weather=>{
    console.log(`It's currently ${weather.temperature} It feels like ${weather.apparentTemperature}`);
}).catch(err=>{
    console.log(err);
});
