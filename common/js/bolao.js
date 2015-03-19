var bolao = angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon']);

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
        //'application/json'
        return $http({
                  method  : 'GET',
                  url     : apiUrl,
                  cache: $templateCache,
                  headers : {
                                'X-Api-Secret': 'xxx', 
                                'Authorization': 'xxx', 
                                'Content-Type': undefined
                            }  
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
    
}]);
