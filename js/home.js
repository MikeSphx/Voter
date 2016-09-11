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
		alert('test home.js L15');
		$('.question_container').hide();
	});
}

function setAnswerButtonsHandler() {
	$('.answer_btn').each(function(index) {
		$(this).click(function() {
			$('.question_container').hide();
		});
	});
}
