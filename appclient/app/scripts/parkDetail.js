$(function(){

	var $shade = $('.shade');
	$shade.on('click', function(){
		$shade.removeClass('pop');
	});

	$('.park-detail-list li').on('click', function(){
		$shade.addClass('pop');
	});


	var $refuse = $('.refuse');
	$refuse.on('click', function(e){
		$shade.removeClass('pop');
		e.stopPropagation();
	})

	var $modal = $('.modal');
	$modal.on('click', function(e){
		e.stopPropagation();
	});

	function get() {
		var url = location.search, str, i, strs;
		var theRequest = {};
		if(url.indexOf('?') != -1){
			str = url.substr(1);
			strs = str.split('&');
			for(var i = 0; i < strs.length; i ++){
				theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}

	var request = get();
	$('.park-name').html(request['name']);
	$('.park-address').html(request['address']);
	$('.park-leave').html(request['leave']);
	$('.park-location').html(request['location']);

});