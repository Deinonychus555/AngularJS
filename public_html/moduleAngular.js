
// ¡IMPORTANTE!: Todas las variables pertenecientes del scope deben declararse con el prefijo '$scope.'.
     
     
     
function Rectangulo(tamanyoInicial) {
  this.ancho=tamanyoInicial.ancho;
  this.alto=tamanyoInicial.alto;
   
  this.setAncho=function(ancho) {
    this.ancho=ancho;
  }
   
  this.setAlto=function(alto) {
    this.alto=alto;
  } 
   
  this.getArea=function() {
    return this.ancho * this.alto;
  }

  this.to_s=function() {
    return "Soy un rectangulo de "+this.ancho+" de ancho y "+this.alto+" de alto.";
  }
}

// Configuración de un módulo.
// La librería 'ngRoute' es para añadir rutas al $routeProvider
// La librería 'ngSanitize' es necesaria para la directiva 'ng-bind-html'.
//¡¡ Al añadir modulos y librerías, asegurarse que se ha insertado el módulo en el html principal!! -->
// angular.module("nombre_del_modulo", ['ngRoute', "modulo3", dependenia1", "dependencia2","..."])
var an = angular.module("moduleAngular", ['ngRoute','ngSanitize','moduleAuxiliar','moduleSeguro','modulePassword']) // ¡NO se pone ';' al final!


.value("appName","Variable global a todos los controladores")
// ng-css
 .value("css",{rosa:false,subrayado:false,negrita:false})
 
// ng-bind
.value("libreria1","http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js")
.value("libreria2","http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-route.js")
    
// ng-src
.value("nombre_imagen","AngularJS-large.png")
    
// ng-href
.value("ref1","http://www.cursoangularjs.es/doku.php")
.value("ref2","https://docs.angularjs.org/api")



   

// El bloque run es una función que se ejecuta al iniciar un programa en AngularJS.  
// Es buena práctica pasar constantes a bloques 'run' y 'config' a través de servicios
// 'value' o 'constant'.
.run(['$rootScope','$filter','appName','libreria1','libreria2','css','nombre_imagen','ref1','ref2',
    function($rootScope,$filter,appName,libreria1,libreria2,css,nombre_imagen,ref1,ref2) {
  
  // $rootScope será accesible por todos los controladores.
 
  $rootScope.appName=appName;
  $rootScope.libreria1=libreria1;
  $rootScope.libreria2=libreria2;
  $rootScope.css=css;
  $rootScope.nombre_imagen=nombre_imagen; 
  $rootScope.ref1=ref1;
  $rootScope.ref2=ref2;
  $rootScope.date=new Date();

  var filtroDate=$filter("date");
  $rootScope.fechaFormateada=filtroDate(new Date(),'yyyy MMM dd ');
}])


// El servicio 'filter' permite crear un filtro
// input es lo que recibe el filtro
.filter('dateFormat', function($filter)
    {
     return function(input)
     {
      if(input == null){ return ""; } 

      var _date = $filter('date')(new Date(input), 'dd MM yyyy');

      return _date.toUpperCase();

     };
})



// Configuración de una factoría.
// El servicio factory devuelve el resultado de una función.
// .factory('nombre_de_la_factoría', function(...){} )
.factory('factoryAngular', function(){
// Sería mejor declarar el código de la función fuera

                                // Declaración de variables locales haciendo uso de 'var'.
                                var factory={};

                                var customers=[
                                                {firstName:'Vanesa', lastName: 'Tumaca', city: 'Sevilla', age:23},
                                                {firstName:'Paco', lastName: 'Gomez', city: 'Madrid', age:23},
                                                {firstName:'Elena', lastName: 'de la Torre', city: 'Avila', age:23},
                                                {firstName:'Elena', lastName: 'Amores', city: 'Toledo', age:23},
                                                {firstName:'Elena', lastName: 'Pajares', city: 'Jaen', age:23},
                                                {firstName:'Paula', lastName: 'Noviciados', city: 'Granada', age:23},
                                                {firstName:'María', lastName: 'Estepona', city: 'Malaga', age:23},
                                                {firstName:'Manolo', lastName: 'Pantojo', city: 'Coruña', age:23},
                                                {firstName:'Amanda', lastName: 'Betusta', city: 'Almeria', age:23}
                                            ];

                                factory.getCustomers= function(){

                                    return customers;
                                };

                                factory.addCustomer= function (fn,ln,c,a){

                                    customers.push({firstName:fn,lastName:ln,city:c,age:a});
                                }


                                return factory;                
                            }) // ¡NO se pone ';' al final!

