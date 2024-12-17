const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const hostname = '0.0.0.0';
const port = 3000;
const router = require('./routes/index')
const mongoose = require('mongoose')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(router);

app.get('/status', (req, res) => {
    res.json({status: 'ok'});
  })

  mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
  

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });