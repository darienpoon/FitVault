const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const router = require('./routes.js');
require("dotenv").config();
const path = require('path');

const openai = require('openai')
openai.apiKey = process.env.API_KEY

const app = express()

const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

const photosUploadedDir = path.join(__dirname, 'photosUploaded');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/server/photosUploaded', express.static(photosUploadedDir));


app.use('/', router);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`)
})