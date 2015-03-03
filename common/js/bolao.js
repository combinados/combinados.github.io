var bolao = angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon']);

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
}]);
