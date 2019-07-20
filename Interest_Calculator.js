"use strict";

var startingAge 	      = 0;
var retirementAge 	      = 0;
var startingSalary        = 0;
var annualSavings         = 0;
var annualRaise           = 0;
var annualInterestRate    = 0;

var detailTable;
var summaryTable;

// performs in the onload in the body
function initialize() {
	// clearing the textboxes
	document.getElementById('startingAgeId').value = "";
	document.getElementById('retirementAgeId').value = "";
	document.getElementById('startingSalaryId').value = "";
	document.getElementById('annualSavingsId').value = "";
	document.getElementById('annualRaiseId').value = "";
	document.getElementById('annualInterestRateId').value = "";

	detailTable = document.getElementById('detailTableId');
	summaryTable = document.getElementById('summaryTableId');

	// hides the detailTable and summaryTable
	detailTable.style.display = "none";
	summaryTable.style.display = "none";
}

function clearTextBoxes(form) {	
	// clearing the textboxes
 	var formElements = form.elements;
 	for (var i=0; i<formElements.length; i++) 
 		formElements[i].value="";

 	// hides the detailTable and summaryTable
 	detailTable.style.display = "none";
 	summaryTable.style.display = "none";
}

function defaultTextBoxes(form) {
	// resets the textboxes to its default settings
	form.reset();
}

// code used to simplify and shorten the Number() function
function getNumValue(id) {
	return Number(document.getElementById(id).value);
}

function calculateInterest(form) {
	// if statement checks if all textboxes have a value in them
	if (!form.checkValidity()) {
		alert("Input errors. All textboxes must be filled, no negative values are allowed, and the ages should be within the range (1-99).");
	}
	else {
		// intiailizes the variables with their respective textbox values
		startingAge 			= getNumValue('startingAgeId');
		retirementAge 			= getNumValue('retirementAgeId');
		startingSalary 			= getNumValue('startingSalaryId');
		annualSavings 			= getNumValue('annualSavingsId');
		annualRaise 			= getNumValue('annualRaiseId');
		annualInterestRate 		= getNumValue('annualInterestRateId');

		// an age validation. if this is called then it stops executing the rest of the code after the if statement
		if (startingAge > retirementAge){
			alert("Error: The Starting Age should be less than the Retirement Age");
			detailTable.style.display = "none";
			summaryTable.style.display = "none";
			return;
		}

		var currentSalary 			= 0;
		var currentSavings 			= 0;
		var currentInterest 		= 0;
		var currentRetirement 		= 0;

		var detailTableRowNumber	= 1;

		var totalYearsToInvest 		= 0;
		var totalSalary 			= 0;
		var totalSaved 				= 0;
		var totalEarnedInterest 	= 0;
		var totalRetirementFund 	= 0;

		// this is done to clear the table using the defined function
		clearResultsTable(detailTable);

		for (var i = startingAge; i <= retirementAge; i++) {
			// ***CALCULATION FOR THE DETAIL TABLE (EACH YEAR)***
			// formula for the currentSalary
			if (currentSalary == 0) {
				currentSalary = startingSalary;
			}
			else {
				currentSalary = currentSalary + (currentSalary*(annualRaise/100));
			}

			// formua for currentSavings
			currentSavings = currentSalary * (annualSavings/100)

			// formula for currentInterest
			if (currentRetirement == 0) {
				currentInterest = currentSavings * (annualInterestRate/100)
			}
			else {
				currentInterest = (currentSavings + currentRetirement) * (annualInterestRate/100)
			}

			// formula for currentRetirement
			currentRetirement = currentRetirement + currentSavings + currentInterest


			// -----------------------------------------------------------

			// formula for totalYearsToInvest
			totalYearsToInvest = retirementAge - startingAge;

			// formula for totalSalary
			totalSalary = totalSalary + currentSalary;

			// formula for totalSaved
			totalSaved = totalSaved + currentSavings;

			// formula for totalEarnedInterest
			totalEarnedInterest = totalEarnedInterest + currentInterest;

			// formula for totalRetirementFund
			totalRetirementFund = totalSaved + totalEarnedInterest;

			// cells are being declared for the detailTable
			var detailrow = detailTable.insertRow(detailTableRowNumber);
			var cell0 = detailrow.insertCell(0);
			var cell1 = detailrow.insertCell(1);
			var cell2 = detailrow.insertCell(2);
			var cell3 = detailrow.insertCell(3);
			var cell4 = detailrow.insertCell(4);

			// formatNumberWithCommas is utilized to add commas where appropriate, called from the FormattingToolsLibrary.js
			cell0.innerHTML = i;
			cell1.innerHTML = formatNumberWithCommas(currentSalary);
			cell2.innerHTML = formatNumberWithCommas(currentSavings);
			cell3.innerHTML = formatNumberWithCommas(currentInterest);
			cell4.innerHTML = formatNumberWithCommas(currentRetirement);

			detailTableRowNumber++;
		} // for loop

		var summaryTableRowNumber = 0;

		var summaryrow = summaryTable.insertRow(summaryTableRowNumber);
		var cell5 = summaryrow.insertCell(0);
		cell5.innerHTML = 
			totalYearsToInvest + " : Years to Invest"
			+ "\n" + formatNumberWithCommas(totalRetirementFund) + " : Retirement Fund"
			+ "\n" + formatNumberWithCommas(totalSalary) + " : Lifetime Salary"
			+ "\n" + formatNumberWithCommas(totalSaved) + " : Total Saved&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "\n" + formatNumberWithCommas(totalEarnedInterest) + " : Earned Interest";

		summaryTableRowNumber++;

		// shows the detailTable and summaryTable
		detailTable.style.display = "table";
		summaryTable.style.display = "table";

	}// else

	// clears the values in the summary table
	clearResultsTable(summaryTable);

}

function clearResultsTable(table) {
	for (var i = table.rows.length; i > 1; i--) {
		table.deleteRow(i-1);
	}
}