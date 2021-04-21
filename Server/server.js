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
    newNums.calc = calcAnswer(newNums);

    calcHistory.push(newNums);

    console.log(calcHistory);
    res.sendStatus(201);

})

// sending back calcHistory to client
app.get('/numbers', (req, res) => {
    res.send(calcHistory)
})

// deleting calcHistory
app.delete('/numbers', (req, res) => {
    res.send('DELETE HISTORY');
    calcHistory = [];
})


// Setting up logic for calculations
function calcAnswer(nums) {
    let answer = 0;

        if( nums.operator == '+' ) {
            answer = Number(nums.num1) + Number(nums.num2);
        }
        if( nums.operator == '-' ) {
            answer = Number(nums.num1) - Number(nums.num2);
        }
        if( nums.operator == '*' ) {
            answer = Number(nums.num1) * Number(nums.num2);
        }
        if( nums.operator == '/' ) {
            answer = Number(nums.num1) / Number(nums.num2);
        }
        return answer;
    }





// set up PORT
const PORT = 8000;
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    
})