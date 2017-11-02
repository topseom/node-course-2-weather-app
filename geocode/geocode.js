const request = require('request');
const axios = require('axios');
const fs = require('fs');
const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const fileName = "./geocode/default-location.json";

var geocodeCallback = (body)=>{
    return {
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
    }
}

var geocodeAddress = (address,callback)=>{
    if(!address){
        address = getDefaultAddress();
        if(!address){
            callback("Unable to find defaule location.");
            return 0;
        }
    }
    request({
        url:`${googleApiUrl}${encodeURIComponent(address)}`,
        json:true
    },(err,response,body)=>{
        if(err){
            callback("Unable to connect to google server.");
            return 0;
        }else if(body.status === "ZERO_RESULTS"){
            callback("Unable to find that address.");
            return 0;
        }else if(body.status === "OVER_QUERY_LIMIT"){
            callback("Over query limit! please resend later.");
            return 0;
        }else if(body.status === "OK"){
            callback(undefined,geocodeCallback(body));
        }
    });
}

var setDefaultAddress = (address)=>{
    fs.writeFileSync(fileName,JSON.stringify(address));
    console.log("set default success!");
}

var getDefaultAddress = () =>{
    try{
        var addressString = fs.readFileSync(fileName);
        address = JSON.parse(addressString);
        return address;
    }catch(e){
        return undefined;
    }
}


var geocodeAddressPromise = (address)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${googleApiUrl}${encodeURIComponent(address)}`)
        .then(respone=>{
           if(respone.data.status === 'ZERO_RESULTS'){
                reject("Unable to find that address");
           }
           resolve(geocodeCallback(respone.data));
        }).catch(err=>{
           reject(err);
       });
    })
    
}

var logAddress = (body)=>{
    console.log(`Address: ${body.address}`);
    console.log(`Latitude: ${body.latitude}`);
    console.log(`Longitude: ${body.longitude}`);
}

module.exports = {
    geocodeAddress,
    geocodeAddressPromise,
    logAddress,
    setDefaultAddress
}