// Con el servicio 'constant' creamos una constante.
// El servicio constant se pueden inyectar en bloques config y en provider.
//.constant("nombre_variable_creada",valor)
.constant("nombre_constante","Valor constante")

// El servicio 'value' es similar al 'constant' pero NO se puede pasar a los bloques config ni provider.
//.value("nombre_variable_creada",valor)
.value("matematicas_simples",{
  sumar:function(a,b) {
    return a+b;
  },
  restar:function(a,b) {
    return a-b;
  }
})


.value("tamanyoInicialRectangulo",{
  ancho:2,
  alto:3
})
 


// El servicio 'service' es para instanciar alguna clase para ello le deberemos pasar
//dicha clase (función constructora), para crear el objeto. 
//.service("nombre_variable_creada",['nombre_argumento_necesario_para_constructor',Función_constructora])
.service("rectangulo",['tamanyoInicialRectangulo',Rectangulo])


// Configuración de un controlador.
// .controller("nombre_del_controlador", [..., function($scope,...){} ])
// Se pasa al array lo mismo que se le pasa a la función y en el mismo orden.
// Pasaremos como argumentos de la función todas las variables de entorno que vayamos
//a utilizar ($variable)
// $scope: servicio donde inyectaremos nuestras variables y métodos.
// $location: para redireccionar vis.tas
// $http: servicio  permite hacer peticiones AJAX al servidor. 
// $http acepta como parámetro un único objeto llamado config con todas las propiedades que necesita para la petición. 
// $log: Este servicio simplemente llama a console.
.controller("controllerAngular",['$scope',"$routeParams",'$location','$log','$http','$timeout','factoryAngular','nombre_constante','matematicas_simples','rectangulo',
    function($scope,$routeParams,$location,$log,$http,$timeout,factoryAngular,nombre_constante,matematicas_simples,rectangulo) {

 $scope.nombre_imagen2="AngularJS-large.png";
     
    // Todas las variables iran con el prefijo '$scope.'

    $scope.texto={prueba:"Mensaje de prueba"};
   
   // Para hacer pruebas con el servicio 'service'.
    $scope.rectangulo=rectangulo;
    
    $scope.date2=new Date();

    // Para hacer pruebas con el servicio 'directive'.
    $scope.mensaje= "Mensaje desde el scope del controlador";

    // ng-bin-html
    $scope.texto_con_etiquetas= "Hola <strong>Mundo</strong>";

    // 'nombre_constante' definido en el servicio 'constant'.
    $scope.constante=nombre_constante

    // Función definida en el servicio 'value'.
    $scope.value=matematicas_simples.sumar(4,4);
    
    var hasError=function(campo){
        var error=false;
        var errores=eval("$scope.miFormulario."+campo+".$error");
        for (tipo in errores){
            error+=errores[tipo];
        }
        
        return error;
    }
    
    // Para los data-mi-validacion-*
    $scope.validacionEdad=false;
    $scope.validarEdad=function(){
        if(hasError("age")){
            $scope.validacionEdad=true;
        }
        else{
            $scope.validacionEdad=false;
        }    
    }
    
    
    
    $scope.validacionNombre=false;
    $scope.validarNombre=function(){
        if(hasError("first_name")){
            $scope.validacionNombre=true;
        }
        else{
            $scope.validacionNombre=false;
        }    
    }
    
    $scope.validacionApellido=false;
    $scope.validarApellido=function(){
        if(hasError("last_name")){
            $scope.validacionApellido=true;
        }
        else{
            $scope.validacionApellido=false;
        }    
    }
    
    $scope.validacionCiudad=false;
    $scope.validarCiudad=function(){
        if(hasError("city")){
            $scope.validacionCiudad=true;
        }
        else{
            $scope.validacionCiudad=false;
        }    
    }
    
    $scope.validacionTelefono=false;
    $scope.validarTelefono=function(){
        if(hasError("telephone")){
            $scope.validacionTelefono=true;
        }
        else{
            $scope.validacionTelefono=false;
        }    
    }
    
    $scope.validacionEmail=false;
    $scope.validarEmail=function(){
        if(hasError("email")){
            $scope.validacionEmail=true;
        }
        else{
            $scope.validacionEmail=false;
        }    
    }

    $scope.validacionUrl=false;
    $scope.validarUrl=function(){
        if(hasError("url")){
            $scope.validacionUrl=true;
        }
        else{
            $scope.validacionUrl=false;
        }    
    }
    
    
    // Se usa para la directiva 'ng-required', para la validación de un formulario.
    $scope.requerido=false;

    // Se usa para la directiva 'ng-pattern', para la validación de un formulario.
    // Hay que poner las barras al principio y al final, SIN COMILLAS
    // Si quieres que la expresión se aplique a todo el valor pon “^” al principio y “$” al final
    
    $scope.pattern=/^[a-zA-Z]*$/;
    $scope.pattern2=/^[0-9]{9}$/;

    $scope.customers=factoryAngular.getCustomers();

    $scope.addCustomer=function(){
        
        if ($scope.miFormulario.$valid){
            factoryAngular.addCustomer($scope.newCustomer.firstName, $scope.newCustomer.lastName, $scope.newCustomer.city, $scope.newCustomer.age);
        }  
        else if ($scope.miFormulario.email.$error.email) {
            window.alert("Email incorrecto");
        }
        else if ($scope.miFormulario.url.$error.url) {
            window.alert("Url incorrecta");
        }
        else if ($scope.miFormulario.city.$error.pattern) {
            window.alert("Ciudad incorrecto");
        }
        else if ($scope.miFormulario.age.$error.number) {
            window.alert("Edad incorrecta");
        }
        else if ($scope.miFormulario.age.$error.required) {
            window.alert("Edad requerida");
        }
        else if ($scope.miFormulario.age.$error.min) {
            window.alert("Tiene que tener 18 años");
        }
    };
 
    // Con el servicio $routeParams accedemos a los parámetros que se pasan por la url.
    $scope.param2=$routeParams.var2;
    $scope.param1=$routeParams.var1;
    $scope.param11=$routeParams.var11;
    $scope.param5=$routeParams.var5;
    $scope.param55=$routeParams.var55;

    // Función para enviar a una vista.
    $scope.toIndex = function(){
        // Para enviar a una vista.
        $location.url('/');
        //$location.path('/');
    };

    // Variable para comprobar un checkbox.
    $scope.marcada=false;

    // Función para deshabilitar algún elemento de entrada de datos.
    $scope.isDisabled=function() {
        return ($scope.marcada===false); // Se comprueba una variable del scope.
    };

    $log.debug("Acabamos de crear el $scope");

    // Configuramos el servicio $http.
    $http({
        // method: El método HTTP para hacer la petición. Sus posibles valores son: GET, POST, PUT, DELETE, etc.
        method:"GET",
        // url: La URL de donde queremos obtener los datos.
        url:"datos2.json"
        //data: Si usamos el método POST o PUT aquí pondremos los datos a mandar en el body de la petición HTTP
        //params: Un objeto que se pondrá como parámetros de la URL.
    })
    // La función success(fn) se utiliza para obtener el objeto JavaScript correspondiente 
    //al String JSON que nos han pasado.
    //data: Un objeto JavaScript correspondiente a los datos JSON que ha recibido
    //status: Es el estado HTTP que ha retornado. Su valor siempre será entre 200 y 299 ya que si se llama a esta función significa que la petición ha tenido éxito.
    //headers:Es una función que acepta como único parámetro el nombre de una cabecera HTTP y nos responde su valor.
    //config: El mismo objeto config que usamos para configurar la petición.
        .success(function(data, status, headers, config) {
          $scope.datos=data; // Ya tenemos la info del json en el scope.
        })
    // La función error(fn) es para poder controlar un error.
        .error(function(data, status, headers, config) {
          alert("Ha fallado la petición. Estado HTTP:"+status);
      });

    // Uso de promesas para llamadas asíncronas.
    $http({
        method:"GET",
        url:"datos2.json"
    })
    .then(function(result){
        $scope.datos=result.data;
        return $http({method: 'GET',url: 'datos2.json'})
    },function(error) {
        alert(error.codError + "," + error.mensajeError);
    })
    .then(function(result) {
        $scope.datos=result.data;
    },function(error) {
        alert(error.codError + "," + error.mensajeError);
    });

    
    //$timeout: Servicio para actualizar la vista al actualizar el modelo. 
    //fn: La función a llamar cuando acaba el timeout
    //tiempo: El tiempo en milisegundos que debe pasar para que se llame a la función.
    $timeout(function(){
        $scope.producidoEvento="SIIIIIIIIIII";
    },3000)



 }]) // ¡NO se pone ';' al final!  


