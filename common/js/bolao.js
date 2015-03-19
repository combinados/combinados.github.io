var bolao = angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon']);

<<<<<<< HEAD
bolao.factory('BD', ['$http', '$templateCache', function($http, $templateCache) {

    var boleiro,
    apiUrl = 'bd.json';

    // instantiate our initial object
    var BD = function(boleiro) {
        this.boleiro = ((boleiro != undefined || boleiro != "")? boleiro : "");
    };

    // define the getProfile method which will fetch data
    // from GH API and *returns* a promise
    BD.prototype.pegarBoleiros = function() {

        // Generally, javascript callbacks, like here the $http.get callback,
        // change the value of the "this" variable inside it
        // so we need to keep a reference to the current instance "this" :
        var self = this;
        
        return $http({
                  method  : 'GET',
                  url     : apiUrl,
                  cache: $templateCache,
                  headers : {'X-Api-Secret': 'xxx', 'Authorization': 'xxx', 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'}  
                })
                .then(function(response) {
                  console.log(response);
                  self.boleiros = response.data;
                  return response;
                });

//         return $http.get(apiUrl).then(function(response) {
// //         return 
// //             $http({
// //                 method:'GET', 
// //                 url: apiUrl,
// //                 cache: $templateCache,
// //                 headers: { 'Accept-Encoding': 'gzip' }
// //             }).then(function(response) {
               
//             console.log(response);

//             // when we get the results we store the data in user.profile
//             self.boleiros = response.data

//             // promises success should always return something in order to allow chaining
//             return response;

//         });
    };
    return BD;
}]);


//Uso futuro

// // we define a new factory and inject our original service so we can extend it properly
// app.factory('AdvancedGithubUser', function($http, SimpleGithubUser) {

//     var apiUrl = 'https://api.github.com/';

//     // create our new custom object that reuse the original object constructor
//     var AdvancedGithubUser = function() {
//         SimpleGithubUser.apply(this, arguments);
//     };

//     // reuse the original object prototype
//     AdvancedGithubUser.prototype = new SimpleGithubUser();

//     // define a new internal private method for this object
//     function getUserEvents() {
//         var self = this;
//         return $http.get(apiUrl + 'users/' + this.username + '/events').then(function(response) {

//             // attach the events API result to our user profile
//             self.profile.events = response.data;

//             // promises should always return a result
//             return response;
//         });
//     }

//     // Now let's override our original getProfile method
//     AdvancedGithubUser.prototype.getProfile = function() {

//         var self = this;

//         // we first call the original getProfile method (aka super method)
//         var originalGetProfile = SimpleGithubUser.prototype.getProfile.apply(this, arguments);

//         // we use promises chaining to add additional data
//         return originalGetProfile.then(function() {

//             // before returning the result,
//             // call our new private method and bind "this" to "self"
//             // we need to do this because the method is not part of the prototype
//             return getUserEvents.call(self);
//         });
//     };
//     return AdvancedGithubUser;
// });

bolao.controller('RodadaControle', ['$scope', 'BD', function($scope, BD) {
    $scope.boleiros = [];

    var bd = new BD();
    // fetch data and publish on scope
    bd.pegarBoleiros().then(function() {
        $scope.boleiros = bd.boleiros;
    })
    
=======
bolao.factory('locations', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      promise = $http.get('locations/locations.json');
      return promise;
    }
  };
});

bolao.controller('RodadaControle', ['$scope', function($scope) {
  $scope.boleiros = [
                    {nome: 'Reinaldo', foto: 'common/img/boy_avatar/128X128/boy_3.png', pontos: 63, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'João', foto: 'common/img/boy_avatar/128X128/boy_1.png', pontos: 63, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Corró', foto: 'common/img/boy_avatar/128X128/boy_2.png', pontos: 63, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Zé Russo', foto: 'common/img/boy_avatar/128X128/boy_4.png', pontos: 63, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Rejane', foto: 'common/img/boy_avatar/128X128/boy_5.png', pontos: 63, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Diel Vale', foto: 'common/img/boy_avatar/128X128/boy_6.png', pontos: 63, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Patriolino', foto: 'common/img/boy_avatar/128X128/boy_7.png', pontos: 000, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Tatú', foto: 'common/img/boy_avatar/128X128/boy_8.png', pontos: 111, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Sitonho', foto: 'common/img/boy_avatar/128X128/boy_9.png', pontos: 222, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Lucinda', foto: 'common/img/girl_avatar/128X128/girl_1.png', pontos: 333, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]},
                    {nome: 'Rosinete', foto: 'common/img/girl_avatar/128X128/girl_2.png', pontos: 444, placares: 40, rodadas : [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ]}
                ];
//     var t = true;                
//     $scope.alternar = function() {
//         return t = !t;
//     }
>>>>>>> 28e5103b15a6db2ae859a4f257bb74d31d6d3168
}]);
