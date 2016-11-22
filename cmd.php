<?php
header("Content-Type", "text/plain");
switch($_REQUEST['cmd']) {
 case 'md5':
   print md5(rawurldecode($_REQUEST['args']));
   break;
 case 'test':
   print "OK";
   break;
 case 'date':
   print date('r');
   break;
 case 'myinfo':
   print "Your IP address: " . $_SERVER['REMOTE_ADDR'];
   if (gethostbyaddr($_SERVER['REMOTE_ADDR'])!=$_SERVER['REMOTE_ADDR']) {
     print "<br>";
     print "Your hostname: ".gethostbyaddr($_SERVER['REMOTE_ADDR']);
   }
   print "<br>";
   print "Your browser: ".$_SERVER['HTTP_USER_AGENT'];
   break;
 case 'info':
   print "Server IP address: " . $_SERVER['SERVER_ADDR'];
   print "<br>";
   print "Server hostname: " . $_SERVER['SERVER_NAME'];
   break;
}
?>