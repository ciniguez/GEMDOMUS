/**
 * Funcion que representa la lista de filtros.
 * Objetivo: Gestionar el almacenamiento de filtros producidos
 * por la interacción del usuario con el dashboard (los gráficos).
 */
var ClassPilaFiltros = function() {
	//Implementacion de Patron Singleton
	if (ClassPilaFiltros.singleInstance)
		return ClassPilaFiltros.singleInstance;
	ClassPilaFiltros.singleInstance = this;
	//Lista de filtros almacenados
	this.filters=[];
	
	/**
	 * Agregar un filtro a la pila de filtros
	 */
	this.addFiltro= function(filterObject){
		filters.push(filterObject);
		//Agregamos el HTML a la Pila de Filtros. Para lo cual comprobamos si
		//ya existe un filtro con referido al mismo parámetro. Si existe, lo reemplazamos,
		//caso contrario creamos uno nuevo al final de la lista.
		for(var i= 0;i<this.filters.lenght; i++){
			if(this.filters[i].variablePrincipal == filterObject.variablePrincipal){
				//TO DO aquí hacer la comparación
			}
		}
		$("#filterList").append('<li><div class="fondoGradado filtro"><div class="item">Chromosome</div><div class="item">'+parametros.cromosoma +'</div><div class="item"><div class="btnRemove"></div></div></div></li>');
		
	};
	/**
	 * Eliminar un filtro de la pila de filtros.
	 */
	this.deleteFiltro=function(){};
	
};
