'use strict';
angular.module('bolao.carrossel', [])
.directive('carrossel', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: 'ui/carrossel/diretivas/diretiva-carrossel.html',
        scope: true,
        controller: function($scope) {
            
            var eu = this, 
            indiceAtual = 0;
            $scope.direcao = "esquerda";
            $scope.paginas = [];
            
            eu.adicionarPagina = function(pagina) {
                if ($scope.paginas.length === 0) {
                    pagina.exibir();
                }
                $scope.paginas.push(pagina);
            };
            
            $scope.atualizarIndice = function(indice, direcao) {
                if (direcao === undefined) {
                    $scope.direcao = (indiceAtual >= indice) ? "esquerda" : "direita";
                } 
                else {
                    $scope.direcao = direcao;
                }
                $scope.paginas[indiceAtual].ocultar();
                $scope.paginas[indice].exibir();
                indiceAtual = indice;
            };
            
            $scope.ehIndicePaginaAtual = function(indice) {
                return indiceAtual === indice;
            };
            
            $scope.proximaPagina = function() {
                var indice = indiceAtual, 
                novoIndiceAtual = (indice < $scope.paginas.length - 1) ? ++indice : 0;
                $scope.atualizarIndice(novoIndiceAtual, "direita");
            };
            
            $scope.paginaAnterior = function() {
                var indice = indiceAtual, 
                novoIndiceAtual = (indice > 0) ? --indice : $scope.paginas.length - 1;
                $scope.atualizarIndice(novoIndiceAtual, "esquerda");
            };
        }
    };
})
.directive('pagina', function() {
    return {
        require: '^carrossel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            conteudo: '='
        },
        link: function(scope, element, attrs, carrosselControle) {
            scope.detalheVisivel = false;
            scope.exibir = function() {
                scope.visivel = true;
                scope.detalheVisivel = true;
            }
            
            scope.ocultar = function() {
                scope.visivel = false;
                scope.detalheVisivel = false;
            }
            
            scope.alternarDetalhe = function() {
                scope.detalheVisivel = !scope.detalheVisivel;
            };
            
            scope.ocultar();
            carrosselControle.adicionarPagina(scope);
        },
        templateUrl: 'ui/carrossel/diretivas/diretiva-paginas.html'
    };
});
