var H = { /* help popover */
	toggle: function (el) {
		var h_root = el.parentNode;
		while (h_root && !h_root.className.match(/help-popover/)) h_root = h_root.parentNode;
		if (h_root) {
			var popover = h_root.firstChild;
			while (popover.nodeType != 1 || !popover.className.match(/^popover (right|top|bottom|left)/)) popover = popover.nextSibling;
			if (popover) {
				if (popover.style.display == 'none') {
					popover.style.display = 'block';
					if (popover.className.match(/right/)) {
						popover.style.top = Math.floor((h_root.offsetHeight/2)-(popover.offsetHeight/2))+'px';
						popover.style.left = (h_root.offsetWidth + 2)+'px'; 
					} else if (popover.className.match(/left/)) {
						popover.style.top = Math.floor((h_root.offsetHeight/2)-(popover.offsetHeight/2))+'px';
						popover.style.left = -(popover.offsetWidth) + 'px';
					} else if (popover.className.match(/top/)) {
						popover.style.top = -popover.offsetHeight + 'px';
						popover.style.left = Math.floor((h_root.offsetWidth/2)-(popover.offsetWidth/2))+'px';
					} else if (popover.className.match(/bottom/)) {
						popover.style.top = (h_root.offsetHeight + 2)+'px';
						popover.style.left = Math.floor((h_root.offsetWidth/2)-(popover.offsetWidth/2))+'px';
					}
				} else {
					popover.style.display = 'none';
				}
			}
		}
		return false;
	}
}
