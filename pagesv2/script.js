$(document).ready(function() {
	$('#acordion').accordion({
		header : "h2",
		heightStyle : "content",
		active : true,
		navigation : true
	});
	
	
	var ctrl = new CtrlCargaDatos();
	ctrl.loadProyecto();
	ctrl.loadVariantes("cmpRepositorioVariantes","data/data_vcfs.json");

});
