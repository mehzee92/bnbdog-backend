<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$method = $_SERVER['REQUEST_METHOD'];

$jsonData = file_get_contents('php://input');
$json = json_decode($jsonData, true);

$con1 = null;
$_db = 'defined';

function getConnection()
{
	if($GLOBALS['con1']==null)
	{
      		$GLOBALS['con1'] = mysqli_connect("localhost:3306", "root", "", "basehaven");
	}
}


$base_url = "https://staking.basehaven.com"; 

$_SESSION['base_url'] = $base_url;
date_default_timezone_set("Asia/Karachi");

function update($sql)
{
	getConnection();
	$result = mysqli_query($GLOBALS['con1'], $sql) or die(mysqli_error($GLOBALS['con1']));
	return $result;
}


function uniqueid()
{
	$t = microtime();
	$ts = explode(" ", $t);
	return $ts[1].(1000000*$ts[0]);
}



function query($sql)
{
	getConnection();
	$list = array();
	$result = mysqli_query($GLOBALS['con1'], $sql) or die(mysqli_error($GLOBALS['con1']));
	while($row=mysqli_fetch_array($result)) 
	{
		$list[count($list)] = $row;
	}
	return $list;	
}


function getSingle($sql)
{
	getConnection();
	$result = mysqli_query($GLOBALS['con1'], $sql) or die($sql);
	$row = mysqli_fetch_array($result);
	if(isset($row))
	{
		return $row[0];
	}
	else
	{
		return "";
	}
		
}


function querya($sql)
{
	getConnection();
	$list = array();
	$result = mysqli_query($GLOBALS['con1'], $sql) or die($sql);
	while($row = mysqli_fetch_assoc($result)) 
	{
		$list[count($list)] = $row;
	}
	return $list;	
}




function req($arr)
{
	foreach ($arr as $el)
	{
		if(strlen($el)<1) 
		{  
			break; 
			return false; 
		}
	}
	return true;
}


function insert($table, $fds, $vals)
{
	$sql = "INSERT INTO $table($fds) VALUES($vals);";
	$resp = update($sql);
	return $resp;
}


function showDateAndTime($str)
{
	$parts = explode(" ", $str);
	if(count($parts)<1) { return ""; }
	$str = tonaturlaformat($parts[0]);
	$str .= " at ";
	$str .= $parts['1'];
	return $str;
}

function insertForm($d, $table)
{
   $fields = "";
   $values = "";
   foreach ($d as $fd => $val)
   {
   	  $fields .= ", ".$fd."";
   	  if(stripos($fd, "date")>-1)
   	  {
   	  	$val = tosqlformat($val);
   	  }
   	  $values .= ", '".$val."'";
   }
   $fields = substr($fields, 1);
   $values = substr($values, 1);
   $sql = "INSERT INTO $table($fields) VALUES($values);";
   $res = update($sql);
   if($res = 1)
   {
   	 return "done";
   }
   else
   {
   	 return $sql;
   }
}




function updateRow($table, $p)
{
	$str = "";
	$id=$p['id'];
	foreach ($p as $key => $value)
	{
		if(stripos($key, "date"))
		{
			$value = tosqlformat($value);
		}

		$str .= $key."='".$value."',";
	}
	$str = substr($str, 0, strlen($str)-1);
	$sql = "UPDATE $table \n SET $str \n WHERE id=$id;";
	$res = update($sql);
	if($res==1)
	{
		echo "done";
	}
}

function sqlescape($str)
{
  $str = str_replace("{and}", "&", $str);
  $str = str_replace("'", "&#39;", $str);
  $str = str_replace("\n", "<br>", $str);
  $str = str_replace("\"", "&#147;", $str);
  $str = str_replace("”", "&#148;", $str);
  $str = str_replace("„", "&#132;", $str);
  return $str;
}

function sqlunescape($str)
{
  $str = str_replace("&#39;", "'", $str);
  $str = str_replace("&#147;", "\"", $str);
  $str = str_replace("&#148;", "”", $str);
  $str = str_replace("&#132;", "„", $str);
  return $str;
}


function jsonescape($str)
{
  $str = str_replace(":", "-", $str);
  $str = str_replace("\n", " ", $str);
  $str = str_replace("\r", " ", $str);
  $str = str_replace("\"", "'", $str);
  $str = str_replace("\t", " ", $str);
  return $str;
}


function getShort($str)
{
	return substr($str, 0, 20)." ... ";
}


function r($f)
{
	$str = "";
	if(isset($_REQUEST[$f]))
	{
	  return sqlescape($_REQUEST[$f]);
	}
	else
	{
	   return $str;
	}
}


function tonaturlaformat($d)
{
  if($d=="0000-00-00" OR strlen($d)<2)
  {
  	return "";
  }
  try
  {
	  $date = new DateTime($d);
	  $dt = $date->format('d M Y');
  }
  catch(Exception $e)
  {

  	return "";
  }

  return $dt;
}



function isdate($dt)
{
    $dt = tonaturlaformat($dt);
    if(strlen($dt)>8)
    {
    	return true;
    }
    else
    {
    	return false;
    }
}



function getYear($date) 
{
	$date1 = new DateTime($date);
    return date_format($date1,"Y");
}


function getMonthYear($date) 
{
	$date1 = new DateTime($date);
    return date_format($date1,"M y");
}


function tonaturalformat($d)
{
  return tonaturlaformat($d);
}



function current_date()
{
	$date1 = new DateTime();
	$dt = date_format($date1,"Y-m-d");
	return $dt;
}

function current_time()
{
	$date1 = new DateTime();
	$time = date_format($date1,"H:i:s");
	return $time;
}

function current_timestamp()
{
   $date = date_create();
   return date_timestamp_get($date);
}

function current_dtg()
{
	return current_date()." ".current_time();
}


function today()
{
	return tonaturalformat(current_date());
}
