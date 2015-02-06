// templateUrl: 'view3.html'

var app=angular.module("moduleSeguro",[])
   
.controller("controllerSeguro",['$scope','$routeParams','$log','$http','$location',function($scope,$routeParams,$log,$http,$location) {
  
  $scope.param3=$routeParams.var3;
  

  $scope.seguro={
    nif:"",
    nombre:"",
    ape1:"",
    edad:undefined,
    sexo:"",
    casado:false,
    numHijos:undefined,
    embarazada:false,
    coberturas: {
      oftalmologia:false,
      dental:false,
      fecundacionInVitro:false
    },
    enfermedades:{
      corazon:false,
      estomacal:false,
      rinyones:false,
      alergia:false,
      nombreAlergia:""
    },
    fechaCreacion:new Date()
  }
   
  $log.debug("Acabamos de crear el $scope");
 
  $scope.toIndex = function(){
        // Para enviar a una vista.
        $location.url('/');
        //$location.path('/');
    };

  $http({
    method: 'GET',
    url: 'datos.json'
  }).success(function(data, status, headers, config) {
      $scope.seguro=data;
  }).error(function(data, status, headers, config) {
      alert("Ha fallado la petición. Estado HTTP:"+status);
  });
   
}]);