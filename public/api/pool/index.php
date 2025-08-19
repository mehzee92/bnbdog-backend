<?php
include './../db.php';
// $uri=='/api/pool'
if($method=='GET') 
{
    $uid = r("uid");
    $sql = "SELECT * FROM pools WHERE uid=".$uid.";";
    $result = querya($sql);
    echo json_encode($result[0]);
    exit();
}