const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chat');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// create public directories to store user data
var dirs = ['./public/image', './public/video', './public/audio', './public/other'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
});

app.use(bodyParser.json());

app.use(express.static("./public"));

require('dotenv').config();

app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/chat', chatRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
