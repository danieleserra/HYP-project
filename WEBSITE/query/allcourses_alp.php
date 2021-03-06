<?php
//get all the course from db and reply using json structure
//connection to db
header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli("localhost", "root", "", "my_hyp");

if (mysqli_connect_errno()) { //verify connection
    exit(); //do nothing else 
}
else {
    # extract results mysqli_result::fetch_array
    $query = " SELECT * FROM course ORDER BY title";
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
    }
    //free result
    $result->close();
    //close connection
    $mysqli->close();
}
?>