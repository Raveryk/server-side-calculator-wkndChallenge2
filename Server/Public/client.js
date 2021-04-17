$(document).ready(onReady);

function onReady() {
    console.log('I am jQuery, hear me roar!!');
    $('#submit-btn').on('click', Calculation)
    $('#add-btn').on('click', addNums)
    $('#minus-btn').on('click', subNums)
    $('#multiply-btn').on('click', multiplyNums)
    $('#divide-btn').on('click', divideNums);
    $('#clear-btn').on('click', clearInputs)
}


function Calculation() {
    // send Numbers to the server for calc
    console.log('You just calculated something!')

    let newNums = {
        num1: $('#num-one').val(),
        num2: $('#num-two').val()
    }

    //ajax POST method to send data to the server for calculation
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: newNums
    }) .then( function( response )  {
        console.log('Adding Nums');

        getNums();
    }) .catch( function( error ) {
        console.log('Error from the server', error);
        alert('Sorry, we could not process your numbers');
        
    })
}

function clearInputs() {
    $('#num-one').val('')
    $('#num-two').val('')
}

function addNums() {
    console.log('You added something')
}

function subNums() {
    console.log('You subtracted something')
}

function multiplyNums() {
    console.log('You multiplied something')
}

function divideNums() {
    console.log('You divided something')
}