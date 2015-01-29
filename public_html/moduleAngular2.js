// Configuración de un módulo.
// angular.module("nombre_del_modulo", ['ngRoute', "modulo3", dependenia1", "dependencia2","..."])
var auxiliar = angular.module("moduleAuxiliar", ['ngRoute']) // ¡NO se pone ';' al final!


.factory("factoria_provincias",function(){

    var factory={};
    var provincias=[
                    {
                      idProvincia:2,
                      nombre:"Castellón"
                    },
                    {
                      idProvincia:3,
                      nombre:"Alicante"
                    },
                    {
                      idProvincia:1,
                      nombre:"Valencia"
                    },
                    {
                      idProvincia:7,
                      nombre:"Teruel"
                    }, 
                    {
                      idProvincia:5,
                      nombre:"Tarragona"
                    }
                  ];

    factory.get=function(){return provincias} ;

    return factory;             

})


.controller("controllerAuxiliar",['$scope',"$routeParams",'$filter','$location','$timeout','nombre_constante','matematicas_simples','rectangulo',"factoria_provincias",
    function($scope,$routeParams,$filter,$location,$timeout,nombre_constante,matematicas_simples,rectangulo,factoria_provincias){

    var filtroCurrency=$filter("currency");
    $scope.importeFormateado=filtroCurrency(2.5231);
    
    // Con el servicio $routeParams accedemos a los parámetros que se pasan por la url.
    $scope.param2=$routeParams.var2;
    

    $scope.provincias=factoria_provincias.get();
    $scope.provinciaSeleccionada=null;


    // La variable 'nombre_constante' es una constante definida en 'moduleAngular'-
    $scope.constante=nombre_constante;
    
    // La variable 'matematicas_simples' es un valor definido en 'moduleAngular'-
    $scope.value=matematicas_simples.restar(5,4);

    // La variable 'rectangulo' es un objeto instanciado en 'moduleAngular'-
    $scope.service=rectangulo.to_s();


    $scope.auxiliar="Estas haciendo uso del controlador de un módulo auxiliar."

    $scope.toHome = function(){
        // para cargar una vista
        $location.url('/a');
    };

    //$timeout: Servicio para actualizar la vista al actualizar el modelos. 
    //fn: La función a llamar cuando acaba el timeout
    //tiempo: El tiempo en milisegundos que debe pasar para que se llame a la función.
    $timeout(function(){
        $scope.producidoEvento="SIIIIIIIIIII";
    },3000)

}]) // ¡NO se pone ';' al final!

