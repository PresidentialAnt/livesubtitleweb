
const corsWhitelist=[
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]
/* Reference 1 - taken from https://www.youtube.com/watch?v=f2EqECiTBL8*/
const corsOptions ={ //Allows server and client to connect, otherwise will complain.
   origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1|| !origin){
        callback(null, true)
    }else {
        callback(new Error('Source address not allowed access'))
    }
   }, 
   credentials: true,
   optionSuccessStatus:200,
}

module.exports=corsOptions;