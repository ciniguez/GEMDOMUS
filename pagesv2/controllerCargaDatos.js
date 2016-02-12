function CtrlCargaDatos() {
	var data;
}

CtrlCargaDatos.prototype = {
	loadProyecto : function(data) {
		cargarDatosProyecto();
	},
	loadVariantes : function(idContenedor, url_fichero_json) {
		cargarVariantes(idContenedor, url_fichero_json);
	},
	loadDatosSources : function() {
	},
}

function cargarDatosProyecto() {
	$('#lblNombreProyecto').text("Proyecto Manhatan");
	$('#lblDescripcion').text("Lorem Ipsum es simplemente el texto de relleno de "+ 
	"las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar " +
	"de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) "+ 
	"desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. "+
	"No sólo sobrevivió 500 años");
}

function cargarVariantes(idContendor, url_fichero_json) {
	//Obtener datos
	$.get(url_fichero_json, function(data) {
		$.each(data, function(i, item) {
			//aggregar dato
			_crearVariante(idContendor, item);
		});
	});
};
/*---------Funciones privadas -------*/
function _crearVariante(idContendor, item) {
	var html = '<li><div id="carta' + item.id + '" class="carta"><div class="iconcaja"></div><div class="contenido"><p><b>' + item.nombre + '</b></p><p><span>' + item.descripcion + '</span></p></div><div id="operador" class="add"></div></div></li>';
	$('#' + idContendor + ' ul').append(html);
	//Cargo el evendo del ADD
	$("#carta" + item.id + " .add").on("click", function() {
		console.log($(this).parent().attr("id"));
		btnAddVariante($(this).parent().attr("id"));
	});
}

function btnAddVariante(idElementoVariante) {
	//Clono el objeto y lo ingreso en el Repositorio Storage, y cambio el icono de ADD a MINUS
	$('#'+idElementoVariante+' #operador').removeClass("add").addClass("minus");
	var nodo = $('#'+idElementoVariante).parent().clone();
	$("#cmpStorageVariantes ul").append(nodo);
	//Cambio el icono de la Carta a a eliminar
	
	//Elimino el li de origen
	$('#'+idElementoVariante).parent().remove();
	// comunica al servidor el guardado

	//refresco la lista destino
}
