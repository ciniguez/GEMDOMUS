$(document).ready(function() {
	//LECTURA JSON
	$.getJSON("largeLoad.json").done(function(json) {
		//obtener un valor
		//console.log("JSON Data:" + json.filas[0].value);

		//Iteracion del json
		$.each(json.filas, function(i, obj) {
			$('#resultados').append("<p> name: " + obj.name + " allowance:" + obj.allowance + "</p>");
		});

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("reQuest Failed: " + err);
	});
});

var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants',
function($scope, $http, uiGridConstants) {
	var today = new Date();
	var nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 7);

	$scope.highlightFilteredHeader = function(row, rowRenderIndex, col, colRenderIndex) {
		if (col.filters[0].term) {
			return 'header-filtered';
		} else {
			return '';
		}
	};

	$scope.gridOptions = {
		enableFiltering : true,
		onRegisterApi : function(gridApi) {
			$scope.gridApi = gridApi;
		},
		columnDefs : [
		// default
		{
			field : 'name',
			headerCellClass : $scope.highlightFilteredHeader
		}, {
			field : 'allowance',
			headerCellClass : $scope.highlightFilteredHeader
		}, {
			field : 'paid',
			headerCellClass : $scope.highlightFilteredHeader
		}]
	};

	$http.get('largeLoad.json').success(function(data) {
		$scope.gridOptions.data = data;
		//$scope.gridOptions.data[0].age = -5;
	});

	$scope.toggleFiltering = function() {
		$scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
		$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
	};
}]);
