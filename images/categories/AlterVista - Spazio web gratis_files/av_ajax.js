/* AV AJAX */
/* Based on Ajaxelation http://ajaxelation.com/ */

/* Request object */
function Request(url, get, post, callback, params, id) {
	/* Start Contructor */
	this.url = url; // URL
	this.get = get; // Parameters via GET
	this.post = post; // Parameters via POST
	this.callback = callback; // Callback
	this.params = params; // Params for Callback
	this.id = id;
	/* End Contructor */
}

function Av_Ajax(queue_length) {
	/* Start Constructor */
	this.history = new Array();
	this.handler = undefined;
	this.request = undefined;
	this.queue_length = queue_length == undefined ? 3 : queue_length; // Default queue length
	this.id = 0;
	/* End Constructor */

	/* Enqueues a new request */
	this.request_enqueue = function(url, get, post, callback, params) {
		if (this.history.length >= this.queue_length) return false;
		this.history.push(new Request(url, get, post, callback, params, this.id++));
		this.go();
	}

	/* Sends a request. */
	this.go = function() {
		if (this.history.length == 0 || this.request != undefined) return;
		this.request = this.history.shift();

		// Istantiate the XMLHttpRequest object
		if (this.handler == undefined) {
			if (window.ActiveXObject) { // IE 
				this.handler = new ActiveXObject('Microsoft.XMLHTTP');
			} else if (window.XMLHttpRequest) { // All others
				this.handler = new XMLHttpRequest();
			} else {
				alert('Error: Your browser is not remote scripting enabled.');
				return false;
			}
			if (typeof(this.handler) != 'object') {
				alert('Error: Your browser is not remote scripting enabled.');
				return false;
			}
		}

		// Sets response function
		this.handler.onreadystatechange = function() {
			if (av_ajax.handler.readyState != 4) return;
			if (av_ajax.handler.status == 200) av_ajax.response();
			av_ajax.stop();
		};

		// Cache busting
		this.request.get = (this.request.get == undefined ? '' : this.request.get + '&') + 'cb='+(new Date()).getTime()+(100+Math.floor(899 * Math.random()));

		// The request
		if (this.request.post != undefined) {
			this.handler.open('POST', this.request.url + '?' + this.request.get, true);
			this.handler.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			this.handler.send(this.request.post);
		} else {
			this.handler.open('GET', this.request.url + '?' + this.request.get, true);
			this.handler.send(null);
		}
	}

	/* Receives the data */
	this.response = function() {
		if (this.handler.responseXML == undefined || (root = this.handler.responseXML.documentElement) == undefined) {
			alert('ERROR: XML response seems not valid.');
			this.stop();
			return false;
		}

		var params = {};

		for (var i = 0; i < root.childNodes.length; i++) {
			var node = root.childNodes.item(i);
			if (node.nodeType != 1) continue; // Only ELEMENT_NODE
			if (node.tagName == 'xhtml') {
				document.getElementById(node.getAttribute("target")).innerHTML = node.firstChild.nodeValue;
			} else if (node.tagName == 'javascript') {
				var content = node.firstChild.nodeValue;
				eval(content);
			} else if (node.tagName == 'param') {
				var name = node.getAttribute("name");
				if (name == undefined) continue;
				var content = node.firstChild.nodeValue;
				if (content == undefined) continue;
				params[name] = content;
			}
		}

		if (this.request.callback != undefined) this.request.callback(this.request.params, params);
		this.stop();
	}
	
	this.stop = function() {
		this.handler.abort();
		this.request = undefined;
		setTimeout("av_ajax.go()", 25);
	}
	
	/* *** Wrapper functions *** */

	this.split_link = function(url) {
		var ret = new Array();
		if (url.indexOf('?') > 0) {
			ret['path'] = url.substr(0, url.indexOf("?"));
			ret['get'] = url.substr(url.indexOf("?") + 1);
		} else {
			ret['path'] = url;
			ret['get'] = undefined;
		}
		return ret;
	}

	this.wrapper_link = function(link, callback, params) {
		var url = this.split_link(link.href);
		this.request_enqueue(url['path'], url['get'], undefined, callback, params);
		return false;
	}

	this.wrapper_form = function(form, callback, params) {
		var method = (form.getAttribute("method") ? form.getAttribute("method").toLowerCase() : "get");
		var url = this.split_link(form.getAttribute("action"));

		url[method] = '';
		for (var i = 0; i < form.elements.length; i++) {
			element = form.elements[i];
			var name = new String(element.name); // for some reason, element.name isn't a String by default
			if (name.length > 0 && name != "undefined" && element.value != "undefined" && !element.disabled) {
				switch(element.type) {
					case 'select-one':
						url[method] += "&" + escape(name) + "=" + element.options[element.selectedIndex].value;
						break;
					case 'radio':
					case 'checkbox':
						if (!element.checked) break;
					default:
						url[method] += "&" + escape(name) + "=" + escape(element.value).replace(/\+/g, '%2B');
				}
			}
		}
		url[method] = url[method].substring(1);

		this.request_enqueue(url['path'], url['get'], url['post'], callback, params);

		return false;
	}
	
	this.wrapper_get = function(url, get, callback, params) {
		this.request_enqueue(url, get, undefined, callback, params);
		return false;
	}
	
	this.include = function(src) {
		id = 'jsinclude_' + src.replace(/[^a-zA-Z0-9_]/g, '');
	
		if (document.getElementById(id) != undefined) return;

		script = document.createElement('script');
		script.id = id;
		script.type = 'text/javascript';
		script.src = src;
		
		head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	
		return script.id;
	 }
}

// An istance of Av_Ajax used by everyone
var av_ajax = new Av_Ajax();
