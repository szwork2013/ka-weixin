angular.module('filters', [])
	.filter('isSelected', function(){
		return function(input) {
			return input? 'selected': '';
		}
	})
	.filter('isPop', function(){
		return function(input) {
			return input? 'pop':'';
		}
	})
	.filter('timeFill', function(){
		return function(input) {
			if(input < 10) return '0' + input;
			return input;
		}
	}).filter('isDisabled', function(){
		return function(input) {
			return input ? '':'disabled';
		}
	})
	.filter('detailtypeToClass', function(){
		return function(input) {
			var output;
			switch(input) {
				case '待租用': output= 'one'; break;
				case '出租中': output='three'; break;
				case '待分享': output='two'; break;
				default: output='';
			}
			return output;
		}
	})
	.filter('dbDateToShow1', function(){
		return function(input) {
			var r = /\/Date\((-?[0-9]+)\)\//.exec(input);
			var date = new Date();
			date.setTime(r[1]);
			var hours,minutes;
			hours = date.getHours()<10 ? ('0' + date.getHours()) : date.getHours() ;
			minutes = date.getMinutes()<10 ? ('0' + date.getMinutes()) : date.getMinutes();
			return hours + ':' +minutes;
		}
	})
	.filter('dbDateToDay', function(){
		return function(input) {
			var r = /\/Date\((-?[0-9]+)\)\//.exec(input);
			//var date = new Date();
			//date.setTime(r[1]);
			var inputDate = parseInt(parseInt(r[1]) /  1000  /  60  /  60  /24);
			var nowDate = parseInt(new Date().getTime() /  1000  /  60  /  60  /24);

			console.log(nowDate - inputDate);
			switch(inputDate - nowDate) {
				case -2: return '前天';
				case -1: return '昨天';
				case 0: return '今天';
				case 1: return '明天';
				case 2: return '后天';
				default: return ''
			}

		}
	})
	.filter('weekToDay', function(){
		var week = ['一', '二', '三', '四', '五', '六', '日'];
		return function(input) {
			var output = '每周 ';
			for(var i = 0, len = input.length; i < len; i++) {
				output += week[parseInt(input[i]) - 1] + '、';
			}
			return output.substr(0, output.length - 1);

		}
	})
	.filter('numToDay', function() {
		return function(input) {
			switch(input) {
				case '-2': return '前天';
				case '-1': return '昨天';
				case '0': return '今天';
				case '1': return '明天';
				case '2': return '后天';
				default: return ''
			}
		}
	})
	.filter('isIndexCarNumber', function(){
		return function(input) {
			if(input[0] === input[1]) {
				return 'selected';
			}

			return '';
		}
	})
	.filter('dbDateToTime', function(){
		return function(input) {
			var m = /\/Date\(([0-9]+)\)\//.exec(input);
			if(m && m.length >= 2) return m[1];
			return input;
		}
	})
	.filter('encryptPhone', function(){
		return function(input) {
			input = input + '';
			return input.substr(0,3) + '****' + input.substr(7);
		}
	})
	.filter('shareEndTime', function(){
		function dateToDay(time) {
			return time/1000/60/60/24;
		}

		return function(input) {
			var now = new Date(),
				end = new Date(parseInt(input)),
				leave = new Date(parseInt(input) - now.getTime());
			if(dateToDay(parseInt(input) - now.getTime()) > 1 ) {
				return '多于一日';
			} else {
				return leave.getHours() +'时' + leave.getMinutes() +  '分';
			}
		
		}
	})
	.filter('formatDate', function(){
		function fillZero(x) {
			return x < 10 ? '0' + x: '' + x;
		}
		return function(input) {
			var date = new Date(parseInt(input));
			return fillZero(date.getMonth()+1) + '-'
				 	+ fillZero(date.getDate()) + ' '
				 	+ fillZero(date.getHours()) + ':'
				 	+ fillZero(date.getMinutes());
		}
	});