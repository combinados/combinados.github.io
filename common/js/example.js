var MyApp = angular.module("bolao", ['ui.bootstrap', 'ngAnimate', 'ui.bootstrap']);

MyApp
.directive('setNgAnimate', ['$animate', function ($animate) {
 return {
     link: function ($scope, $element, $attrs) { 
       
         $scope.$watch( function() { 
                 return $scope.$eval($attrs.setNgAnimate, $scope); 
             }, function(valnew, valold){
                 $animate.enabled(!!valnew, $element);
         });  
         
         
     }
 };
}])
.controller('ClassificacaoCtrl',['$scope', '$animate', function ($scope, $animate) {    
    
    $scope.oneAtATime = true;
    
    $scope.boleiros = [{
            nome: "Reinaldo Vale",
            img: "img/daniel.png",
            pontos: 100,
            placares: 50
        }, {
            nome: "Zeneto",
            img: "img/caracu.jpg",
            pontos: 60,
            placares: 50
        }, {
            nome: "Russo",
            img: "img/daniel.png",
            pontos: 10,
            placares: 4
        }, {
            nome: "Diel do Vale",
            img: "img/boca.png",
            pontos: 10,
            placares: 4
        }];

}]).
controller('RodadaCtrl',['$scope', '$animate', function ($scope, $animate) {   

     
    $scope.carouselCaption = true;
    
    $scope.myInterval = 5000;
    var rodadas = $scope.rodadas = [];
    $scope.addSlide = function(numero) {
        var newWidth = 200 + ((rodadas.length + (25 * rodadas.length)) % 150);
        rodadas.push({numero: numero,
            data: '25/09/2013',
            jogos: [
                {mandante: 'Fla',convidado: 'Bot'}, 
                {mandante: 'Vas',convidado: 'Par'}, 
                {mandante: 'Fla',convidado: 'Bot'}, 
                {mandante: 'Vas',convidado: 'Par'}, 
                {mandante: 'Fla',convidado: 'Bot'}, 
                {mandante: 'Vas',convidado: 'Par'}, 
                {mandante: 'Fla',convidado: 'Bot'}, 
                {mandante: 'Vas',convidado: 'Par'}, 
                {mandante: 'Fla',convidado: 'Bot'}, 
                {mandante: 'Vas',convidado: 'Par'}]});
    };
    for (var i = 0; i < 10; i++) {
        $scope.addSlide(i);
    }
    
    $scope.animate = true;
    $scope.animateGlobal = false;
    
    $scope.$watch('animateGlobal', function(val){
        console.log('Set Global animation Enabled: ' + val);
        $animate.enabled(val); 
    });
}]);
