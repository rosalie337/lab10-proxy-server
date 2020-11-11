require('dotenv').config();
const { mungedWeather, mungedLocation, mungedYelp } = require('../utils.js');
const express = require('express');
const cors = require('cors');

const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=${process.env.WEATHER}`;
  
    const response = await request.get(URL);
  
    const newResponse = mungedWeather(response.body);
  
    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});

app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION}&q=${req.query.search}&format=json`;
  
    const response = await request.get(URL);
  
    const newResponse = mungedLocation(response.body);
  
    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});

app.get('/trails', async(req, res) => {
  try {
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.HIKING}`;
  
    const response = await request.get(URL);
    
    res.json(response.body.trails);
  } catch(e) {
    res.json({ error: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {
    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;
  
    const response = await request.get(URL)
    .set('Authorization', `Bearer ${process.env.YELP}`);

    const newResponse = mungedWeather(response.body);
  
    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});



app.use(require('./middleware/error'));

module.exports = app;
