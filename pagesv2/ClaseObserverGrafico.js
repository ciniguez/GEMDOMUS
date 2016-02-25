/**
 * Esta Clase utiliza el patrón Singleton para tener
 * una única instancia. A esta clase se suscriben los gráficos
 * estadísticos.
 */
var ClassObserverSingleton = function() {
	if (ClassObserverSingleton.singleInstance)
		return ClassObserverSingleton.singleInstance;
	ClassObserverSingleton.singleInstance = this;

	handlers = [];
	// observers

	this.subscribe = function(fn) {
		handlers.push(fn);
	};

	this.unsubscribe = function(fn) {
		handlers = handlers.filter(function(item) {
			if (item !== fn) {
				return item;
			}
		});
	};

	this.fire = function(selection, claseGrafico) {
		//Configuro los parametros globales de consulta
		var message = '';
		for (var i = 0; i < selection.length; i++) {
			var item = selection[i];
			if (item.row != null && item.column != null) {
				var str = claseGrafico.data.getFormattedValue(item.row, item.column);
				message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
			} else if (item.row != null) {
				var parametros = new ParametrosSingleton();
				var str = claseGrafico.data.getFormattedValue(item.row, 0);
				
				if (claseGrafico.variablePrincipal == "cromosome") {
					parametros.cromosoma = claseGrafico.data.getValue(item.row, 1);
			
					
				}
				if (claseGrafico.idContenedor == "grap1") {
					parametros.alelo = claseGrafico.data.getValue(item.row, 1);
				}
				if (claseGrafico.idContenedor == "grap2") {
					parametros.referencia = claseGrafico.data.getValue(item.row, 1);
				}
				
				console.log("En " + claseGrafico.idContenedor + " cosulto : chr:" + parametros.cromosoma + " |alelo:" + parametros.alelo + "|REF: " + parametros.referencia);
				message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
			} else if (item.column != null) {
				var str = claseGrafico.data.getFormattedValue(0, item.column);
				message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
			}
		}
		if (message == '') {
			message = 'nothing';
		}
		//Por cada gráfico suscrito a la clase ClaseObserverGrafico, ejecuto su metodo selectHandler
		handlers.forEach(function(item) {
			selectHandler.call(item);
		});
	};

};