// Un bloque 'config' es una función que definimos en nuestro código, que se ejecutará 
//al iniciar un programa en AngularJS para configurar un provider.
// En el bloque config se pueden inyectar servicios constant y provider.
//.config(['$routeProvider',function($routeProvider){} ])
.config(['$routeProvider',function($routeProvider){
 
    $routeProvider
        .when('/', // ruta que se va a mostrar en el navegador
        {
            controller: 'controllerAngular', // controlador encargado de esa vista
            templateUrl: 'indice.html' // ruta del archivo
        })
        // Con la forma '/:var?' indicamos que la ruta acepta un parámetro optativo.
        .when('/view1/:var1?/:var11?',
        {
            controller: 'controllerAngular',
            templateUrl: 'view1.html'
        })
        .when('/view2/:var2?',
        {
            controller: 'controllerAuxiliar',
            templateUrl: 'view2.html'
        })
        .when('/view3/:var3?',
        {
            controller: 'controllerSeguro',
            templateUrl: 'view3.html'
        })
        .when('/view4/:var4?',
        {
            controller: 'controllerPassword',
            templateUrl: 'view4.html'
        })
        .when('/view5/:var5?/:var55?',
        {
            controller: 'controllerAngular',
            templateUrl: 'view5.html'
        })
        .otherwise({redirectTo:'/'});
}]) // ¡NO se pone ';' al final!


