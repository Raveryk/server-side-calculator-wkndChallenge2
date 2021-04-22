$(document).ready(onReady);

function onReady() {
    console.log('I am jQuery, hear me roar!!');
    $('#submit-btn').on('click', Calculation)
    $('#add-btn').on('click', operatorSelector)
    $('#minus-btn').on('click', operatorSelector)
    $('#multiply-btn').on('click', operatorSelector)
    $('#divide-btn').on('click', operatorSelector);
    $('#clear-btn').on('click', clearInputs);
    $('#clear-history').on('click', clearHistory);
    //number handlers
    $('#oneNum').on('click', numSelector);
    $('#twoNum').on('click', numSelector);
    $('#threeNum').on('click', numSelector);
    $('#fourNum').on('click', numSelector);
    $('#fiveNum').on('click', numSelector);
    $('#sixNum').on('click', numSelector);
    $('#sevenNum').on('click', numSelector);
    $('#eightNum').on('click', numSelector);
    $('#nineNum').on('click', numSelector);
    $('#zeroNum').on('click', numSelector);
    $('#decimal').on('click', numSelector)


    getCalc();
}

// let num;
// function numSelector() {
    
//     if( $(this).text() == $('#oneNum').text() ) {
//         num = 1;
//     } else if(  $(this).text() == $('#twoNum').text() ) {
//         num = 2;
//     } else if(  $(this).text() == $('#threeNum').text() ) {
//         num = 3;
//     } else if(  $(this).text() == $('#fourNum').text() ) {
//         num = 4;
//     } else if(  $(this).text() == $('#fiveNum').text() ) {
//         num = 5;
//     } else if(  $(this).text() == $('#sixNum').text() ) {
//         num = 6;
//     } else if(  $(this).text() == $('#sevenNum').text() ) {
//         num = 7;
//     } else if(  $(this).text() == $('#eightNum').text() ) {
//         num = 8;
//     } else if(  $(this).text() == $('#nineNum').text() ) {
//         num = 9;
//     } else if(  $(this).text() == $('#zeroNum').text() ) {
//         num = 0;
//     }
//     console.log(num);
//     displayOnCalc(num);
//     return num;
// }
// 

/// LEFT OFF ON 4/21/2021 /// NEED TO:
/// - figure out how to pass numbers and operators back to server with current construction and in correct order for calculation.
/// - Connect all the other pieces!!!
/// - Style more!!
let num1;
let num2;
let operator;

function numSelector() {
    if(operator === undefined) {
    num1 = Number($(this).text());
    $('#calculator-display').append(`${num1}`);
    } else if (operator !== undefined) {
    num2 = Number($(this).text());
    $('#calculator-display').append(`${num2}`);
    }
}


function operatorSelector() {
    operator = $(this).text();
    $('#calculator-display').append(`${operator}`)
}



function Calculation() {
    // send inputs to the server for calc
    // console.log('You just calculated something!')

    let newNums = {
        num1: num1,
        operator: operator,
        num2: num2
    }
    
   

    console.log(`You input: ${newNums}`);

   //Conditional to only allow the POST call to happen if inputs have been filled.
    if( newNums.num1 === undefined || newNums.num2 === undefined ) {
    alert('Please input a calculation'); 
    } else (

    //ajax POST method to send data to the server for calculation
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: newNums
    }) .then( function( response )  {
        // console.log('Adding Nums');
        getCalc();

        // getNums();
    }) .catch( function( error ) {
        console.log('Error from the server', error);
        alert('Sorry, we could not process your numbers');
        // alert('Please fill out all necessary inputs.');  
    })

    
    )}





function clearInputs() {
    $('#calculator-display').empty();
    $('#solution').empty()
}

// creating global variable to hold whatever operator is selected
// let selectedOperator;
// // adding function
// function addNums() {
//     // console.log('You are adding something')
//     selectedOperator = $('#add-btn').text();
// }

// // subtracting function
// function subNums() {
//     // console.log('You are subtracting something');
//     selectedOperator = $('#minus-btn').text();
// }

// // multiplying function
// function multiplyNums() {
//     // console.log('You are multiplying something');
//     selectedOperator = $('#multiply-btn').text();
// }

// // dividing function
// function divideNums() {
//     // console.log('You are dividing something');
//     selectedOperator = $('#divide-btn').text();
// }

//function to send DELETE request to server to delete the calculation history.
function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/numbers'
    })
        .then( function( response ) {
            console.log('DELETE response from server', response);
            $('#history').empty();
            
        })
        .catch( function( error ) {
            console.log('Error from server', error);
            alert('Sorry, something went wrong retrieving data from server')
            
        })
        console.log('After making server DELETE request');
}


// function to get calculations back from server
function getCalc() {

    $.ajax({
        method: 'GET',
        url: '/numbers'
    })
        .then( function( response ) {
            console.log('Response from server', response);
            appendToDom( response );   
        })
        .catch( function( error ) {
            console.log('Error from server', error);
            alert('Sorry, something went wrong retrieving data from server')
            
        })
        console.log('After making server request');
        
}


// function to append the calculation history to the DOM
function appendToDom( calcHistory ) {
    
    $('#history').empty();

    //Loop through the calcHistory
    for( let item of calcHistory ) {
        $('#solution').empty().append(` ${item.calc} `).css('color', 'green');
        $('#history').append(`<ul class="calc-list"><li>
        ${item.num1} ${item.operator} ${item.num2} = ${item.calc}
        </li></ul>`).css('color', 'blue')
    }
} //end appendToDom