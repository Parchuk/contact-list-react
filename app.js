const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
// const cors = require('cors');

const PORT = 8000;
const app = express();
// app.use(cors());

// mongoDB connection string
const MONGO_URL =
  'mongodb+srv://admin:1q2w3e4r@cluster0.ifpl6.mongodb.net/contact-list?retryWrites=true&w=majority';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const contactRoute = require('./routes/contactRoute');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('avatar')
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api/', contactRoute);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
