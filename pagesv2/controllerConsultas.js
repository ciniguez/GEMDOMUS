$(document).ready(function() {
	var gendomus = new GenDomusConsultas();
	gendomus.dibujarContenedores();
	$('#filtros').toggle(false);
	$('#btnFilters').click(function(){
		$('#filtros').toggle("slow");
	})
});

function GenDomusConsultas(){
	this.numeroContenedoresGraficos = 3;
}
GenDomusConsultas.prototype={
	dibujarContenedores: function(){generarContenedoresGraficos(this.numeroContenedoresGraficos);
		}
}
function generarContenedoresGraficos(numeroCuadros) {
	for (var i = 0; i < numeroCuadros; i++) {
		$("#dashboard").append('<div id="contenedorGrafico' + i + '" class="contenedorGrafico">AQUI UN GRAFICO</div>');
	}

}
