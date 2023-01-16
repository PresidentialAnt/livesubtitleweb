require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors.config')
const verifyACT = require('./middleware/verifyACT.middleware')
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');


/*
* Middleware
*/
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }))

/*
* MONGOOSE/MONGODB
*/
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoose server"))
  .catch(err => console.error(err))

/*
* ROUTES
*/

app.use('/register', require('./routes/register.route'));
app.use('/login', require('./routes/login.route'));
app.use('/logout', require('./routes/logout.route'));
app.use('/refresh', require('./routes/refresh.route'));



app.use(verifyACT); /*  Everything below this line requires an access token, ensure it is provided.
                        Look at function getUsers on the Login react page for reference on how to attach token.
                        if the access token is valid, the associated user will be passed as req.username*/
                        
app.use('/recordings', require('./routes/recording.route'))


const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server has started! Now listening on http://localhost:${port}`)
  })