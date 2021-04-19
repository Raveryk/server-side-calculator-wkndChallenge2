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



// receiving data from client and pushing it into calcHistory
app.post('/numbers', (req, res) => {
    let newNums = req.body;
    console.log('Got new nums', newNums);
    
    calcHistory.push(newNums);

    calcNewNums(calcHistory);
    console.log(calcHistory);
    res.sendStatus(201);

})

// sending back calcHistory to client
app.get('/calc', (req, res) => {
    res.send(calcHistory)
})

// deleting calcHistory
app.delete('/calc', (req, res) => {
    res.send('DELETE HISTORY');
    calcHistory = [];
})


// Setting up logic for calculations
function calcNewNums() {
    for ( let item of calcHistory ) {
        if( item.operator == '+' ) {
        item.calc = Number(item.num1) + Number(item.num2);
        }
        if( item.operator == '-' ) {
        item.calc = Number(item.num1) - Number(item.num2);
        }
        if( item.operator == '*' ) {
        item.calc = Number(item.num1) * Number(item.num2);
        }
        if( item.operator == '/' ) {
        item.calc = Number(item.num1) / Number(item.num2);
        }

    }
    console.log('History of Calculations: ', calcHistory);
}




// set up PORT
const PORT = 8000;
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    
})