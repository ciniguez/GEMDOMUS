/**
 * Implementacion de una clase en base a los
 * gráfico de Google Chart.
 */
function ClassGrafico(data, options, idContenedor) {
	var that = this;
	that.data = data;
	that.opcionesGoogle = {"title": options.title, "width":options.width, "height":options.height};
	that.idContenedor = idContenedor;
	that.graficoGoogle = new google.visualization.PieChart(document.getElementById(that.idContenedor));
	that.variablePrincipal = options.variablePrincipal;
	that.variableSecundaria = options.variableSecundaria; 

	that.dibujar = function() {
		//Suscribir Objeto (ClassGrafico) para futuros eventos
		var observer = new ClassObserverSingleton();
		observer.subscribe(that);
		//Agregar evento select, para lanzar un evento al seleccionar cualquier region del grafico
		google.visualization.events.addListener(that.graficoGoogle, 'select', handler);
		//dibujar el gráfico
		that.graficoGoogle.draw(that.data, that.opcionesGoogle);
	};
	function handler(){
		//Llamamos a la instancia del Suscriptor (Patron Observer)
		var observer = new ClassObserverSingleton();
		//suscribimos el grafico
		observer.fire(that.graficoGoogle.getSelection(), that);
	}

	that.eliminar = function() {
	};
}

function ParametrosSingleton() {
	if (ParametrosSingleton.singleInstance)
		return ParametrosSingleton.singleInstance;
	ParametrosSingleton.singleInstance = this;
	this.cromosoma = 0;
	this.alelo = 0;
	this.referencia = 0;
	this.filtro = 0;
}

function selectHandler() {
	var parametros = new ParametrosSingleton();
	var url = "En " + this.idContenedor + " cosulto : chr:" + parametros.cromosoma + " |alelo:" + parametros.alelo + "|REF: " + parametros.referencia;
	if (this.idContenedor == "grap0") {
		console.log(url);
	}
	if (this.idContenedor == "grap1") {
		console.log(url);
	}
	if (this.idContenedor == "grap2") {
		console.log(url);
	}
}