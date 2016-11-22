<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>wwwsh</title>
<link rel="stylesheet" href="cmd.css" type="text/css">
<?php
$js = array("sys", "con", "ajax", "bin");

foreach ($js as $j) {
  print "<script type='text/javascript' src='" . $j . ".js'></script>\n";
  /*
  echo "<script type='text/javascript'>\n";
  foreach (file($j.".js") as $l) {
    print $l;
  }
  echo "\n</script>\n";
  */
}
?>
</head>

<body onload="startSystem()">
<div id="screen">
Javascript required.
</div>
<div id="controlbar">
<a onclick="sys.restart()">Restart</a><a onclick="sys.exec('sh')">Launch Shell</a><a onclick="sys.con.clear()">Clear Screen</a><a id="clock" onclick="sys.exec('date')">Clock goes here</a>
</div>
<div id='footer'>Copyright &copy; 2009 Mike Mallett</div>
</body>
</html>
