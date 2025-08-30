<?php
include './../../db.php';
//$uri=='/api/stakes/new'
if($method=='POST') 
{
    $uid = $json["uid"];
    $staker = $json["staker"];
    $chain = $json["chain"];;
    $amount = $json["amount"];
    $reward = $json["reward"];

    $sql = "SELECT COUNT(*) as nos FROM stakes 
            WHERE 
            uid=".$uid." AND staker='".$staker."' AND chain='".$chain."';";
    $nos = getSingle($sql);

    if($nos<1)
    {
        $fields = " uid, chain, staker, amount, reward, created_on ";
        $values = " '$uid', '$chain', '$staker', '$amount', '$reward', NOW()";
        $sql = "INSERT INTO stakes(".$fields.") VALUES (".$values.");";
		update($sql);     
    }
    else
    {   
        $sql = "UPDATE stakes SET amount='".$amount."', reward='".$reward."' WHERE uid='".$uid."' AND staker='".$staker."';";
        update($sql);
    }

    $result["status"] = "success";
    echo json_encode($result);
    exit();
}