// Con el servicio 'directive' creamos nuestras propias etiquetas o atributos.
// El nombre de la directiva será: 'prefijoNombreNombre2' y en el html tendrá la forma: "data-prefijo-nombre-nombre2"
.directive("miFecha",[function(){

// Propiedades:

    // template : Es un String con el HTML por el que se substituira la directiva. Si está esta propiedad no puede estar templateUrl ya que son excluyentes.
    // templateUrl : Es un String con una URL de un fichero que contiene el HTML por el que se substituira la directiva. Si está esta propiedad no puede estar template ya que son excluyentes.
    // restrict: Un String que indica como puede usarse la directiva si como atributo o como elemento
        // Si vale “E” solo se podrá usar como elemento
        // Si vale “A” solo podrá usarse como atributo
        // Si vale “EA” o “AE” se podrá usar como elemento y como atributo. Este es el funcionamiento por defecto si no se pone nada en la propiedad restrict.
    // replace : Si vale false el contenido del template se añadirá dentro del tag de la propia directiva. Pero si vale true se quitará el tag de la directiva y solo estará el contenido del template.

  var directiveDefinitionObject ={
        restrict:"E",
        replace : false,
        // Las comillas deben estar precedidas de '\'.
        template:"<div >Fecha formateada: {{date | dateFormat}}</div><br>",
        scope:false // indicamos que el scope es el mismo que el del controlador
       
    }
   
    return directiveDefinitionObject;
}])





.directive("miTitulo",[function(){
   var directiveDefinitionObject ={

        restrict:"E",
        replace : true,
        // Las comillas de dentro hay que ponerlas: \".
        template:"<div>Titulo: {{titulo}}</div>",
        // Indicamos que la variable 'titulo' NO pertenece al scope del controlador
        scope:{
            // Al poner texto:”@” lo que le hemos dicho es que el valor del atributo titulo 
            //se copie en la propiedad texto del scope de la directiva.
            titulo:"@"
        },
        
        // La función link se ejecutará al iniciarse la directiva y acepta estos parámetros:
        // scope: Es el scope de nuestra directiva
        //iElement: Es un elemento DOM del tag raiz del template. Está encapsulado como si fuera un elemento de jQuery llamado jqLite
        //iAttrs : Son todos los atributos de se han puesto en la directiva “normalizados” 1).
        //controller: Veremos esta función en la unidad 00_start
        //transcludeFn: Veremos esta función en la unidad 00_start

         link:function(scope, iElement, iAttrs, controller, transcludeFn) {

            var htmlColor;
            switch (iAttrs.color) {
                case "rojo":
                    htmlColor="#FF0000";
                    break;
                case "verde":
                    htmlColor="#00FF00";
                    break;
                case "azul":
                    htmlColor="#0000FF";
                    break;
                default:
                    htmlColor="#000000";
                    break;
            }
            iElement.css("color",htmlColor);
        }
    }
return directiveDefinitionObject;
}])




