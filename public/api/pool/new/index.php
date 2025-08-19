<?php
include './../../db.php';
// $uri=='/api/pool/new'
if($method=='POST') 
{
    $name = $json["name"];
    $chain = $json["chain"];
    $sAddress = $json["sAddress"];;
    $sName = $json["sName"];
    $sLogo = $json["sLogo"];
    $rAddress = $json["rAddress"];
    $rName = $json["rName"];
    $rLogo = $json["rLogo"];
    $detail = $json["detail"];
    $createdBy = $json["createdBy"];
    $period = $json["period"];
    $maxAmount = $json["maxAmount"];

    $rewardPercentage = $json["rewardPercentage"];
    $uid = $json["uid"];

    $fields = " uid, name, chain, staking_token_name, staking_token_address, staking_token_logo,
               reward_token_name, reward_token_address, reward_token_logo, detail, created_by, 
               create_on, period, reward_percentage, maxAmount";

    $values = " '".$uid."', '".$name."',  '".$chain."', '".$sName."', '".$sAddress."',  '".$sLogo."', ".
              " '".$rName."', '".$rAddress."', '".$rLogo."', '".$detail."', '".$createdBy."',".
              " NOW(), '".$period."', '".$rewardPercentage."', '".$maxAmount."'";

    $sql = "INSERT INTO pools(".$fields.") VALUES (".$values.");";
    
    $sit = update($sql);

	if($sit)
	{
		$result["status"] = "success";	
	}
	echo json_encode($result);
	exit();
}