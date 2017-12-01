(function() {

	/**
	 * Variables
	 */
	var user_id = '1111';
//	var lng = -122.08;
//	var lat = 37.38;

	/**
	 * Initialize
	 */
	
	function init() {		
		$('fav-btn').addEventListener('click', loadFavoriteItems);
		loadFavoriteItems();
		
	}

	function initGeoLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onPositionUpdated,
					onLoadPositionFailed, {
						maximumAge : 60000
					});
			showLoadingMessage('Retrieving your location...');
		} else {
			onLoadPositionFailed();
		}
	}

	function onPositionUpdated(position) {
		lat = position.coords.latitude;
		lng = position.coords.longitude;

		loadFavoriteItems();
	}

	function onLoadPositionFailed() {
		console.warn('navigator.geolocation is not available');
		getLocationFromIP();
	}

	function getLocationFromIP() {
		// Get location from http://ipinfo.io/json
		var url = 'http://ipinfo.io/json'
		var req = null;
		ajax('GET', url, req, function(res) {
			var result = JSON.parse(res);
			if ('loc' in result) {
				var loc = result.loc.split(',');
				lat = loc[0];
				lng = loc[1];
			} else {
				console.warn('Getting location by IP failed.');
			}
			loadFavoriteItems();
		});
	}

	// -----------------------------------
	// Helper Functions
	// -----------------------------------

	/**
	 * A helper function that makes a navigation button active
	 * 
	 * @param btnId -
	 *            The id of the navigation button
	 */
	function activeBtn(btnId) {
		var btns = document.getElementsByClassName('main-nav-btn');

		// deactivate all navigation buttons
		for (var i = 0; i < btns.length; i++) {
			btns[i].className = btns[i].className.replace(/\bactive\b/, '');
		}

		// active the one that has id = btnId
		var btn = $(btnId);
		btn.className += ' active';
	}

	function showLoadingMessage(msg) {
		var itemList = $('item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> '
				+ msg + '</p>';
	}

	function showWarningMessage(msg) {
		var itemList = $('item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> '
				+ msg + '</p>';
	}

	function showErrorMessage(msg) {
		var itemList = $('item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> '
				+ msg + '</p>';
	}

	/**
	 * A helper function that creates a DOM element <tag options...>
	 * 
	 * @param tag
	 * @param options
	 * @returns
	 */
	function $(tag, options) {
		if (!options) {
			return document.getElementById(tag);
		}

		var element = document.createElement(tag);

		for ( var option in options) {
			if (options.hasOwnProperty(option)) {
				element[option] = options[option];
			}
		}

		return element;
	}

	/**
	 * AJAX helper
	 * 
	 * @param method -
	 *            GET|POST|PUT|DELETE
	 * @param url -
	 *            API end point
	 * @param callback -
	 *            This the successful callback
	 * @param errorHandler -
	 *            This is the failed callback
	 */
	function ajax(method, url, data, callback, errorHandler) {
		var xhr = new XMLHttpRequest();

		xhr.open(method, url, true);

		xhr.onload = function() {
			switch (xhr.status) {
			case 200:
				callback(xhr.responseText);
				break;
			case 403:
				onSessionInvalid();
				break;
			case 401:
				errorHandler();
				break;
			}
		};

		xhr.onerror = function() {
			console.error("The request couldn't be completed.");
			errorHandler();
		};

		if (data === null) {
			xhr.send();
		} else {
			xhr.setRequestHeader("Content-Type",
					"application/json;charset=utf-8");
			xhr.send(data);
		}
	}

	// -------------------------------------
	// AJAX call server-side APIs
	// -------------------------------------


	/**
	 * API #2 Load favorite (or visited) items API end point: [GET]
	 * /Titan/history?user_id=1111
	 */
	function loadFavoriteItems() {
		activeBtn('fav-btn');

		// The request parameters
		var url = './history';
		var params = 'user_id=' + user_id;
		var req = JSON.stringify({});

		// display loading message
		showLoadingMessage('Loading favorite items...');
		document.getElementById('userName').innerHTML = user_id;
		// make AJAX call
		ajax('GET', url + '?' + params, req, function(res) {
			var items = JSON.parse(res);
			if (!items || items.length === 0) {
				showWarningMessage('No favorite item.');
			} else {
				listItems(items);
			}
		}, function() {
			showErrorMessage('Cannot load favorite items.');
		});
	}

	/**
	 * API #4 Toggle favorite (or visited) items
	 * 
	 * @param item_id -
	 *            The item business id
	 * 
	 * API end point: [POST]/[DELETE] /Dashi/history request json data: {
	 * user_id: 1111, visited: [a_list_of_business_ids] }
	 */
	function changeFavoriteItem(item_id) {
		// Check whether this item has been visited or not
		var li = $('item-' + item_id);
		var favIcon = $('fav-icon-' + item_id);
		var favorite = li.dataset.favorite !== 'true';

		// The request parameters
		var url = './history';
		var req = JSON.stringify({
			user_id : user_id,
			favorite : [ item_id ]
		});
		var method = favorite ? 'POST' : 'DELETE';

		ajax(method, url, req,
		// successful callback
		function(res) {
			var result = JSON.parse(res);
			if (result.result === 'SUCCESS') {
				li.dataset.favorite = favorite;
				favIcon.className = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
			}
		});
	}

	// -------------------------------------
	// Create item list
	// -------------------------------------

	/**
	 * List items
	 * 
	 * @param items -
	 *            An array of item JSON objects
	 */
	function listItems(items) {
		// Clear the current results
		var itemList = $('item-list');
		itemList.innerHTML = '';

		for (var i = 0; i < items.length; i++) {
			addItem(itemList, items[i]);
		}
	}

	/**
	 * Add item to the list
	 * 
	 * @param itemList -
	 *            The
	 *            <ul id="item-list">
	 *            tag
	 * @param item -
	 *            The item data (JSON object)
	 */
	function addItem(itemList, item) {
		var item_id = item.item_id;

		// create the <li> tag and specify the id and class attributes
		//<div class="col-lg-3">
		var col_lg_3 = $('div',{
			className : 'col-lg-3'
		});

		//<div class="event_postcard item col-lg-3">
		var postitem = $('div', {
			id : 'item-' + item_id,
			className : 'event_postcard item'
		});

		// set the data attribute
		postitem.dataset.item_id = item_id;
		postitem.dataset.favorite = item.favorite;


		//<div class="postcard_image">
		var imagediv = $('div',{
			className : 'postcard_image'
		});

		//<img src="https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg" alt="item image" class="search_result_img">
		if (item.image_url) {
			imagediv.appendChild($('img', {
				src : item.image_url,
				className : 'search_result_img',
				alt : 'item image'
			}));
		} else {
			imagediv.appendChild($('img', {
				src : 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
				className : 'search_result_img',
				alt : 'item image'
			}))
		};
		postitem.appendChild(imagediv);


		// <div class="postcard_content">
		var contentdiv = $('div', {
			className : 'postcard_content'
		});

		//<div class="event_title"><a class="item-name" href="#">Event</a></div>
		var event_titlediv= $('div',{
			className : 'event_title'
		});

		var title = $('a', {
			href : item.url,
			target : '_blank',
			className : 'item-name'
		});
		title.innerHTML = item.name;
		event_titlediv.appendChild(title);
		contentdiv.appendChild(event_titlediv);

		//<div class="event_date_location"><p class="item-address">500 Temple<br>Detroit<br> MI</p></div></div>
		var event_locationdiv=$('div',{
			className : 'event_date_location'
		})

		// address
		var address = $('p', {
			className : 'item-address'
		});
		
		var addressHTML = item.address + "<br>" + item.city;
		address.innerHTML = addressHTML;
		//address.innerHTML = item.address.replace(/,/g, '<br/>').replace(/\"/g,
		//		'');
		event_locationdiv.appendChild(address);
		contentdiv.appendChild(event_locationdiv);
		postitem.appendChild(contentdiv);

		//div class="event_price"><p class="item-category">Music</p></div>
		var event_categorydiv = $('div',{
			className: 'event_price'
		});
		var category = $('p', {
			className : 'item-category'
		});
		category.innerHTML =  item.categories.join(', ');
		event_categorydiv.appendChild(category);
		postitem.appendChild(event_categorydiv);

		//<div class="event_action fav-link"><img src="img/heart.png" class="event_heart fa fa-heart"></div>
		var heartdiv= $ ('div',{
			className : 'event_action fav-link'
		});

		var heart = $ ('img',{
			src : 'img/heart.png',
			className : 'event_heart fa fa-heart'
		})

		heartdiv.appendChild(heart);
		postitem.appendChild(heartdiv);
		col_lg_3.appendChild(postitem);
		itemList.appendChild(col_lg_3);
	}

	init();

})();
