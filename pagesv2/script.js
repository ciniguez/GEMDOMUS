$(document).ready(function() {
	//var ctrl = new CtrlCargaDatos('../testJson/Alberto.json', '../testJson/DataSources.json');
	//var ctrl = new CtrlCargaDatos('http://158.42.185.198:8080/getanalysis', 'http://158.42.185.198:8080/getdatasources');
	var ctrl = new CtrlCargaDatos('http://158.42.185.198:8080/getanalysis2', 'http://158.42.185.198:8080/getdatasources');

	$('div.acordion').accordion({
		header : "h2",
		heightStyle : "content",
		active : false,
		navigation : true,
		collapsible : true
	});
	$('ul li').hover(function() {
		$(this).css("background-color", "#778899");
		$(this).css("color", "#FFFFFF");
	}, function() {
		$(this).css("background-color", "#FFFFFF");
		$(this).css("color", "#000000");
	});
});
