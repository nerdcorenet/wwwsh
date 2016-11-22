function Console() {
    this.screen = document.getElementById("screen");
    this.linesep = "<br>";

    this.output = function(txt) {
	var numSpaces;
	for (numSpaces=0; numSpaces<txt.length; numSpaces++) {
	    if (txt.charAt(numSpaces)!=" ") {
		break;
	    }
	}
	if (numSpaces > 0) {
	    var newtxt = "";
	    for (var i=0; i<numSpaces; i++) {
		newtxt += "&nbsp;";
	    }
	    newtxt += txt;
	    txt = newtxt;
	}
	this.screen.innerHTML += txt;
	this.screen.innerHTML += this.linesep;
/*
	var lines = this.screen.innerHTML.split(this.linesep);
	while(lines.length>20) {
	    lines.shift();
	}
	this.screen.innerHTML = lines.join(this.linesep);
*/
	this.focus();
	window.scrollTo(0,9999999);
    }

    this.clear = function() {
	this.screen.innerHTML="";
    }

    this.keypress = function(e,id) {
	var input = document.getElementById("userInput"+id);
	if (e.keyCode == 13 || input.value == "\n") {
	    if (input.value!=="") {
		input.form.submit();
		this.screen.removeChild(input.form);
	    }
	}
    }
    this.addPrompt = function(txt,onCR,type) {
	if (txt.length<1) {
	    txt="> ";
	}
	if (type===undefined||typeof(type)==="undefined") {
	    type = null;
	}

	var t=new Date();
	var id=t.getTime();
	var holder = document.createElement("form");
	holder.id = "promptHolder"+id;
	holder.setAttribute("action", "javascript:;");
	if (type=="echo") {
	    holder.setAttribute("onsubmit", "sys.exec('"+onCR+" '+sys.con.getInput("+id+",true))");
	} else {
	    holder.setAttribute("onsubmit", "sys.exec('"+onCR+" '+sys.con.getInput("+id+",false))");
	}
	var prompt = document.createElement("span");
	prompt.id = "promptText"+id;
	prompt.innerHTML = txt;
	var input = document.createElement("input");
	if (type=="pw") {
	    input.type = "password";
	}
	input.id = "userInput"+id;
	input.size = 80-txt.length;
	input.className = "userInput";
	input.setAttribute("onkeydown","sys.con.keypress(event,"+id+")");
	holder.appendChild(prompt);
	holder.appendChild(input);
	this.screen.appendChild(holder);
	input.focus();
	return id;
    }
    this.numPrompts = function() {
	var p = this.screen.getElementsByTagName("form");
	return p.length;
    }
    this.getInput = function(id, echo) {
	var input = document.getElementById("userInput"+id);
	var val = input.value;
	if (echo) {
	    this.output(document.getElementById("promptText"+id).innerHTML+val);
	}
	this.screen.removeChild(document.getElementById("promptHolder"+id));
	return val;
    }
    this.focus = function() {
	var forms = this.screen.getElementsByTagName("form");
	if (forms.length > 0) {
	    forms[0].getElementsByTagName("input")[0].focus();
	}
    }
}
