const express = require('express');
const path = require('path')
const session = require('express-session')
const passport = require('./config/passport');

const mongoose = require('./config/mongoose')
const User = require('./models/user');
const Flight = require('./models/flight');
const Reservation = require('./models/reservation');
const app = express();
const PORT = 3001


//body parser
app.use(express.json())
// app.use(express.static(app.use(express.static("client/build"))))

//set up session
app.use(session({
  secret: "General",
  resave: false,
  saveUninitialized: true
}))

//initialize passport
app.use(passport.initialize())
//tell passport to use session
app.use(passport.session())
// const localStrategy = require('passport-local').Strategy;
// // const User = require('../models/user')
 
// passport.use(new localStrategy(
// User.authenticate()

// ))

// passport.serializeUser(User.serializeUser());

// passport.deserializeUser(User.deserializeUser());
// app.use(passport.session());

app.post('/api/flight', async (req, res) => {
  const { totalSeats, currentReservations  } = req.body;
  //create a new flight
  const flight = new Flight({totalSeats, currentReservations});
  //set the flight num
  flight.setFlightNum();
  //create the flight using the data in the flight object
  try {
    const flightData = await Flight.create(flight);
    res.json(flightData)
  } catch (error) {
    res.json(error)
  }
  
})

app.get('/api/flight', async (req, res) => {
// if a query comes through, it's stored in req.query
if(req.query){
  const flightData = await Flight.find(req.query)
  res.json(flightData)
} else {
  const allFlights = await Flight.find({});
  res.json(allFlights)
}
})

app.post('/api/reservation', async (req, res) => {
  const {numTickets, partyNum, name, flight } = req.body;
  //create the reservation
  const reservation = await Reservation.create({numTickets, partyNum, name, flight})
  //when we move into production with front end pass in req.session.user._id
  //find the user that's logged in, and push the newly created reservation to that item
    const updatedUser =  await User.findOneAndUpdate({}, {$push: {
      reservations: reservation._id
    }}, {new: true})
    console.log(updatedUser)
    //pass in flight._id
    //find the flight by _id, set the current reservations to the new number based on the new reservation
    const updatedFlight = await Flight.findOneAndUpdate({}, {$set:{
      currentReservations: 10
    }})

    console.log(updatedFlight);
  // const result = await reservation.save()
  res.json(reservation);
})

//create new user using the local strategy
app.post('/auth/local/register', async (req, res) => {
  console.log(req.body)
  const {email, firstName, lastName, password} = req.body;
  //pass in the user's email, username
  const user = new User({email, firstName, lastName});
  //create hte user, by passing in the user object and the password to the register method
  try {
      const registered = await User.register(user, password);
      req.logIn(registered, (error) => {
        error ? res.json(error) : console.log(registered)
      });
      console.log(req.user)
      req.session.user = req.user
      console.log(req.session.user)
      res.json(registered)
  } catch (error) {
    res.json(error)
  }

})

//login with local strategy using the passport.authenticate middleware
app.post('/auth/local/login', passport.authenticate('local'), (req, res) => {
  req.session.user = req.user
  res.json(req.user)
})

app.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000/');
});


app.get('/auth/session', (req, res) => {
  if(req.session.user) {
    res.json({ user:req.session.user, loggedIn: true });
  } else {
    res.json({
      loggedIn: false,
      user: {}
    })
  }
})
//facebook authorization
//run the facebook authorization using the authenticate middleware, ask for email scope
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
//run call back, redirect if successful
app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/failure'}), (req, res) => {
  res.redirect('http://localhost:3000/success')
})
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// })

app.listen(PORT, ()=> {
  console.log(`Listening on ${PORT}`)
})