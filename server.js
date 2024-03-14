const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./src/routes/orderRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb+srv://DigitalMenu:g673OeVca8Sbrl7c@cluster0.v6leson.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// ADD THIS
var cors = require('cors');
app.use(cors());
app.use(express.json());


// Routes
app.use('/restro', orderRoutes);

// Render Html File
app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname, 'templates/menu.js'));
  return res.send("restaurant");

});


 // Endpoint to retrieve JSON data from the file
 app.get('/1000', (req, res) => {
  fs.readFile('./RestroData/1000.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Error reading file');
      } else {
          // Parse JSON data
          const jsonData = JSON.parse(data);
          res.json(jsonData);
      }
  });
});

app.get('/1001', (req, res) => {
  fs.readFile('./RestroData/1001.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Error reading file');
      } else {
          // Parse JSON data
          const jsonData = JSON.parse(data);
          res.json(jsonData);
      }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

