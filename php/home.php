<?php
	$servername = "localhost";
	$username = "root";
	$dbname = "voter";

	// Create connection
	$conn = new mysqli($servername, $username, NULL, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	//echo "Connected successfully";

	$function_to_call = $_POST['func'];
	if(function_exists($function_to_call)){
		call_user_func($function_to_call);
	}
	else{
	//show error or notify that the requested function doesnot exist.
	}

	/**

	FUNCTIONS

	**/

	function test() {
		echo "Hello";
	}

	//retrieves the question text from the provided question_id
	function getQuestionText() {
		global $conn;
		$question_id = $_POST['question_id'];
		$result = mysqli_query($conn,"SELECT text FROM voter.question WHERE id=$question_id");
		while($row = mysqli_fetch_assoc($result)) {
			echo $row['text'];
		}
		$result->free();
	}

	//retrieves the question's answers from the provided question_id
	function getAnswers() {
		global $conn;
		$question_id = $_POST['question_id'];
		$result = mysqli_query($conn,"SELECT * FROM voter.question_answer JOIN voter.answer ON voter.question_answer.answer_id=voter.answer.id WHERE question_id = $question_id");
		$resultData = array();
		while($row = mysqli_fetch_assoc($result)) {
			$resultObj = array(
				'id' => $row['answer_id'],
				'text' => $row['text']
			);
			$resultData[] = $resultObj;
		}
		echo json_encode($resultData);
		$result->free();
	}

	function storeVote() {
		global $conn;
		$question_id = $_POST['question_id'];
		$answer_id = $_POST['answer_id'];
		mysqli_query($conn, "INSERT INTO `voter`.`vote` (`id`, `question_id`, `answer_id`) VALUES (NULL, $question_id, $answer_id)");
	}

	function getVotes() {
		global $conn;
		$question_id = $_POST['question_id'];
		$answer_id = $_POST['answer_id'];
		$result = mysqli_query($conn,"SELECT * FROM voter.vote WHERE question_id=$question_id AND answer_id=$answer_id");
		$resultData = array();
		while($row = mysqli_fetch_assoc($result)) {
			$resultObj = array(
				'id' => $row['id'],
				'question_id' => $row['question_id'],
				'answer_id' => $row['answer_id']
			);
			$resultData[] = $resultObj;
		}
		echo json_encode($resultData);
		$result->free();
	}

	mysqli_close($conn);
?>