// bring in express

const express = require('express');

//make an instance of server
const app = express();

// set up static folder to send files to client
app.use( express.static( 'Server/Public') );

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( {extended: true} ) );

//Source of truth

let calcHistory = [];

app.post('/numbers', (req, res) => {
    let newNums = req.body;
    console.log('Got new nums', newNums);

    calcHistory.push(newNums);
    res.sendStatus(201);
    
})



// set up PORT
const PORT = 8000;
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    
})