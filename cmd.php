<?php
header("Content-Type", "text/plain");
// We expect to receive in the request string:
//   cmd = The server command to be executed
//   args = All following command line arguments to cmd
switch($_REQUEST['cmd']) {
  case 'help':
    $helptxt = array(
      'date' => "usage: server date<br><br>&nbsp;Prints the server date and time",
      'md5' => "usage: server md5 [str]<br><br>&nbsp;Prints the MD5 of the specified string<br>&nbsp;Prompts for string using a password field if not specified",
      'sha256' => "usage: server sha256 [str]<br><br>&nbsp;Prints the SHA256 of the specified string<br>&nbsp;Prompts for string using a password field if not specified",
      'sha512' => "usage: server sha512 [str]<br><br>&nbsp;Prints the SHA512 of the specified string<br>&nbsp;Prompts for string using a password field if not specified",
      'myinfo' => "usage: server myinfo<br><br>&nbsp;Prints information about your connection",
      'test' => "usage: server test<br><br>&nbsp;Tests server communication",
    );
    if (isset($_REQUEST['args']) && $_REQUEST['args'] != 'null') {
      $args = split(' ', $_REQUEST['args']);
      if (strlen($args[0]) > 0) {
        print $helptxt[$args[0]];
      }
    } else {
      print 'This server supports the following commands:<br><br>';
      foreach (array_keys($helptxt) as $hcmd) {
        print '&nbsp;&nbsp;' . $hcmd . '<br>';
      }
    }
    break;
  case 'md5':
   //print md5(rawurldecode($_REQUEST['args']));
   print hash('md5', rawurldecode($_REQUEST['args']));
   break;
 case 'sha256':
   print hash('sha256', rawurldecode($_REQUEST['args']));
   break;
 case 'sha512':
   print hash('sha512', rawurldecode($_REQUEST['args']));
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