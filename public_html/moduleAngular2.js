// Configuración de un módulo.
// angular.module("nombre_del_modulo", ['ngRoute', "modulo3", dependenia1", "dependencia2","..."])
var auxiliar = angular.module("moduleAuxiliar", ['ngRoute']) // ¡NO se pone ';' al final!


.factory("factoria_provincias",function(){

    var factory={};
    var provincias=[
                    {
                      idProvincia:2,
                      nombre:"Jaen",
                      ciudades:[
                           {
                            idCiudad:12,
                            nombre:"Albanchez"
                          },
                          {
                            idCiudad:13,
                            nombre:"Baeza"
                          }
                      ]
                    },
                    {
                      idProvincia:3,
                      nombre:"Alicante",
                      ciudades:[
                           {
                            idCiudad:6,
                            nombre:"Torrevieja"
                          },
                          {
                            idCiudad:9,
                            nombre:"La Mata"
                          }
                      ]
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
                    },
                    {
                      idProvincia:6,
                      nombre:"Madrid",
                      ciudades:[
                           {
                            idCiudad:1,
                            nombre:"Mostoles"
                          },
                          {
                            idCiudad:7,
                            nombre:"Alcorcon"
                          }, 
                          {
                            idCiudad:5,
                            nombre:"Getafe"
                          },
                          
                      ]
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
    
    
    //=========================================================================================
    // ** MENÚ SELECT QUE DEPENDE DE OTRO MENÚ SELECT
    
    // <select name="sProvincias" ng-options:"...track by provincias.nombre">
    $scope.selectValue=null; 
    
    // <select name="sProvincias" ng-options:"...for provincia in provincias...">
    $scope.provincias=factoria_provincias.get();
    // <select name="sProvincias" ng-options:"...for ciudad in ciudades...">
    $scope.ciudades=null;
    
    // <select name="sProvincias" ng-model="provinciaSeleccionada">     
    $scope.provinciaSeleccionada=null;
    // <select name="sCiudades" ng-model="ciudadSeleccionada"> 
    $scope.ciudadSeleccionada=null;
    
   
    // <select name="provincias" ng-change="insertarCiudades()">
    $scope.insertarCiudades=function(){
        
        $scope.ciudades=null;
        $scope.ciudadSeleccionada=null;
        
        $scope.ciudades=$scope.provinciaSeleccionada.ciudades;
        
        // En los formularios se puede 'navegar' utilizando sus propiedades  
        //o con los valores de sus campos 'name'. 
        
        $scope.selectValue=window.document.forms[0].elements[0].value;
        
        //var indice=window.document.forms[0].elements[0].selectedIndex - 1; // Existe una primera opción vacía
       
        /* // Funciona:
        var indice=window.document.fProvincias.sProvincias.selectedIndex - 1;
        $scope.ciudades=$scope.provincias[indice].ciudades;
        */
        
        
     }    
    //=========================================================================================
    
        $scope.toHome = function(){
        // para cargar una vista
        $location.url('/a');
    };

    // La variable 'nombre_constante' es una constante definida en 'moduleAngular'-
    $scope.constante=nombre_constante;
    
    // La variable 'matematicas_simples' es un valor definido en 'moduleAngular'-
    $scope.value=matematicas_simples.restar(5,4);

    // La variable 'rectangulo' es un objeto instanciado en 'moduleAngular'-
    $scope.service=rectangulo.to_s();


    $scope.auxiliar="Estas haciendo uso del controlador de un módulo auxiliar."

    

    //$timeout: Servicio para actualizar la vista al actualizar el modelos. 
    //fn: La función a llamar cuando acaba el timeout
    //tiempo: El tiempo en milisegundos que debe pasar para que se llame a la función.
    $timeout(function(){
        $scope.producidoEvento="SIIIIIIIIIII";
    },3000)

}]) // ¡NO se pone ';' al final!

