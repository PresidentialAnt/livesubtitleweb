const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const corsOptions = require('./config/cors.config')
const verifyJWT = require('./middleware/verifyJWT.middleware')
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

/*
* Middleware
*/
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use((err, req, res, next) => {
    res.json({ error: err.message })
});


/*
* MONGOOSE and MONGODB
*/
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch(err => console.error(err))
//   .then(() => console.log("Connected to mongoose server"))


/*
* ROUTES?
*/
app.use('/',require('./routes/index.route'))
app.use('/register', require('./routes/register.route'));
app.use('/login', require('./routes/login.route'));
app.use('/logout', require('./routes/logout.route'));
app.use('/refresh', require('./routes/refresh.route'));

app.use(verifyJWT); /*  Everything below this line requires an access token, ensure it is provided.
                        Look at function getUsers on the Login react page for reference on how to attach token.
                        if the access token is valid, the associated user will be passed as req.username*/
app.use('/users',require('./routes/users.route'));

// world's worst routing
require("./routes/recording.routes")(app);


const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server has started! Now listening on http://localhost:${port}`)
  })