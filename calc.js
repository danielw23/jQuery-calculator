/*
 * Implement all your JavaScript in this file!
 */
// resetState is true when the page has just been loaded, or an operation was just completed
var resetState = true
// valInputState is true when someone starts to enter digits
var valInputState = false
// outputState is true when equal button is pressed
var outputState = false
var ignoreEqualAsNextOperator = false

// For arithmetic operation
// type of firstVal, secVal and arithOp here are String
var firstVal = ''
var secVal = ''
var arithOp = ''

// Stored second value and stored arithmetic opertor for equal button
var stdSecVal = ''
var stdArithOp = ''

$('#button1, #button2, #button3, #button4, #button5, #button6, #button7, #button8, #button9, #button0').click(function(){
	// Testing
	$('#output').html('button' + $(this).val() + ' was clicked');

	if (!valInputState) {
		$('#display').val($(this).val());
		valInputState = true
		outputState = false
		ignoreEqualAsNextOperator = false
	} else {
		$('#display').val($('#display').val() + $(this).val());
	}
})

$('#clearButton').click(function() {
	// Testing
	$('#output').html('clearButton was clicked');

	resetState = true
	valInputState = false
	outputState = false
	ignoreEqualAsNextOperator = false

	firstVal = ''
	secVal = ''
	arithOp = ''

	stdSecVal = ''
	stdArithOp = ''

	$('#display').val('');
 })

$('#equalsButton').click(equal)

function equal() {
	// Testing
	$('#output').html('equalsButton was clicked');

	// if the app is in the reset state and the user enters some numbers, and then an operator, 
	// and then clicks the equals button without entering another operand, 
	// the display should be the same and the equals button should be ignored
	if (!ignoreEqualAsNextOperator) {
		if (outputState) {
			firstVal = arithmetic(firstVal, stdSecVal, stdArithOp)
			$('#display').val(firstVal);
		} else if (resetState) {
			$('#display').val($('#display').val());
		}
		else {
			if (secVal === '' && arithOp === '') {
				$('#display').val(firstVal);
			} else {
				secVal = $('#display').val()

				firstVal = arithmetic(firstVal, secVal, arithOp)
				$('#display').val(firstVal);

				stdSecVal = secVal
				stdArithOp = arithOp
				secVal = ''
				arithOp = ''
				outputState = true
			}
		}
		resetState = true
		valInputState = false
	}

 }

$('#addButton, #subtractButton, #multiplyButton, #divideButton').click(function(){
	// Testing
	$('#output').html($(this).get(0).id + ' was clicked');

	if (arithOp === '') {
		firstVal = $('#display').val()
	} else {
		equal()
	}

	if (resetState) {
		ignoreEqualAsNextOperator = true
	}

	arithOp = $(this).get(0).id
	resetState = false
	valInputState = false
	outputState = false
})

// type of firstValue, SecondValue and arithOp here are String
function arithmetic (firstValue, SecondValue, Operator) {

	if (Operator === 'addButton') {
		return Number(firstValue) + Number(SecondValue)
	} else if (Operator === 'subtractButton') {
		return Number(firstValue) - Number(SecondValue)
	} else if (Operator === 'multiplyButton') {
		return Number(firstValue) * Number(SecondValue)
	} else if (Operator === 'divideButton') {
		if (SecondValue === 0) {
			return 'Infinity'
		}

		return Number(firstValue) / Number(SecondValue)
	} else {
		return 'Error'
	}
}