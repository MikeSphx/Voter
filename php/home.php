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
	function getAnswersText() {
		global $conn;
		$question_id = $_POST['question_id'];
		$result = mysqli_query($conn,"SELECT text FROM voter.question_answer JOIN voter.answer ON voter.question_answer.answer_id=voter.answer.id WHERE question_id = $question_id");
		$resultData = array();
		while($row = mysqli_fetch_assoc($result)) {
			$resultData[] = $row['text'];
		}
		echo json_encode($resultData);
	}

	mysqli_close($conn);
?>