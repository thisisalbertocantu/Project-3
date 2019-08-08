const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Routes setup
var router = express.Router();
require('./routes/api/routes')(router);

var usersRoute = require('./routes/api/users');
var authRoute = require('./routes/api/auth');
var profileRoute = require('./routes/api/profile');
var postsRoute = require('./routes/api/posts');
var faqRoute = require('./routes/api/faq');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended:false}));

app.use(express.static('client/build'));
// Routes
//app.use(router);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);
app.use('/api/faqs', faqRoute);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

// Serve static assets in production
if (process.env.NODE_ENV ==='production'){

}

// Start listening on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));