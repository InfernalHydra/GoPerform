const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
//mongoose.connect('mongodb://localhost/goperform', {useNewUrlParser: true});

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/goperform', {useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const User = require('./schema/User');
const Performance = require('./schema/Performance');

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'laptop miro lunatic hai',
  saveUninitialized: false,
  resave: false,
  cookie: {
     maxAge: 3600000 * 24 * 7 * 2 // 2 weeks
  }
}));

app.use((req, res, next) => {
  if(req.session.userId)
  {
    User.find({_id : req.session.userId}, (err, users) => {
        var user = users[0];
        user.password = null;
        delete user.password;
        req.user = user;
        next();
    });
  }
  else
  {
    next();
  }
});

app.get('/', (req, res) => {

});

app.post('/login', (req, res)=>{
  User.find({'email' : req.body.email}, (err, users) => {
    if(err) console.log(err);    

    if(users.length === 0)
    {      
      res.json({"error" : "invalid username"});
      return
    }
    else
    {
      var user = users[0];
      console.log(users)
      bcrypt.compare(req.body.password, user.password, (err, match) => {
          if(err) console.log(err);
          if(match)
          {
            req.session.userId = user._id;
            res.json({"status" : "logged in"});
          }
          else
          {
            res.json({"error" : "invalid password"});
          }
      })
    }
  })
});

app.get('/logout', (req, res) => {
    if(req.session)
    {
      req.session.destroy();
    }
    res.json({"status" : "logged out"});
});

app.post('/add', (req, res) => {
  //console.log(req.user);
  // if(!req.user)
  // {
  //   res.json({"error" : "no user logged in"});
  //   return;
  // }
  // else
  // {
    Performance.create({location : {latitude : req.body.latitude, longitude : req.body.longitude}, title : req.body.title});
    res.json({"status" : "success"});
  // }

})

app.get('/api/performances', (req, res) => {
    Performance.find({}, {location : 1, title : 1}, (err, performances) => {
        if(err) console.log(err);
        res.send(JSON.stringify(performances));
    })
})

app.post('/register', (req,res) => {
  if(req.user) res.json({"error" : "user already logged in"});
  User.find({'email' : req.body.email}, (err, foundUser) => {
    if(err) console.log(err);  
    if(foundUser != null && foundUser.length > 0)
    {
      res.json({"error" : "email already in use"});
    }
    else
    {
      bcrypt.hash(req.body.password, null, null, (err, hash) => {
        User.create({password: hash, username : req.body.username, name : req.body.name, email : req.body.email, phoneNumber : req.body.phoneNumber, socialHandle : req.body.socialHandle}, (err, user) => {
          if(err) console.log(err);
          req.session.userId = user._id;
          res.json({"status" : "success"});
          return;
        });
        
      })
    }
  })
});



app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});