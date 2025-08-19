<?php

include './../db.php';

// $uri=='/api/pools'

if($method=='GET') 
{
    $conditions = "";
    $query = r('q');
    $page = r('page');
    $chain = r('chain');
    if(strlen($page)<1)
    {
      $page = 0;
    }

    $perPage = 10;
    $startAt = $page*$perPage;

    if(strlen($query)>0)
    {
      $conditions = " AND name like '%".$query."%' ";
    }

    $conditions .= " AND chain ='".$chain."' ";

    $sql = "SELECT * FROM pools WHERE 1=1 ".$conditions." ORDER BY uid DESC limit ".$startAt.", ".$perPage;
    $result = querya($sql);
  echo json_encode($result);
}