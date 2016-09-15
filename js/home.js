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
			generateChart();
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
	$('.results_info_title').text("You voted for: " + vote);
	$('.results_info_subtitle').text(loadStats());
}

function generateChart() {
	var chart = document.getElementById('results_chart_pie');

	var chartLabels = loadChartInfo('label');
	var chartData = loadChartInfo('data');

	var myChart = new Chart(chart, {
	    type: 'pie',
	    data: {
	        labels: chartLabels, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	        datasets: [{
	            label: '# of Votes',
	            data: chartData, //[12, 19, 3, 5, 2, 3],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)'
	                /*'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'*/
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)'
	                /*'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'*/
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
}

function loadChartInfo(state) {
	var result = [];
	$.ajax({
		async: false,
  		method: "POST",
  		url: "php/home.php",
  		data: { func: "getAnswers", question_id: home_config.question_id }
	}).done(function(data) {
		var answers = JSON.parse(data);
		$.each(answers, function(index, answer) {
			if (state === 'data') {
				result.push(parseInt(loadNumVotesOfAnswer(answer.id)));
			} else if (state === 'label') {
				result.push(answer.text);
				//console.log(answer.text);
			}
		});
	});
	result = result;
	return result; 
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
