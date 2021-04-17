$(document).ready(onReady);

function onReady() {
    console.log('I am jQuery, hear me roar!!');
    $('#submit-btn').on('click', Calculation)
    $('#add-btn').on('click', addNums)
    $('#minus-btn').on('click', subNums)
    $('#multiply-btn').on('click', multiplyNums)
    $('#divide-btn').on('click', divideNums);
}


function Calculation() {
    console.log('You just calculated something!')
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