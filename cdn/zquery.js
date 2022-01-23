(function(window, undefined) {
    var domReadyStack = [];
    function handleDOMReady(fn) {
        return document.readyState === 'complete' ? fn.call(document) : domReadyStack.push(fn);
    }
    document.addEventListener('DOMContentLoaded', function onDOMReady() {
        document.removeEventListener('DOMContentLoaded', onDOMReady);
        while (domReadyStack.length) {
            domReadyStack.shift().call(document);
        }
    });
    function ion(selector) {
        if (!(this instanceof ion)) return new ion(selector);
        if (typeof selector === 'function') return handleDOMReady(selector);
        this.length = 0;
        this.nodes = [];
        if (selector instanceof HTMLElement || selector instanceof NodeList) {
            this.nodes = selector.length > 1 ? [].slice.call(selector) : [selector];
        } else if (typeof selector === 'string') {

            if (selector[0] === '<' && selector[selector.length - 1] === ">") this.nodes = [createNode(selector)];
            else this.nodes = [].slice.call(document.querySelectorAll(selector));

            //this.nodes = [].slice.call(document.querySelectorAll(selector));
        } else if(typeof selector === 'object') {
            this.nodes = [selector];
        }
        if (this.nodes.length) {
            this.length = this.nodes.length;
            for (var i = 0; i < this.nodes.length; i++) {
                this[i] = this.nodes[i];
            }
        }
    }

    function createNode(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    }
    ion.fn = ion.prototype;
    // function each() 
    // can be called on $('.class'), $('#id') or $(array)
    ion.fn.each = function(callback) {
        if(Array.isArray(this[0])) Array.prototype.forEach.call(this[0], callback); 
        else Array.prototype.forEach.call(this, callback);
    };
    ion.fn.addClass = function(classes) {
        return this.each(function() {
            this.className += ' ' + classes;
        });
    };
    ion.fn.removeClass = function(className) {
        return this.each(function() {
            this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        });
    };
    ion.fn.attr = function(val) {
        return this[0].getAttribute(val);
    };
    ion.fn.append = function(el) { 
        this[0].appendChild(el[0]);
    };
    ion.fn.prepend = function(el) {
        this[0].insertBefore(el[0], this[0].childNodes[0]);
    };
    ion.fn.text = function(str) {
        return this[0].innerText = str;
    };
    ion.fn.html = function(str) {
        return this[0].innerHTML = str;
    };
    // on()
    // @param name can be click, mouseover, mouseenter, and so on
    // @param handler the callback function
    ion.fn.on = function(name, handler) {
        return this.each(function(e) {
            e.addEventListener(name, handler);
        });
    };
    ion.fn.wait = function(s, f) {
        window.setTimeout(f, s);    
    };
    ion.fn.ajax = function(config) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() { config.success(http); };
        if(config.method == 'get' || config.method == 'GET') http.open(config.method, config.action + '?' + config.data, true);
        else http.open(config.method, config.action, true);
        if(config.contentType) http.setRequestHeader("Content-type", config.contentType);
        if(config.method == 'get' || config.method == 'GET') http.send();
        else http.send(config.data);    
    };
    ion.fn.log = function(str) {
        console.log('log: ' + str);
    };
    ion.fn.toggle = function(el) {
        el.style.display = (el.style.display == 'none' || el.style.display == 'undefined' || el.style.display == '') ? 'block' : 'none';    
    };
    window.$ = ion;
})(window);
