var bin = new Array();

var helptxt = new Array();
helptxt['about'] = "esage: licence<br><br>&nbsp;Prints information about this system";
helptxt['date'] = "usage: date<br><br>&nbsp;Prints the date and time";
helptxt['eval'] = "usage: eval [expr]<br><br>&nbsp;Prints the result of javascript eval(expr)<br>&nbsp;Prompts for expr if not specified";
//helptxt['fullscreen'] = "usage: fullscreen<br><br>&nbsp;Elarges the browser window to the entire screen";
helptxt['info'] = "usage: info<br><br>&nbsp;Prints information about your browser";
helptxt['open'] = "usage: open [URL]<br><br>&nbsp;Opens the specified URL";
helptxt['random'] = "usage: random [n]<br><br>&nbsp;Prints a random number between 0 and n (default 1)";
helptxt['randint'] = "usage: randint [n]<br><br>&nbsp;Prints a random integer between 0 and n (default 1)";

helptxt['server'] = new Array();
helptxt['server']['date'] = "usage: server date<br><br>&nbsp;Prints the server date and time";
helptxt['server']['md5'] = "usage: server md5 [str]<br><br>&nbsp;Prints the MD5 of the specified string<br>&nbsp;Prompts for string using a password field if not specified";
helptxt['server']['sha256'] = "usage: server sha256 [str]<br><br>&nbsp;Prints the SHA256 of the specified string<br>&nbsp;Prompts for string using a password field if not specified";
helptxt['server']['sha512'] = "usage: server sha512 [str]<br><br>&nbsp;Prints the SHA512 of the specified string<br>&nbsp;Prompts for string using a password field if not specified";
helptxt['server']['myinfo'] = "usage: server myinfo<br><br>&nbsp;Prints information about your connection";
helptxt['server']['test'] = "usage: server test<br><br>&nbsp;Tests server communication";

function Executable(console,cmdline) {
    this.cmdline = cmdline;
    this.con = console;

    this.output=function(txt) {
	this.con.output(txt);
    }
    this.addPrompt=function(txt,onCR,type) {
	this.con.addPrompt(txt,onCR,type);
    }
    this.cmd = cmdargs(cmdline)[0];
    this.args = cmdargs(cmdline)[1];

    this.start = function() {
	if (typeof(bin[this.cmd])==="undefined") {
	    this.run = undefined;
	    return null;
	} else {
	    this.run = bin[this.cmd];
	    this.run.args = this.args;
	}
    }
}

bin['sh'] = function() {
    if (isBad(this.args) || this.args=="") {
	this.con.addPrompt("$ ", "sh", "echo");
    } else if (this.args=="exit") {
	return null;
    } else {
	sys.exec(this.args);
    }
}
bin['clear']  = function() {
  this.con.clear();
}
bin['date'] = function() {
    this.output(Date());
}
bin['help'] = function() {
    var topic;
    if (isBad(this.args) || this.args=="") {
	topic = "help";
    } else if (this.args.indexOf("server")===0) {
	topic = "server";
    } else {
	topic = this.args;
    }
    switch(topic) {
	case 'help':
	this.output("Help is available for:");
	this.output("");
	for (key in helptxt) {
	    this.output(" "+key);
	}
	break;
	case 'server':
	if (sys.server.xmlhttp===null) {
	    this.output("Server communication unavailable");
	    break;
	}
	if (this.args.length>7) {
	    var servertopic = this.args.slice(7);
	    if (isBad(helptxt['server'][servertopic])) {
		this.output("No help available for server "+servertopic);
	    } else {
		this.output(helptxt['server'][servertopic]);
	    }
	} else {
	    this.output("Server commands:");
	    this.output("");
	    for (key in helptxt['server']) {
		this.output(" "+key);
	    }
	}
	break;
	default:
	if (isBad(helptxt[topic])) {
	    this.output("No help available for "+topic);
	    break;
	} else {
	    this.output(helptxt[topic]);
	}
	break;
    }
}
bin['about'] = function() {
    this.output('wwwsh - The nerdcore.net Web Shell<br><br>' +
		'Copyright (c) 2009,2016 Mike Mallett &lt;mike@nerdcore.net&gt;<br><br>' +
		'This program is free software; you can redistribute it and/or modify<br>' +
		'it under the terms of the GNU General Public License as published by<br>' +
		'the Free Software Foundation; either version 2 of the License, or<br>' +
		'(at your option) any later version.<br><br>' +
		'This program is distributed in the hope that it will be useful,<br>' +
		'but WITHOUT ANY WARRANTY; without even the implied warranty of<br>' +
		'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the<br>' +
		'GNU General Public License for more details.');
}
bin['eval'] = function() {
    if (isBad(this.args)) {
	this.addPrompt("eval: ", "eval", "noecho");
    } else {
	var o = eval(this.args);
	if (!isBad(o)) {
	    this.output(o);
	}
    }
}
bin['random'] = function() {
    if (isBad(this.args)) {
	this.output(Math.random());
    } else if (isNaN(this.args)) {
	this.output("random: bad argument");
	sys.exec("help random");
    } else {
	this.output(Math.random() * this.args);
    }
}
bin['randint'] = function() {
    if (isBad(this.args)) {
	this.output(Math.round(Math.random()));
    } else if (isNaN(this.args)) {
	this.output("randomint: bad argument");
	this.output("");
	sys.exec("help randomint");
    } else {
	this.output(Math.round(Math.random()*this.args));
    }
}
bin['info'] = function() {
    this.output("Browser name: "+navigator.appName);
    this.output("Browser code name: "+navigator.appCodeName);
    this.output("Browser version: "+navigator.appVersion);
    this.output("User Agent string: "+navigator.userAgent);
    this.output("OS platform: "+navigator.platform);
    this.output("Screen size: "+screen.width+"x"+screen.height+" ("+screen.availWidth+"x"+screen.availHeight+" available)");
    this.output("Colour depth: "+screen.colorDepth);
}
bin['open'] = function() {
    if (isBad(this.args)) {
	this.addPrompt("URL: ", "open", "echo");
    } else {
	window.open(this.args);
    }
}
/*
bin['fullscreen'] = function() {
    window.resizeTo(screen.availWidth,screen.availHeight);
    window.moveTo(0,0);
}
*/
bin['server'] = function() {
    if (sys.server.xmlhttp===null) {
	this.output("Server communication unavailable");
	return false;
    }
    if (isBad(this.args)) {
	this.output("server: missing argument");
	return false;
    }
    var ca = cmdargs(this.args);
    switch (ca[0]) {
    case 'md5':
	if (ca[1]===null) {
	    this.addPrompt("MD5: ", "server md5", "pw");
	    return false;
	}
	break;
    case 'sha256':
	if (ca[1]===null) {
	    this.addPrompt("SHA256: ", "server sha256", "pw");
	    return false;
	}
	break;
    case 'sha512':
	if (ca[1]===null) {
	    this.addPrompt("SHA512: ", "server sha512", "pw");
	    return false;
	}
	break;
    }
    sys.server.requestOutput("cmd="+ca[0]+"&args="+escape(ca[1]));
}
