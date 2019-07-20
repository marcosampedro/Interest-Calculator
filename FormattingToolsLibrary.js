 "use strict";

function leftPadString(string, padChar, length) {
	var resultString = string;
	if (padChar.length != 1) { 
		alert("call to LeftPadString() with bad value for padChar,"
			+ " can lead to infinite loop");
	}
	while (resultString.length < length) {
		resultString = padChar + resultString;
	}
	return resultString;
}

function formatNumberWithCommas(num) {
	var resultString = "";
	var numString  	 = num.toFixed(0);
	var commaArray 	 = [];
	var revArray	 = numString.split("").reverse();
	var i = 1;

	while (revArray.length > 0) {
		commaArray = commaArray.concat(revArray.shift())
		if (i%3 === 0 && revArray.length !== 0) { 
			commaArray = commaArray.concat([","]);
		}
		i=i+1;
	}
	resultString = commaArray.reverse().join('');
	return resultString;
}