/**
 * CLASE CONTROLADOR DE CONSULTAS
 */
function GenDomusConsultas() {
	var that = this;
	that.numeroContenedoresGraficosAllowed = 6;
	that.idContenedorActual = 0;
	that.prefijoContenedor = "grap";
	that.altoGrafico = 290;
	that.anchoGrafico = 290;
	/**
	 * Métodos de la Clase
	 */
	that.init = function() {
		
		$('#btnFilters').click(function() {
			if ($('.sidebar-offcanvas').css('background-color') == 'rgb(255, 255, 255)') {
				$('.filters').attr('tabindex', '-1');
			} else {
				$('.filters').attr('tabindex', '');
			}
			$('.row-offcanvas').toggleClass('active');

		});
		$('#btnAddGraph').click(function() {
			$("#frameNewGraph").modal();
		});
		$('#btnDeleteGraph').click(function() {
			//TO DO
		});
		$('#frameNewGraph .btn-success').click(function() {

			//Obtengo las variables del gráfico
			var titulo = $('#frameNewGraph #txtTitle').val();
			//console.log(titulo);
			var tipoGrafico = 0;
			//console.log(tipoGrafico);
			var variablePrincipal = $('#frameNewGraph select[id="lstMainVariable"]').val();
			//console.log(variablePrincipal);
			var variableSecundaria = $('#frameNewGraph select[id="lstSecondVariable"]').val();
			//console.log(variableSecundaria);
			var operacion = $('#frameNewGraph select[id="lstAgregation"]').val();
			//console.log(operacion);

			//Add the graph to cotainer created.
			var options = {
				'title' : titulo,
				'tipoGrafico' : tipoGrafico,
				'variablePrincipal' : variablePrincipal,
				'variableSecundaria' : variableSecundaria,
				'operacion' : operacion,
				'width' : that.anchoGrafico,
				'height' : that.altoGrafico
			};
			that.addGraph(options);

		});
		$("#sortable1").sortable().disableSelection();

	};
	/**
	 * Create a graph container inside UL "sortable" and draw a statisctic graph inside it.
	 * @param {Object} data Data JSON to fill the graph
	 * @param {Object} options A object in the way {'title':'xx', 'width':00 , 'height':00}
	 * @param {Object} idContenedor Cotent Identificator
	 */
	that.addGraph = function(options) {
		//Create a new container in the top of List of Graphs.
		if (that.idContenedorActual === null) {
			that.idContenedorActual = 0;
		}
		if (that.idContenedorActual <= that.numeroContenedoresGraficosAllowed) {
			var idName = that.prefijoContenedor + that.idContenedorActual;
			var liElement = '<div id="' + idName + '" class="contenedorGrafico"></div>';

			$(liElement).prependTo('#dashboard ul');

			//Efecto feedback para el usuario (cambio de color para alertar el nuevo gráfico)
			//Una vez que la animación termina, se ejeucta la creación del gráfico.
			$('#' + idName).animate({
				'border-width' : "120px",
			}, 'slow');
			//restauro estado inicial
			$('#' + idName).animate({
				'border-width' : "1px",
			}, 'fast', function() {
				// Create the data table.
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'Topping');
				data.addColumn('number', 'Slices');
				data.addRows([['Mushrooms', 3], ['Onions', 1], ['Olives', 1], ['Zucchini', 1], ['Pepperoni', 2]]);
				
				var newGrafico = new ClassGrafico(data,options, idName);
				newGrafico.dibujar();
				//Actualizo el contador de Contenedores
				that.idContenedorActual += 1;

			});

		} else {
			console.log("Ha llegado al límite de los " + that.numeroContenedoresGraficosAllowed + " graficos");
		}

	};
}