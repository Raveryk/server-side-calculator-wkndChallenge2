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

let opType = [];


function Calculation() {
    // send Numbers to the server for calc
    // console.log('You just calculated something!')

    let newNums = {
        num1: $('#num-one').val(),
        num2: $('#num-two').val(),
        operator: opType[opType.length-1],
        calc: ''
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
        console.log('Adding Nums');
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
    $('#num-one').val('')
    $('#num-two').val('')
}

function addNums() {
    console.log('You are adding something')
    let plus = $('#add-btn').text();
    opType.push(plus);
}

function subNums() {
    console.log('You are subtracting something');
    let minus = $('#minus-btn').text();
    opType.push(minus);
}

function multiplyNums() {
    console.log('You are multiplying something');
    let mult = $('#multiply-btn').text();
    opType.push(mult);
}

function divideNums() {
    console.log('You are dividing something');
    let div = $('#divide-btn').text();
    opType.push(div);
}

//function to send DELETE request to server to delete the calculation history.
function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/calc'
    })
        .then( function( response ) {
            console.log('DELETE response from server', response);
            $('#history').empty();
        })
        .catch( function( error ) {
            console.log('Error from server', error);
            alert('Sorry, something went wrong retreiving data from server')
            
        })
        console.log('After making server DELETE request');
}

function getCalc() {

    $.ajax({
        method: 'GET',
        url: '/calc'
    })
        .then( function( response ) {
            console.log('Response from server', response);
            appendToDom( response );   
        })
        .catch( function( error ) {
            console.log('Error from server', error);
            alert('Sorry, something went wrong retreiving data from server')
            
        })
        console.log('After making server request');
        
}

// function deleteOnDom( calcHistory ) {
//     $
// }


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