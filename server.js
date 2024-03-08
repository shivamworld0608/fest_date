const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/uk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model
const Message = mongoose.model('Message', {
  username: String,
  roll: String,
  email: String,
  branch: String,
  year: String,
  ig: String,
  crushn: String,
  crushr: String,
  crushy: String,
  crushb: String,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
  const {  username,roll,email,branch,year,ig,crushn,crushr,crushy,crushb } = req.body;
  const newMessage = new Message({ username,roll,email,branch,year,ig,crushn,crushr,crushy,crushb });

  try {
    await newMessage.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
