/**
 * Controlador de la pagina Carga Datos
 * @author Carlos Iniguez 2016
 */
function CtrlCargaDatos(urlAnalisisWebService, urlWebServiceDataSource) {
	var that = this;
	//Variable necesaria para saber si se pulso un boton select all
	that.boolSelectAll = false;
	that.arraySamplesSeleccionados = new Array();
	that.arrayDataSourcesSeleccionados = new Array();

	//Cargar datos del proyecto
	$('#lblNombreProyecto').text("Proyecto Manhatan");
	$('#lblDescripcion').text("Lorem Ipsum es simplemente el texto de relleno de " + "las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar " + "de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) " + "desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. " + "No sólo sobrevivió 500 años");

	//Consulto los datos de Lista de Analisis y lleno la lista
	Modelo.Sample.get(cargarListaAnalisisDatos);


	//Consulto los datos de Lista de DataSources y lleno la lista
	Modelo.Datasource.get(cargarListaDataSourcesDatos);

	/**
	 *Asignacion de acciones de boton.
	 * Debe ser puesto aquí debido a que se DEBE RESPETAR el ORDEN de GENERACION
	 */
	$('.btnToogle').change(function() {
		//console.log(that.boolSelectAll + " id:"+ $(this).attr("id") );
		if (that.boolSelectAll === false) {
			if ($(this).attr("id").startsWith("btnSrc")) {
				console.log($(this).attr("id") + " " + $(this).prop('checked'));

				that.arrayDataSourcesSeleccionados.length = 0;
				that.arrayDataSourcesSeleccionados.push($(this).attr("id").split("_")[1]);
				Modelo.Dadtasource.send(that.arrayDataSourcesSeleccionados, $(this).prop('checked'));
			}
			if ($(this).attr("id").startsWith("btnSample")) {
				that.arraySamplesSeleccionados.length = 0;
				that.arraySamplesSeleccionados.push($(this).attr("id").split("_")[1]);
				Modelo.Sample.send(that.arraySamplesSeleccionados, $(this).prop('checked'));
			}
		}
	});
	/**
	 * Accion Clic para cualquier boton del tipo "Select All/Deselect All"  de contenedor
	 * AnalisisList-container (webComponent).
	 * Se cambia el chek de cada elemento dentro del grupo al que hace referencia "Select All/Deselect All"
	 * Se envia los elementos seleccionados al servidor para que ejecutar creacion, eliminacion o actualizacion.
	 */
	$('#AnalisisList-container .btnSelectAll').click(function() {
		that.boolSelectAll = true;
		banderaON = false;

		if ($(this).text() == "Select All") {
			$(this).text("Deselect All");
			$("#" + $(this).parent().attr("id") + " .btnToogle").bootstrapToggle('on');
			banderaON = true;
		} else {
			$(this).text("Select All");
			$("#" + $(this).parent().attr("id") + " .btnToogle").bootstrapToggle('off');
		}
		//Obtengo los ids de  DataSources
		that.arraySamplesSeleccionados.length = 0;
		$("#AnalisisList-container .btnToogle").each(function(index) {
			that.arraySamplesSeleccionados.push($(this).attr("id").split("_")[1]);
		});
		Modelo.Sample.send(that.arraySamplesSeleccionados, banderaON);
		that.boolSelectAll = false;
	});
	/**
	 * Accion Clic para cualquier boton del tipo "Select All/Deselect All"  de contenedor
	 * DatasourcesList-container (webComponent).
	 * Se cambia el chek de cada elemento dentro del grupo al que hace referencia "Select All/Deselect All"
	 * Se envia los elementos seleccionados al servidor para que ejecutar creacion, eliminacion o actualizacion.
	 */
	$('#DatasourcesList-container .btnSelectAll').click(function() {
		that.boolSelectAll = true;
		banderaON = false;
		if ($(this).text() == "Select All") {
			$(this).text("Deselect All");
			$("#DatasourcesList-container .btnToogle").bootstrapToggle('on');
			banderaON = true;

		} else {
			$(this).text("Select All");
			$("#DatasourcesList-container .btnToogle").bootstrapToggle('off');
		}
		//Obtengo los ids de  DataSources
		that.arrayDataSourcesSeleccionados.length = 0;
		$("#DatasourcesList-container .btnToogle").each(function(index) {
			that.arrayDataSourcesSeleccionados.push($(this).attr("id").split("_")[1]);
		});
		Modelo.Dadtasource.send(that.arrayDataSourcesSeleccionados, banderaON);
		that.boolSelectAll = false;
	});

}

/**
 * Por cada Analisis indicado en la lista de Analisis, se agrega un h2 con los datos del analisis.
 * Requiere respetar los nombres de los tags de html.
 * @param listaAnalisis Lista de analisis (formato sugerido desde servidor)
 */
function cargarListaAnalisisDatos(listaAnalisis) {
	for (var i = 0; i < listaAnalisis.length; i++) {
		var analisis = listaAnalisis[i];
		var samplesList = listaAnalisis[i].samples;

		$("#idScript1").append('<h2><div class="accordion-seccion"><span class="titulo">' + analisis.name + '</span><span class="gdm-cantidad">' + analisis.size + ' samples</span></div></h2>');
		$("#idScript1").append("<div id=analisis_" + analisis.id + "></div>");
		$("#idScript1 #analisis_" + analisis.id).append('<span class="btnSelectAll"><a href="#">Select All</a></span>');
		$("#idScript1 #analisis_" + analisis.id).append('<ul id="gmd-list-samples"></ul>');
		for (var s = 0; s < samplesList.length; s++) {
			var sample = samplesList[s];
			console.log(sample.variants);
			var html = '<li><div class="gdm-item-list"><span class="titulo">' + sample.description + '</span><span class="gdm-cantidad"><input id="btnSample_' + sample.id + '" class="btnToogle" data-toggle="toggle" type="checkbox"></span></div></li>';
			$('#idScript1 #analisis_' + analisis.id + ' ul').append(html);
			//Asignar el estipo de boton bootstrap al nuevo boton. Si no se hace esto se visualiza un checkbox!!
			$('#btnSample_' + sample.id).bootstrapToggle();
		}

	}
}

