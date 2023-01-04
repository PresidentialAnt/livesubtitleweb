const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const corsOptions = require('./config/cors.config')
const mongoose = require('mongoose');
const app = express();
const path = require('path');

/*
* Middleware
*/
app.use(cors(corsOptions))
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use((err, req, res, next) => {
    res.json({ error: err.message })
});


/*
* MONGOOSE and MONGODB
*/
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error(err))
  .then(() => console.log("Connected to mongoose server"))


/*
* ROUTES?
*/
app.use('/',require('./routes/index'))
app.use('/login', require('./routes/login'));
app.use('/users',require('./routes/users'))
app.use('/register', require('./routes/register'));

// world's worst routing
require("./routes/recording.routes")(app);


const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server has started! Now listening on http://localhost:${port}`)
  })