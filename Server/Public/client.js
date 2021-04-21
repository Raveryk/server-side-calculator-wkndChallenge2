$(document).ready(onReady);

function onReady() {
    console.log('I am jQuery, hear me roar!!');
    $('#submit-btn').on('click', Calculation)
    $('#add-btn').on('click', addNums)
    $('#minus-btn').on('click', subNums)
    $('#multiply-btn').on('click', multiplyNums)
    $('#divide-btn').on('click', divideNums);
    $('#clear-btn').on('click', clearInputs);
    $('#clear-history').on('click', clearHistory)

    getCalc();
}



function Calculation() {
    // send inputs to the server for calc
    // console.log('You just calculated something!')

    let newNums = {
        num1: $('#num-one').val(),
        num2: $('#num-two').val(),
        operator: selectedOperator
    }

    console.log(`You input: ${newNums.num1} ${newNums.operator} ${newNums.num2} `);

   //Conditional to only allow the POST call to happen if inputs have been filled.
    if( newNums.num1 === '' || newNums.num2 === '' ) {
    alert('Please fill out all necessary inputs.'); 
    } else if ( newNums.operator === undefined ) {
    alert('Please select on operator.') 
    } else {


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
    
}

}


function clearInputs() {
    $('#num-one').val('');
    $('#num-two').val('');
    $('#solution').empty()
}

// creating global variable to hold whatever operator is selected
let selectedOperator;
// adding function
function addNums() {
    // console.log('You are adding something')
    selectedOperator = $('#add-btn').text();
}

// subtracting function
function subNums() {
    // console.log('You are subtracting something');
    selectedOperator = $('#minus-btn').text();
}

// multiplying function
function multiplyNums() {
    // console.log('You are multiplying something');
    selectedOperator = $('#multiply-btn').text();
}

// dividing function
function divideNums() {
    // console.log('You are dividing something');
    selectedOperator = $('#divide-btn').text();
}

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