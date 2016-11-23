function ServerComm(con) {
    this.con = con;
    this.xmlhttp = makeajax();
    this.cmdurl="/cmd.php?";

    this.requestOutput = function(req) {
	if (this.xmlhttp===null) {
	    this.con.output("Server communication unavailable");
	    return null;
	}
	this.xmlhttp.con = this.con;
        this.xmlhttp.onreadystatechange = function() {
	    if (this.readyState==4) {
		this.con.output(this.responseText);
	    }
	}
	this.xmlhttp.open("GET", this.cmdurl+req, true);
	this.xmlhttp.send(null);
    }
}

function makeajax() {
    if (typeof XMLHttpRequest === "undefined") {
	XMLHttpRequest = function() {
	    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
	    catch(e) {}
	    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
	    catch(e) {}
	    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
	    catch(e) {}
	    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
	    catch(e) {}
	    return null;
	};
    }
    return new XMLHttpRequest();
}
function verboseStateChange() {
    if (xmlhttp.readyState == 0) {
	// Request not initialized
	sys.con.output("XML HTTP Request: Uninitialized");
    }
    if (xmlhttp.readyState == 1) {
	// Request ready
	sys.con.output("XML HTTP Request: Ready");
    }
    if (xmlhttp.readyState == 2) {
	// Request sent
	sys.con.output("XML HTTP Request: Sent");
    }
    if (xmlhttp.readyState == 3) {
	// Request in process
	sys.con.output("XML HTTP Request: Processing...");
    }
    if (xmlhttp.readyState == 4) {
	// Request complete
	sys.con.output("XML HTTP Request: Complete!");
	sys.con.output(xmlhttp.responseText);
    }
}
