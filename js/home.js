// A $( document ).ready() block.
$(document).ready(function() {
    // load the question from the db
    // load the answers from the db
    // give buttons handlers
    setHandlers();
});

function setHandlers() {
	setSeeResultsHandler();
	setAnswerButtonsHandler();
}

function setSeeResultsHandler() {
	$('#see_results').click(function() {
		$('.question_container').hide();
		// generate and show results page
		$('#results_wrapper').hide();
		$('#see_results_wrapper').show();
		$('.results_container').show();
	});
}

function setAnswerButtonsHandler() {
	$('.answer_btn').each(function(index) {
		$(this).click(function() {
			$('.question_container').hide();
			$('.results_container').show();
		});
	});
}

/**

How to store the data

Question : ID | Question_Text | Answers
           number | string | array of strings
Answer   : ID | Data
           number | string

How to show the results using Chart.js

Pass in the Question's Answers array
Count all answers with each Data, form an array

**/