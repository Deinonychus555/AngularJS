// templateUrl: 'view4.html'

function HashProvider() {

  var _algoritmo="";

  

  this.setAlgoritmo=function(algoritmo) {

    _algoritmo=algoritmo;

  };

  

  this.$get=function() {

    var hashFunction;

  

    if (_algoritmo==="MD5") {

      hashFunction=CryptoJS.MD5;

    } else  if (_algoritmo==="SHA-1") {

      hashFunction=CryptoJS.SHA1;

    } else  if (_algoritmo==="SHA-2-256") {

      hashFunction=CryptoJS.SHA256;

    } else  if (_algoritmo==="SHA-2-512") {

      hashFunction=CryptoJS.SHA512;

    } else {

      throw Error("El tipo de algoritmo no es válido:"+_algoritmo);

    }

  

    var hash=function(message) {

      var objHashResult=hashFunction(message);

      

      var strHashResult=objHashResult.toString(CryptoJS.enc.Base64);

    

      return strHashResult;

    }

  

    return hash;

  }

}


 // Esta función actuará como filtro, acepta dos parámetros, el primero
 //que es necesario y que representa el valor que iteara en un ng-repeat y está ímplicito
 // y el segundo que se pasará explicitamente a la función. 
function mayusculasFilter(valor,length) {

  

  if (typeof (valor)==="string") {

    

    if (angular.isNumber(length) && length>=0) {

      return valor.substr(0,length).toUpperCase()+valor.substr(length);

    } else {

      return valor.toUpperCase();

    }

    

    

  } else if (angular.isArray(valor)) {

    var newValue=[];

    

    for(var i=0;i<valor.length;i++) {

      if (typeof (valor[i])==="string") {

        if (angular.isNumber(length) && length>=0) {

          newValue.push(valor[i].substr(0,length).toUpperCase()+valor[i].substr(length));

        } else {

          newValue.push(valor[i].toUpperCase());

        }

      } else {

        newValue.push(valor[i]);

      }

    }

    

    return newValue;

  } else {

    return valor;

  }

}


var app=angular.module("modulePassword",[])

.constant("algoritmo","SHA-1")


// El servicio provider devuelve una función como el factory, pero dicha función se puede
//'configurar', llamandola previamente en el bloque 'config'.
// El servicio provider devuelve una función como el factory, pero dicha función se puede
// El servicio provider se pueden inyectar en bloques config.
// Es buena práctica implementar el código de la función fuera del 'provider'.
//.provider("nombre_de_la_variable_creada", Función_constructora)
.provider("hash",HashProvider)

// En el bloque config se pueden inyectar servicios 'provider' y 'constant'.
.config(["hashProvider","algoritmo",function(hashProvider,algoritmo) {

  hashProvider.setAlgoritmo(algoritmo);

}])

.controller("controllerPassword",["$scope",'$routeParams',"hash","$location",function($scope,$routeParams,hash,$location) {

    $scope.param4=$routeParams.var4;
    

  $scope.toIndex = function(){
        // Para enviar a una vista.
        $location.url('/');
        //$location.path('/');
    };

  $scope.password="s3cret";

  $scope.getHash=function(message) {

    var hashResult=hash(message);

    return hashResult;

  }

   $scope.valorEscalar="hola mundo";
   $scope.valorArray=['lunes','martes',3.1416,'miercoles','jueves'];

}])


// Con el servicio 'filter' creamos un filtro  devolviendo una función. 
.filter("mayusculas",['$log',function ($log) {

  $log.log("Creando el filtro");

  return mayusculasFilter;

}])