const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

/*
* Middleware
*/

const corsWhitelist=['http://localhost:3000','http://127.0.0.1:3000']
const corsOptions ={ //Allows server and client to connect, otherwise will complain.
   origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1|| !origin){
        callback(null, true)
    }else {
        callback(new Error('Source address not allowed access'))
    }
   }, 
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use((err, req, res, next) => {
    res.json({ error: err.message })
});


/*
* ROUTES?
*/
app.use('/',require('./routes/index'))
app.use('/login', require('./routes/login'));
app.use('/users',require('./routes/users'))
app.use('/register', require('./routes/register'));


/*
* MONGOOSE and MONGODB
*/
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error(err))
  .then(() => console.log("Connected to mongoose server"))

// world's worst routing
require("./routes/recording.routes")(app);


const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server has started! Now listening on http://localhost:${port}`)
  })