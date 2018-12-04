<?php

$connect = new mysqli("localhost", "root", "Riza@P192", "vuejs_crud");
if($connect->connect_error){

} else {

}

$res = array('error' => false);

$action = 'read';

if(isset($_GET['action'])){
    $action = $_GET['action'];
}


if($action == 'read'){
    $result = $connect->query("SELECT * FROM `users`");
    $users = array();

    while($row = $result->fetch_assoc()){
        array_push($users, $row);
    }

    $res['users'] = $users;
}

if($action == 'create'){
    $id = $_POST['formID'];
    $username = $_POST['formName'];
    $email = $_POST['formEmail'];
    $phone = $_POST['formPhone'];
    $jobs = $_POST['formJobs'];

    $result = $connect->query("INSERT INTO `users` VALUES('$id', '$username', '$email', '$phone', '$jobs')");
    
    if($result){
        $res['message'] = "User added sucessfully!";
    } else {
        $res['error'] = true;
        $res['message'] = "Could not add user!" . $connect->connect_error ;
     }
}

if($action == 'update'){
	$id = $_POST['id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $jobs = $_POST['jobs'];

    $result = $connect->query("UPDATE users SET username = '$username', email = '$email', phone = '$phone', jobs = '$jobs' WHERE id = '$id' ");
    
    if($result){
        $res['message'] = "Update data sucessfully!";
    } else {
        $res['error'] = true;
        $res['message'] = "Could not update!";
    }
}

if($action == 'delete'){
	$id = $_POST['id'];

    $result = $connect->query("DELETE FROM `users` WHERE `id` = '$id' ");
    
    if($result){
        $res['message'] = "Data deleted sucessfully!";
    } else {
        $res['error'] = true;
        $res['message'] = "Could not delete data!";
    }
}

$connect->close();
header("Content-type: application/json");
echo json_encode($res);
die();
?>
