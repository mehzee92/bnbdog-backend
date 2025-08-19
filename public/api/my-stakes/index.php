<?php
include './../db.php';
// &&  $uri=='/api/my-stakes'
if($method=='GET') 
{
    $address = r('address');
    $chain = r('chain');
    $sql =  "SELECT distinct stakes.uid as uid, amount, pools.name as name, 
                  pools.staking_token_name as sname, pools.staking_token_address as saddress, 
                  pools.reward_token_name as rname, pools.reward_token_address as raddress, 
                  pools.period as period, pools.reward_percentage as reward_percentage, reward
                  FROM stakes
                  INNER JOIN pools ON stakes.uid=pools.uid 
                  WHERE staker='$address' AND stakes.chain='$chain';";
	$result = querya($sql);
	echo json_encode($result);
	exit();
}