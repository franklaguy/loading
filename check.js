var CHECKLOADING = {
			init: function() {
				this.onload(); // Step One: check if page has finished loading
				this.ready(); // Step Two: double check if page has finished loading using readyState
				this.history(); // Step Three: check if back or forward button is clicked
				this.singlePage(); // Step Three: check when content is loaded via AJAX in single page Apps - make sure all images are loaded
				this.state(); // check ready state - check for ADDITIONAL DOM objects 'loading...'
			},
			onload: function() {
				const load = () => { this.check(); } 
	      window.onload = load; 
			},
			ready: function() {
				var req = new XMLHttpRequest();

				req.open('GET', '/', true);

				req.onload = function () {
				  const load = () => { CHECKLOADING.check(); } 
	      	window.onload = load; 
				};

				req.send(null);
			},
			history: function(e) {
				window.onpopstate = function() {
					this.onload();
				};
				window.onpushstate = function() {
					this.onload();
				};
			},
			state: function() {
				function ready() {
					return function(event) {
						if(document.readyState === 'complete'){
							console.log('finished loading');

							var str = event.target.childNodes[1].getElementsByTagName("app")[0].innerHTML;

							if(str.includes('loading...') === true){
								console.log('There are additional DOM objects loading');
							}
						}
					}
				}

				document.addEventListener("readystatechange", ready());
			},
			singlePage: function() {
				function cb() {
					return function(event) {
						console.log("DOM finished loading and parsed");
						event.target.images.onload = () => log('img onload'); // make sure all images are loaded

						var str = event.target.childNodes[1].getElementsByTagName("app")[0].innerHTML;

						if(str.includes('loading...') === true){
							console.log('There are additional DOM objects loading');
						}
					}
				}

				document.addEventListener("DOMContentLoaded", cb());
			},
			check: function() { console.log('finished loading', window.location.href); }
		}
		CHECKLOADING.init();
