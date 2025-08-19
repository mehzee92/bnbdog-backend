<?php
include './../db.php';

// $uri=='/api/feedbacks'
if($method=='GET') 
{
    $conditions = "";
    $query = r('q');
    $page = r('page');
    if(strlen($page)<1)
    {
      $page = 0;
    }

    $perPage = 10;
    $startAt = $page*$perPage;

    if(strlen($query)<1)
    {
      $conditions = " AND (name like '%".$query."%' OR feedback like '%".$query."%') ";
    }

    $sql = "SELECT * FROM feedbacks WHERE 1=1 ".$conditions." ORDER BY id DESC limit ".$startAt.", ".$perPage;
    $result = querya($sql);
    echo json_encode($result);
}