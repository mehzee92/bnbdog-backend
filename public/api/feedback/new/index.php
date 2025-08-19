<?php
include './../../db.php';
// '/api/feedback/new'
if($method=='POST') 
{
    $name = $json["name"];
    $email = $json["email"];
    $feedback = $json["feedback"];
    $address = $json["address"];

    $fields = " name, email, feedback, address, dtg";
    $values = "  '".$name."', '".$email."', '".$feedback."', '".$address."', NOW() ";

    $sql = "INSERT INTO feedbacks(".$fields.") VALUES (".$values.");";
    
    $sit = update($sql);

    if($sit)
    {
        $result["status"] = "success";  
    }
    echo json_encode($result);
    exit();
}