/**
 * Por cada DataSource indicado en la lista de DataSources, se agrega un h2 con los datos del datasource.
 * Requiere respetar los nombres de los tags de html.
 * @param listaDataSources Lista de datasources (formato sugerido desde servidor)
 */
function cargarListaDataSourcesDatos(listaDataSources) {
	if (listaDataSources.length < 0) {
		//Boton select All
		$('#DatasourcesList-container .btnSelectAll').hide();
	}

	//Por cada elemento, se creará un "li" que contendra la informacion del datasource
	for (var i = 0; i < listaDataSources.length; i++) {

		//crear un <li>
		$("#DatasourcesList-container ul").append('<li id="ds_' + listaDataSources[i].id + '"></li>');
		// dentro de <li> crear <div>
		$("#ds_" + listaDataSources[i].id).append('<div class="gdm-item-list"></div>');
		//dentro de <div> crear dos <span>
		$("#ds_" + listaDataSources[i].id + "  div").append('<span class="titulo">' + listaDataSources[i].name + '</span>');
		$("#ds_" + listaDataSources[i].id + "  div").append('<span class="gdm-cantidad"><input id="btnSrc_' + listaDataSources[i].id + '" class="btnToogle" data-toggle="toggle" type="checkbox"></span>');

		//Asignacion de clases de estilos
		$("#ds_" + listaDataSources[i].id + " div").addClass("gdm-item-list");
		//Asignar el estipo de boton bootstrap al nuevo boton. Si no se hace esto se visualiza un checkbox!!
		$('#btnSrc_' + listaDataSources[i].id).bootstrapToggle();
	}

}

var Modelo = {

	Sample : {
		urlSend : 'http://158.42.185.198:8080/sendselectionsamples',
		urlGet : 'http://158.42.185.198:8080/getanalysis2',
		/**
		 * Envia los Samples seleccionados al Servidor par que marquen como seleccionados/deseleccionados
		 * @param arryObj Array de Objetos de tipo {k}
		 * @param booleanTipoOperacion TRUE inserta en servidor, FLASE, elimina del servidor
		 */
		send : function(arrayObj, booleanTipoOperacion) {
			console.log("Enviando lista de Samples:" + JSON.stringify(arrayObj) + " bandera:" + booleanTipoOperacion);

			//Envío el sample seleccionado al servidor
			$.ajax({
				url : Modelo.Sample.urlSend,
				type : 'POST',
				data : JSON.stringify(arrayObj),
				async : true,
				dataType : "json",
				contentType : "application/json",
				beforeSend : function(xhr) {
					console.log('antes de envio');
				},
				error : function(xhr, status, error) {
					console.log("error: " + error + " status:" + status + " xhr: " + xhr);
				}
			}).done(function(data) {
				console.log(data);
			});

		},
		/**
		 * Obtener Resultados
		 * @param fn Función CallBack que se ejecutará una vez se han obtenido los resultados
		 */
		get : function(fn) {
			$.ajax({
				url : Modelo.Sample.urlGet,
				tye : 'GET',
				async : false,
				dataType : "json",
				beforeSend : function(xhr) {
					//console.log('antes de envio');
				}
			}).done(function(data) {
				fn(data);
			});
		}
	},
	Datasource : {
		urlSend : 'http://158.42.185.198:8080/sendselectiondatasources',
		urlGet : 'http://158.42.185.198:8080/getdatasources',

		/**
		 * Envia los DataSources seleccionados al Servidor par que marquen como seleccionados/deseleccionados
		 * @param arryObj Array id correspondientes a los Datasources seleccionados. Ej.{1,2,3,4,...}
		 * @param booleanTipoOperacion TRUE inserta en servidor, FLASE, elimina del servidor
		 */
		send : function(arrayObj, booleanTipoOperacion) {
			console.log("Enviando lista de Samples:" + JSON.stringify(arrayObj) + " bandera:" + booleanTipoOperacion);

			//Envío el sample seleccionado al servidor
			$.ajax({
				url : ModeloDatasource.urlSend,
				type : 'POST',
				data : JSON.stringify(arrayObj),
				async : true,
				dataType : "json",
				contentType : "application/json",
				beforeSend : function(xhr) {
					console.log('antes de envio');
				}
			}).done(function(data) {
				console.log(data);
			});
		},
		/**
		 * Obtener Resultados
		 * @param fn Función CallBack que se ejecutará una vez se han obtenido los resultados
		 */
		get : function(fn) {
			//Consulto los datos de Lista de DataSources y lleno la lista
			$.ajax({
				url : Modelo.Datasource.urlGet,
				tye : 'GET',
				async : false,
				dataType : "json",
				beforeSend : function(xhr) {
					//console.log('antes de envio');
				}
			}).done(function(data) {
				fn(data);
				//cargarListaDataSourcesDatos(data);
			});
		}
	}
};
