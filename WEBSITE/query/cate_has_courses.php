<?php
$i = $_POST['id'];
$i = $i+1;

header("Access-Control-Allow-Origin: *");
//get all the course from db and reply using json structure
//connection to db
$mysqli = new mysqli("localhost", "root", "", "my_hyp");

if (mysqli_connect_errno()) { //verify connection
    exit(); //do nothing else 
}
else {
    # extract results mysqli_result::fetch_array
    $query = " SELECT * FROM course WHERE course_category='$i'";
    //query execution
    $result = $mysqli->query($query);
    //if there are data available
    if($result->num_rows >0)
    {
        $myArray = array();//create an array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
        	$myArray[] = array_map('utf8_encode', $row);
        }
        echo json_encode($myArray);
        echo ($row);
    }
    //free result
    $result->close();
    //close connection
    $mysqli->close();
}
?>