.directive("miTitulo2",[function(){
   var directiveDefinitionObject ={
        restrict:"E",
        replace : false,
        // Las comillas de dentro hay que ponerlas: \".
        template:"{{texto}}<br><button ng-click=\"texto='Texto cambiado desde dentro de la directiva'\">Cambiar valor de scope.texto de la directiva y del controlador</button></div>",
        // Indicamos que la variable 'titulo' NO pertenece al scope del controlador
        scope:{
            // Al poner texto:”=” lo que le hemos dicho es que la propiedad texto del 
            //scope de la directiva sea exactamente la propiedad del $scope del 
            //controlador especificado en el atributo texto de la directiva. 
            texto:"="
        }
    }
   
    return directiveDefinitionObject;
}])



.directive("miValidacionNombre",[function(){

    var directiveDefinitionObject ={
        restrict:"E",
        replace : true,
        // Las comillas deben estar precedidas de '\'.
        template:"<span  class=\"error\" data-ng-show=\"miFormulario.first_name.$error.maxlength\">Nombre demasiado largo</span>"
    }
   
    return directiveDefinitionObject;
}])


.directive("miValidacionApellido",[function(){

    var directiveDefinitionObject ={
        restrict:"E",
        replace : true,
        // Las comillas deben estar precedidas de '\'.
        template:"<span  class=\"error\" data-ng-show=\"miFormulario.last_name.$error.minlength\">Apellido demasiado corto</span>"
    }
   
    return directiveDefinitionObject;
}])

.directive("miValidacionCiudad",[function(){

    var directiveDefinitionObject ={
        restrict:"E",
        replace : true,
        // Las comillas deben estar precedidas de '\'.
        template:"<span  class=\"error\" data-ng-show=\"miFormulario.city.$error.pattern\">Nombre de ciudad incorrecto</span>"
    }
   
    return directiveDefinitionObject;
}])





.directive("miValidacionEmail",[function(){

    var directiveDefinitionObject ={
        restrict:"E",
        replace : true,
        // Las comillas deben estar precedidas de '\'.
        template:"<span  class=\"error\" data-ng-show=\"miFormulario.email.$error.email\">Email no válido</span>"
    }
   
    return directiveDefinitionObject;
}])


.directive("miValidacionUrl",[function(){

    var directiveDefinitionObject ={
        restrict:"E",
        replace : true,
        // Las comillas deben estar precedidas de '\'.
        template:"<span  class=\"error\" data-ng-show=\"miFormulario.url.$error.url\">Url no válido</span>"
    }
   
    return directiveDefinitionObject;
}])



// El nombre de la directiva será: 'prefijoNombreNombre2' y en el html tendrá la forma: "data-prefijo-nombre-nombre2"
.directive("miValidacionEdad",[function(){
    
    var directiveDefinitionObject ={

        restrict:"E",
        replace : false,
        // Las comillas de dentro hay que ponerlas: \".
        //template:"<span class=error data-ng-show=miFormulario.age.$error.max>Edad inválida XD</span>",
        template:"<span class=\"error\" data-ng-show=\"miFormulario.age.$error.min && validacionEdad\">Tienes que tener 18 años</span><span class=\"error\" data-ng-show=\"miFormulario.age.$error.max && validacionEdad\">Edad inválida</span><span class=\"error\" data-ng-show=\"miFormulario.age.$error.number && validacionEdad\">La edad debe ser numérica</span>",
       
        
    }     
    return directiveDefinitionObject;
}])


// ¡¡ NO FUNCIONA !!
.directive("miValidacionAge",[function(){
    
    var directiveDefinitionObject ={

        restrict:"E",
        replace : false,
        // Las comillas de dentro hay que ponerlas: \".
        //template:"<span class=error data-ng-show=miFormulario.age.$error.max>Edad inválida XD</span>",
        //template:"<span class=\"error\" data-ng-show=\"miFormulario.age.$error.min\">Tienes que tener 18 años</span>",
        template:"<span class=\"error\" data-ng-show=\"miFormulario.age.$error.min\">ERROR</span>",
            scope:{
            // Al poner texto:”=” lo que le hemos dicho es que la propiedad texto del 
            //scope de la directiva sea exactamente la propiedad del $scope del 
            //controlador especificado en el atributo texto de la directiva. 
            campo:"@"
        }
    }
    return directiveDefinitionObject;
}])


.directive("miValidacionTelefono",[function(){
    
   var directiveDefinitionObject ={

        restrict:"E",
        replace : true,
        // Las comillas de dentro hay que ponerlas: \".
        //template:"<span class=error data-ng-show=miFormulario.age.$error.max>Edad inválida XD</span>",
        template:"<span class=\"error\" data-ng-show=\"miFormulario.telephone.$error.pattern\">Número de teléfono incorrecto</span>",
       
        
    }     
    return directiveDefinitionObject;
}])


