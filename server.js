const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();

const port = process.env.PORT || 3000;
app.use(fileUpload({}));

app.use(cors());

app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'p*prlsti*re7Lj@Chlse',
    resave: true,
    saveUninitialized: true
  })
);



app.use('/gdrive', require('./routes/gdrive'));
app.use('/ibmFile', require('./routes/ibmFileStorage'));
app.use('/dropbox', require('./routes/dropbox'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
