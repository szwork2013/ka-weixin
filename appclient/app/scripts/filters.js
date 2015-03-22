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
		var week = ['日', '一', '二', '三', '四', '五', '六'];
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
	});
