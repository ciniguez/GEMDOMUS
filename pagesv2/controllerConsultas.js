/**
 * CLASE CONTROLADOR DE CONSULTAS
 */
function GenDomusConsultas() {
	var that = this;
	that.numeroContenedoresGraficos = 6;
	/**
	 * Métodos de la Clase
	 */
	that.init = function() {
		generarContenedoresGraficos(this.numeroContenedoresGraficos);
/*
		// Load the Visualization API and the corechart package.
		google.charts.load('current', {
			'packages' : ['corechart']
		});

		var options = {
			'title' : 'Titulo Graph',
			'width' : 300,
			'height' : 300
		};
		// Create the data table.
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Topping');
		data.addColumn('number', 'Slices');
		data.addRows([['Mushrooms', 3], ['Onions', 1], ['Olives', 1], ['Zucchini', 1], ['Pepperoni', 2]]);
		// Set a callback to run when the Google Visualization API is loaded.
		google.charts.setOnLoadCallback(that.addGraph(data, options, 'contenedorGrafico0'));
*/
		$('#btnFilters').click(function() {
			console.log("carlos");
			if ($('.sidebar-offcanvas').css('background-color') == 'rgb(255, 255, 255)') {
				$('.filters').attr('tabindex', '-1');
			} else {
				$('.filters').attr('tabindex', '');
			}
			$('.row-offcanvas').toggleClass('active');

		});
		$("#sortable1").sortable().disableSelection();

		//Agregar Graficos
		/*
		for (var i = 0; i < that.numeroContenedoresGraficos; i++) {
			that.addGraph();
		}
		*/

	};
	/**
	 * Draw a statisctic graph
	 * @param {Object} data Data JSON to fill the graph
	 * @param {Object} options A object in the way {'title':'xx', 'width':00 , 'height':00}
	 * @param {Object} idContenedor Cotent Identificator
	 */
	that.addGraph = function(data, options, idContenedor) {

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById(idContenedor));
		chart.draw(data, options);
	};
	function generarContenedoresGraficos(numeroCuadros) {
		for (var i = 0; i < numeroCuadros; i++) {
			$("#dashboard ul").append('<div id="contenedorGrafico' + i + '" class="contenedorGrafico">AQUI EL GRAFICO ' + i + '</div>');
		}

	}

}

