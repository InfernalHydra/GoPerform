const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
//mongoose.connect('mongodb://localhost/goperform', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.session({secret : 'keyboard cat'}));


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

});

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
});

app.post('/add', (req, res) => {
  
})

// app.post('/register', (req,res) => {
//   if(req.user) res.redirect('/');

//   User.find({'email' : req.body.email}, (foundUser, err) => {
//     if(err) console.log(err);
//     if(foundUser.length != 0)
//   }
// });



app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});

