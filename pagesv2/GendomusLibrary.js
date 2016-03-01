var GENDOMUS = {
	APP : {
		inicializar : function() {
			var that = this;

			/**
			 * Métodos de la Clase
			 */
			that.init = function(options) {
				that.numeroContenedoresGraficosAllowed = options.numeroContenedoresGraficosAllowed;
				that.idContenedorActual = options.idContenedorActual;
				that.prefijoContenedor = options.prefijoContenedor;
				that.altoGrafico = options.altoGrafico;
				that.anchoGrafico = options.anchoGrafico;
				that.idBtnAgregarGrafico = options.idBtnAgregarGrafico;
				that.idBtnEliminarGrafico = options.idBtnEliminarGrafico;
				that.idDashboard = options.idDashboard;
				that.idPilaFiltros = options.idPilaFiltros;
				that.idContendorMensajes = options.idContenedorMensajes;

				//Instancio los objetos
				var pilaFiltros = new GENDOMUS.GENLIBRARY.clsPilaFiltros(that.idPilaFiltros);
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

					$(liElement).prependTo(that.idDashboard);

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

						var newGrafico = new GENDOMUS.GENLIBRARY.clsGrafico(data, options, idName);
						newGrafico.dibujar();
						//Actualizo el contador de Contenedores
						that.idContenedorActual += 1;
					});

				} else {
					console.log("Ha llegado al límite de los " + that.numeroContenedoresGraficosAllowed + " graficos");
				}

			};
			that.deleteGraph = function(idSelector) {
				//Elimino el gráfico del dashboard
				var observer = GENDOMUS.GENLIBRARY.clsObserverSingleton();

				//elimino el filtro de la paleta de fltros
			};
		}
	},

	GENLIBRARY : {
		/**
		 * Esta Clase utiliza el patrón Singleton para tener
		 * una única instancia. A esta clase se suscriben los gráficos
		 * estadísticos.
		 */
		clsObserverSingleton : function() {
			if (GENDOMUS.GENLIBRARY.clsObserverSingleton.singleInstance)
				return GENDOMUS.GENLIBRARY.clsObserverSingleton.singleInstance;
			var that = this;
			GENDOMUS.GENLIBRARY.clsObserverSingleton.singleInstance = that;

			handlers = [];
			// observers

			that.subscribe = function(fn) {
				handlers.push(fn);
			};

			that.unsubscribe = function(fn) {
				handlers = that.handlers.filter(function(item) {
					if (item !== fn) {
						return item;
					}
				});
			};

			that.fire = function(selection, claseGrafico) {
				//Configuro los parametros globales de consulta
				var message = '';
				for (var i = 0; i < selection.length; i++) {
					var item = selection[i];
					if (item.row != null && item.column != null) {
						var str = claseGrafico.data.getFormattedValue(item.row, item.column);
						message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
					} else if (item.row != null) {

						//var str = claseGrafico.data.getFormattedValue(item.row, 0);
						var valorSeleccionado = claseGrafico.data.getValue(item.row, 1);
						//actualizacion de los valores Parametro Generales.
						var newParametro = new GENDOMUS.GLOBAL.ClsParametro(claseGrafico.variablePrincipal, valorSeleccionado);
						var parametros = new GENDOMUS.GLOBAL.ClsParametros();
						parametros.addParameter(newParametro);

						//agregar filtro en stack de filtros
						var objFiltro = new GENDOMUS.GENLIBRARY.clsFilter(claseGrafico.variablePrincipal, valorSeleccionado);
						var colaFiltros = new GENDOMUS.GENLIBRARY.clsPilaFiltros();
						colaFiltros.addFiltro(objFiltro);

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
					GENDOMUS.GLOBAL.ClsSelectHandler.call(item);
				});
			};

		},
		/**
		 * Implementacion de una clase en base a los
		 * gráfico de Google Chart.
		 */
		clsGrafico : function(data, options, idContenedor) {
			var that = this;
			//Seteo las variables de la funcion********
			//Data para ser pintada en el gráfico
			that.data = data;
			//Nombre de variables que identifican el contexto del contenido del grafico
			that.variablePrincipal = options.variablePrincipal;
			that.variableSecundaria = options.variableSecundaria;
			//Id del contenedor donde se grafica el gráfico
			that.idContenedor = idContenedor;

			//Opciones de Google
			that.opcionesGoogle = {
				"title" : options.title,
				"width" : options.width,
				"height" : options.height
			};

			//Objeto gráfico de Google
			that.graficoGoogle = new google.visualization.PieChart(document.getElementById(that.idContenedor));
			//Agregar evento select, para lanzar un evento al seleccionar cualquier region del grafico
			google.visualization.events.addListener(that.graficoGoogle, 'select', functionHandler);
			//Suscribir Objeto (clsGrafico) para futuros eventos (Patron Observador)
			var observer = new GENDOMUS.GENLIBRARY.clsObserverSingleton();
			observer.subscribe(that);

			that.dibujar = function() {
				//dibujar el gráfico
				that.graficoGoogle.draw(that.data, that.opcionesGoogle);
			};
			function functionHandler() {
				//Llamamos a la instancia del Suscriptor (Patron Observer)
				var observer = new GENDOMUS.GENLIBRARY.clsObserverSingleton();
				//suscribimos el grafico
				observer.fire(that.graficoGoogle.getSelection(), that);
			}


			that.eliminar = function() {
				//Suscribir Objeto (ClassGrafico) para futuros eventos
				var observer = new GENDOMUS.GENLIBRARY.clsObserverSingleton();

			};
		},
		clsFilter : function(claveFiltro, valueFiltro) {
			this.value = valueFiltro;
			this.key = claveFiltro;
		},
		/**
		 * Funcion que representa la lista de filtros.
		 * Objetivo: Gestionar el almacenamiento de filtros producidos
		 * por la interacción del usuario con el dashboard (los gráficos).
		 */
		clsPilaFiltros : function(idTagPilaFiltros) {
			//Implementacion de Patron Singleton
			if (GENDOMUS.GENLIBRARY.clsPilaFiltros.singleInstance)
				return GENDOMUS.GENLIBRARY.clsPilaFiltros.singleInstance;
			var that = this;
			GENDOMUS.GENLIBRARY.clsPilaFiltros.singleInstance = that;
			//Lista de filtros almacenados
			filters = [];
			idPilaFiltros = idTagPilaFiltros;

			/**
			 * Agregar un filtro a la pila de filtros y grafica visualmente un <li> dentro de la
			 * <ul id="idPilaFiltros"> con id provisto de la pila
			 * @param filterObject Objeto del tipo "clsFilter"
			 */
			that.addFiltro = function(filterObject) {
				//Agregamos el HTML a la Pila de Filtros. Para lo cual comprobamos duplicidad (si
				//ya existe un filtro con el mismo parámetro). Si hay duplicidad, reemplazamos
				//los valores ya presentes, caso contrario agregamos un nuevo filtro al final de la lista.
				var isDuplicado = false;
				for (var i = 0; i < filters.length; i++) {
					if (filters[i].key == filterObject.key) {
						isDuplicado = true;
						filters[i].value = filterObject.value;
						document.querySelector("#filterList #"+filterObject.key+" .valorFiltro").innerHTML = filterObject.value;
						break;
					}
				}
				if (isDuplicado === false) {
					//Agrego un nuevo filtro al stack
					$(idPilaFiltros).append('<li><div id="' + filterObject.key + '" class="fondoGradado filtro"><div class="item">' + filterObject.key + '</div><div class="item"><span class="valorFiltro">' + filterObject.value + '</span></div><div class="item"><div class="btnRemove"></div></div></div></li>');
					//Agrego el filtro al array de filtros
					filters.push(filterObject);
				}
			};
			/**
			 * Eliminar un filtro de la pila de filtros.
			 */
			this.deleteFiltro = function() {
			};
		}
	},
	GLOBAL : {
		ClsParametro : function(clave, valor) {
			this.clave = clave;
			this.valor = valor;
		},
		ClsParametros : function() {
			if (GENDOMUS.GLOBAL.ClsParametros.singleInstance)
				return GENDOMUS.GLOBAL.ClsParametros.singleInstance;
			var that = this;
			GENDOMUS.GLOBAL.ClsParametros.singleInstance = that;
			parameters = [];

			that.addParameter = function(parametro) {
				//No puede existir parametros duplicados (respecto a la clave)
				var isDuplicado = false;
				for (var i = 0; i < parameters.length; i++) {
					if (parameters[i].clave == parametro.clave) {
						isDuplicado = true;
						//Al encontrarse duplicado solo reemplazo su valor y su clave se mantiene
						parameters[i].valor = parametro.valor;
						break;
					}
				}
				if (isDuplicado == false) {
					//ingreso al parametro como nuevo
					parameters.push(parametro);
				}
			};
			that.getParametros = function() {
				return parameters;
			};
			that.toString = function() {
				var resultado = "";
				if (parameters) {
					for (var i = 0; i < parameters.length; i++) {
						resultado += parameters[i].toSource();
					}
				} else {
					console.log("lista de parametros UNDEFINED");
				}
				return resultado;
			};
			that.getParameterByKey = function(clave) {
				for (var i = 0; i < parameters.length; i++) {
					if (parameters[i].key == clave) {
						return parameters[i].valor;
					}
				}
			};
			that.removeParameterByKey = function(key) {
				var indice = -1;
				var encontrado = false;
				for (var i = 0; i < parameters.lenght; i++) {
					if (parameters[i].key == clave) {
						indice = i;
						isEncontrado = true;
						break;
					}
				}
				if (isEncontrado == true && indice != -1) {
					//remuevo el filtro de la lista y actualizo la lista
					parameters = parameters.splice(i, 1);
				}
			};
		},
		ClsSelectHandler : function() {
			var parametros = new GENDOMUS.GLOBAL.ClsParametros();
			//Llamar a Servicio Web para obtener datos
			console.log('Contenedor: ' + this.idContenedor + ', invoca WS con parametros: SELECT (' + this.variablePrincipal + ' vs ' + this.variableSecundaria + ') WHERE ' + parametros.toString());

		}
	}
};
