var sys;
function startSystem() {
    sys = new System();
    sys.initialize();
}
function System() {
    this.runtime = new Date();
    this.pid = 0;
    this.con = new Console();
    this.server = new ServerComm(this.con);

    this.output = function(txt) {
	this.con.output(txt);
    }
    this.clearscr = function() {
	this.con.clear();
    }
    this.initialize = function() {
	this.clearscr();
	this.output("Initializing command line system ...");
	this.runtime = new Date();
	this.output(this.runtime.toLocaleString());
	this.output("Testing server communication: ");
	if (this.server.xmlhttp===null) {
	    this.output("Server communication: UNAVAILABLE");
	} else {
	    this.server.requestOutput("cmd=test");
	}
	this.output("");
	this.output("Welcome to wwwsh!");
	this.output("");
	this.output("Type 'help' for a list of available commands.");
	this.tick();
    }
    this.restart = function() {
	location.reload();
    }
    this.tick = function() {
	document.getElementById("clock").innerHTML=Date();
	if (this.con.numPrompts()===0) {
	    if (this.server.xmlhttp!==null) {
		if (this.server.xmlhttp.readyState===0 || this.server.xmlhttp.readyState===4) {
		    this.exec("sh");
		}
	    } else {
		this.exec("sh");
	    }
	}
	setTimeout("sys.tick()", 200);
    }
    this.exec = function(cmdline) {
	if (cmdline=="restart" || cmdline=="reload") {
	    this.restart();
	    return null;
	}

	var e=new Executable(this.con,cmdline);
	if (isBad(e)) {
	    this.output("System Error: Unable to initialize executable");
	    return null;
	}
	e.start();
	if (isBad(e.run)) {
	    this.output("Unknown command "+cmdargs(cmdline)[0]);
	    return null;
	}
	e.run();
    }
}

function isBad(x) {
    if (typeof(x)==="undefined") { return true; }
    if (x===undefined) { return true; }
    if (x===null) { return true; }
    if (x===false) { return true; }
    if (x===0) { return true; }
    return false;
}

function cmdargs(cmdline) {
    var ret = new Array();
    if (isBad(cmdline)) {
	ret[0] = "";
	ret[1] = null;
    } else if (cmdline.indexOf(" ")===-1) {
	ret[0]=cmdline;
	ret[1]=null;
    } else {
	ret[0]=cmdline.slice(0,cmdline.indexOf(" "));
	ret[1] = cmdline.slice(cmdline.indexOf(" ")+1);
    }
    return ret;
}

