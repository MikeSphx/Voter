// A $( document ).ready() block.
$(document).ready(function() {
    // load the question from the db
    loadQuestionText();
    // load the answers from the db
    // give buttons handlers
    setHandlers();
});

function loadQuestionText() {
	$.ajax({
		async: false,
  		method: "POST",
  		url: "php/home.php",
  		data: { func: "getQuestionText", question_id: home_config.question_id }
	}).done(function(msg) {
		$('#featured_question b').text(msg);
  	});
}

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