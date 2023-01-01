const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

/*
* Middleware
*/
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.sendFile('index.html'))

app.use((err, req, res, next) => {
  res.json({ error: err.message })
})

const corsOptions ={ //Allows server and client to connect, as otherwise may complain.
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


/*
* MONGOOSE and MONGODB
*/
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error(err))
  .then(() => console.log("Connected to mongoose server"))

users = [{  //To be replaced with actual database
    id: Date.now().toString(),
    username: "Fred123",
    password: "$2b$10$iRwJOgtDDcCHAwePEh1e4uglG.AtICBUZIdBlLJazOW2eKQGq2cPW", //The password is 1234. This is encypted
    fullname: "Fred McDonald",
    cplevel: "4"}]

app.get("/users", cors(), (req, res)=>{ //returns users as json
    res.json(users)
})

app.post('/register', async (req, res)=> { //allows addition to users array
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const cplevel = req.body.cplevel;
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        users.push({
            id: Date.now().toString(),
            username: username,
            password: hashedPwd,
            unhashed_password: password, //for testing purposes, will be removed in release
            fullname: fullname,
            cplevel: cplevel
        })
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch {
    }
    console.log(users)
});

app.post('/login', async (req,res)=> { //Verifies existance in user array and checks password. Not ideal
    const username = req.body.username;
    const password = req.body.password;
    user = users.find(user => user.username == username)
    console.log(user)
    let msg= [false]
    if (user == null) {
        msg= [false, "No such user"]
     }else if (await bcrypt.compare(password, user.password)) {
        msg= [true,"login successful"]
    } else {
        msg = [false,"incorrect password"]
    }
    res.send(msg)
})

// world's worst routing
require("./routes/recording.routes")(app);


const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server has started! Now listening on http://localhost:${port}`)
  })