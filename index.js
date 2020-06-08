const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chat');
const app = express();

require('dotenv').config();

app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/chat', chatRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});