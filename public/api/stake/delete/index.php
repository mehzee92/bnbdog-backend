<?php
include './../../db.php';
// $uri=='/api/stake/delete'
if($method=='POST') 
{
  $uid = $json["uid"];
  $chain = $json["chain"];
  $address = $json["address"];
  $sql = "DELETE FROM stakes WHERE staker='".$address."' AND chain='".$chain."' AND uid='".$uid."';";
  $sit = update($sql);
  $result["status"] = "error";

  if($sit)
  {
	$result["status"] = "success";	
  }
  echo json_encode($result);
  exit();
}
