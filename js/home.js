// A $( document ).ready() block.
$(document).ready(function() {
    // load the question from the db
    loadQuestionText();
    // load the answers from the db
    loadAnswers();
    // give buttons handlers
    setHandlers();
});

function loadQuestionText() {
	$.ajax({
  		method: "POST",
  		url: "php/home.php",
  		data: { func: "getQuestionText", question_id: home_config.question_id }
	}).done(function(msg) {
		$('#featured_question b').text(msg);
  	});
}

function loadAnswers() {
	$.ajax({
  		method: "POST",
  		url: "php/home.php",
  		data: { func: "getAnswers", question_id: home_config.question_id }
	}).done(function(data) {
		var answers = JSON.parse(data);
		$('a.answer_btn').each(function(index) {
			$(this).attr('answer_id', answers[index].id);
			$(this).text(answers[index].text);
		});
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
			inputVote($(this).attr('answer_id'));
			generateResults(this);
		});
	});
}

function inputVote(answerId) {
	$.ajax({
  		method: "POST",
  		url: "php/home.php",
  		data: { func: "storeVote", question_id: home_config.question_id, answer_id: answerId }
	}).done(function() {
		console.log('vote input successful');
  	});
}

function generateResults(answerBtn) {
	var vote = $(answerBtn).text();
	var title = document.createElement('h2');
	title.innerHTML = "You voted for: " + vote;
	$('.results_info').append(title);
	var stats = document.createElement('h4');
	stats.innerHTML = loadStats();
	$('.results_info').append(stats);
}

function loadStats() {
	var statsText = "Here's what everyone else thought: ";
	$.ajax({
		async: false,
  		method: "POST",
  		url: "php/home.php",
  		data: { func: "getAnswers", question_id: home_config.question_id }
	}).done(function(data) {
		var answers = JSON.parse(data);
		$.each(answers, function(index, answer) {
			statsText = statsText + answer.text + "|" + loadNumVotesOfAnswer(answer.id).toString() + " ";
		});
  	});
  	statsText = statsText;
	return statsText;
}

function loadNumVotesOfAnswer(answerId) {
	var numOfVotes = 0;
	$.ajax({
		async: false,
		method: "POST",
  		url: "php/home.php",
  		data: { func: "getVotes", question_id: home_config.question_id, answer_id: answerId }
	}).done(function(data) {
		var votes = JSON.parse(data);
		numOfVotes = votes.length;
  	});
	return numOfVotes.toString();
}
