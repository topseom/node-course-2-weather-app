var asyncAdd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }else{
                reject("Arguments must me number!");
            }
        },1500);
    });
}

asyncAdd(5,7).then((res)=>{
    console.log(res);
    return asyncAdd(res,33);
}).then((res)=>{
    console.log("Should be 45",res);
}).catch(err=>{
    console.log(err);
})
/*var somePromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('Hey. It worked!');
        reject("Unable to fulfill promise");
    },2500) 
});

somePromise.then((message)=>{
    console.log("Success : "+message);
},(err)=>{
    console.log("Error : "+err);
});*/




