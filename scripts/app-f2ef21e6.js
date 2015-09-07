"use strict";angular.module("bolao.carrossel",[]).directive("carrossel",["BD","$timeout",function(o,a){return{restrict:"E",transclude:"true",replace:"true",templateUrl:"components/carrossel/diretivas/diretiva-carrossel.html",scope:{totalPaginas:"=",boleiro:"="},controller:["$scope",function(e){e.direcao="esquerda",e.paginas=[];var r=this,i=1,t=function(o){angular.forEach(e.paginas,function(a){return a.conteudo.id===o?void a.exibir():void 0})};e.atualizarPagina=function(r,n){e.direcao=void 0===n?i>=r?"esquerda":"direita":n;var l=!0,s=!1;angular.forEach(e.paginas,function(o){o.conteudo.id===i&&(o.ocultar(),s=!0),o.conteudo.id===r&&(l=!1),!l&&s}),l&&e.boleiro.rodadas.push(o.pegarRodada(e.boleiro.id,r)),a(function(){t(r)},100),i=r},e.ehPaginaAtual=function(o){return i===o},e.proximaPagina=function(){var o=i,a=o<e.totalPaginas?++o:1;e.atualizarPagina(a,"direita")},e.paginaAnterior=function(){var o=i,a=o>1?--o:e.totalPaginas;e.atualizarPagina(a,"esquerda")},r.adicionarPagina=function(o){1===i&&o.exibir(),e.paginas.push(o)}}]}}]).directive("pagina",function(){return{require:"^carrossel",restrict:"E",transclude:"true",replace:"true",scope:{conteudo:"="},link:function(o,a,e,r){o.exibir=function(){o.visivel=!0,o.detalheVisivel=!1},o.ocultar=function(){o.visivel=!1,o.detalheVisivel=!1},o.alternarDetalhe=function(){o.detalheVisivel=!o.detalheVisivel},o.ocultar(),r.adicionarPagina(o)},templateUrl:"components/carrossel/diretivas/diretiva-paginas.html"}}),angular.module("bolao.acordeon",[]).directive("acordeon",function(){return{restrict:"E",transclude:"true",replace:"true",templateUrl:"components/acordeon/diretivas/diretiva-acordeon.html",scope:"true",controller:["$scope",function(o){o.itens=[];var a=this,e=[],r=2,i=0,t=[],n=2,l=0,s=0,c=function(o){if(n>l){for(var a=0;a<t.length;a++)if(t[a].boleiro.pontos===o.boleiro.pontos&&t[a].boleiro.placares===o.boleiro.placares){l--;break}o.tipo="item-rebaixado",l++,t.push(o)}else{for(var e=!1,a=0;a<t.length;a++)if(t[a].boleiro.pontos===o.boleiro.pontos&&t[a].boleiro.placares===o.boleiro.placares){e=!0;break}if(e)o.tipo="item-premiado",t.push(o);else{var r=t.filter(function(a){return a.boleiro.pontos>o.boleiro.pontos||a.boleiro.pontos===o.boleiro.pontos&&a.boleiro.placares>o.boleiro.placares});if(r.length>0){for(var i=r[0].boleiro.pontos,s=r[0].boleiro.placares,a=1;a<r.length;a++)(r[a].boleiro.pontos>i||r[a].boleiro.pontos===i&&r[a].boleiro.placares>s)&&(i=r[a].boleiro.pontos,s=r[a].boleiro.placares);t=t.filter(function(o){var a=!0;return o.boleiro.pontos===i&&o.boleiro.placares===s&&(o.tipo="",a=!1),a}),o.tipo="item-rebaixado",t.push(o)}}}},d=function(o){if(r>i){for(var a=0;a<e.length;a++)if(e[a].boleiro.pontos===o.boleiro.pontos&&e[a].boleiro.placares===o.boleiro.placares){i--;break}o.tipo="item-premiado",i++,e.push(o)}else{for(var t=!1,a=0;a<e.length;a++)if(e[a].boleiro.pontos===o.boleiro.pontos&&e[a].boleiro.placares===o.boleiro.placares){t=!0;break}if(t)o.tipo="item-premiado",e.push(o);else{var n=e.filter(function(a){return a.boleiro.pontos<o.boleiro.pontos||a.boleiro.pontos===o.boleiro.pontos&&a.boleiro.placares<o.boleiro.placares});if(n.length>0){for(var l=n[0].boleiro.pontos,s=n[0].boleiro.placares,a=1;a<n.length;a++)(n[a].boleiro.pontos<l||n[a].boleiro.pontos===l&&n[a].boleiro.placares<s)&&(l=n[a].boleiro.pontos,s=n[a].boleiro.placares);e=e.filter(function(o){var a=!0;return o.boleiro.pontos===l&&o.boleiro.placares===s&&(o.tipo="",c(o),a=!1),a}),o.tipo="item-premiado",e.push(o)}else c(o)}}};a.adicionarItem=function(a){d(a),o.itens.push(a)},a.abrir=function(a){a===s?o.itens[s].visivel?o.itens[a].ocultar():o.itens[a].exibir():(o.itens[s].ocultar(),o.itens[a].exibir()),s=a}}]}}).directive("item",["BD",function(o){return{require:"^acordeon",restrict:"E",transclude:"true",replace:"true",scope:{boleiro:"=",indice:"@"},link:function(a,e,r,i){a.direcao="esquerda",a.exibir=function(){a.visivel=!0,a.situacao="item-aberto"},a.abrir=function(e){var r=a.boleiro.rodadas;"object"==typeof r&&r instanceof Array&&(r.length||a.boleiro.rodadas.push(o.pegarRodada(a.boleiro.id,1))),i.abrir(e)},a.ocultar=function(){a.visivel=!1,a.situacao="item-fechado"},a.ocultar(),i.adicionarItem(a)},templateUrl:"components/acordeon/diretivas/diretiva-item.html"}}]),angular.module("bolao",["bolao.carrossel","bolao.acordeon","ngTouch"]),angular.module("bolao").factory("BD",["$http","$templateCache",function(o,a){var e,r,i="bd.json",t=function(o){return"Gabarito"!==o.nome?n(o):void(r=o)},n=function(o){for(var a=null,e=0;e<o.rodadas.length;e++){a=o.rodadas[e];for(var i=0;i<a.jogos.length;i++){var t=a.jogos[i],n=r.rodadas[e].jogos[i];t.pontos=l(t,n),a.pontos+=t.pontos}}o.pontos=o.rodadas.reduce(function(o,a){return o+a.pontos},0);for(var s=0;s<o.rodadas.length;s++){var c=o.rodadas[s].jogos.filter(function(o){return 3===o.pontos?o:void 0});o.placares+=o.rodadas[s].placares=c.length}var d=o.rodadas.filter(function(o){return o.pontos>0}).length;return o.mediaPontos=o.pontos/d,o.mediaPlacares=o.placares/d,o.totalRodadas=o.rodadas.length,o},l=function(o,a){return""===a.mandante.gols||""===a.visitante.gols||""===o.mandante.gols||""===o.visitante.gols?0:a.mandante.gols===o.mandante.gols&&a.visitante.gols===o.visitante.gols?3:a.mandante.gols===a.visitante.gols&&o.mandante.gols===o.visitante.gols||a.mandante.gols<a.visitante.gols&&o.mandante.gols<o.visitante.gols||a.mandante.gols>a.visitante.gols&&o.mandante.gols>o.visitante.gols?1:0},s=function(o){return angular.extend(c(o.id),o),o.rodadas=[],o},c=function(o){var a=e.filter(function(a){return a.id===o?a:void 0});return a[0]},d=function(o,a){for(var e=0;e<a.length;e++)if(a[e].id===o)return a[e]};return{pegarBoleiros:function(){return o({method:"GET",url:i,cache:a,headers:{"X-Api-Secret":"xxx",Authorization:"xxx","Content-Type":"undefined"}}).then(function(o){e=o.data;var a=JSON.parse(JSON.stringify(o.data));return a.filter(t).map(s)})},pegarRodada:function(o,a){var e=c(o);return d(a,e.rodadas)}}}]),angular.module("bolao").controller("NavbarCtrl",["$scope",function(o){o.date=new Date}]),angular.module("bolao").controller("ControlePrincipal",["$scope","BD",function(o,a){o.boleiros=[],a.pegarBoleiros().then(function(a){o.boleiros=a})}]),angular.module("bolao").run(["$templateCache",function(o){o.put("components/navbar/navbar.html",'<nav class="navbar" ng-controller="NavbarCtrl"><a href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</a><ul><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul><li><a ng-href="#">Current date: {{ date | date:\'yyyy-MM-dd\' }}</a></li></ul></nav>'),o.put("components/acordeon/diretivas/diretiva-acordeon.html",'<div class="acordeon" ng-transclude=""></div>'),o.put("components/acordeon/diretivas/diretiva-item.html",'<div class="item {{situacao}}"><div class="item-cabecalho {{situacao}} {{tipo}}" ng-click="abrir(indice)"><figure><img ng-src="{{boleiro.foto}}"> <img ng-src="{{boleiro.campeao.escudo}}"><figcaption>Meu campeão: {{boleiro.campeao.pontos}} pontos</figcaption></figure><div class="nome">{{boleiro.nome}}</div><div class="valores">Pontos<br>{{boleiro.pontos}}</div><div class="valores">Placares<br>{{boleiro.placares}}</div></div><div ng-transclude=""></div></div>'),o.put("components/carrossel/diretivas/diretiva-carrossel.html",'<div class="carrossel"><nav class="navegacao"><ul class="pontos"><li class="ponto" ng-class="{\'ativo\':ehPaginaAtual($index + 1)}" ng-repeat="pagina in (0|number:totalPaginas - 2 ) track by $index" ng-click="atualizarPagina($index + 1);">{{$index + 1}}</li></ul></nav><div ng-transclude="" class="paginas {{direcao}}" ng-swipe-left="paginaAnterior()" ng-swipe-right="proximaPagina()"></div><a class="seta anterior" ng-click="paginaAnterior()"></a> <a class="seta proxima" ng-click="proximaPagina()"></a></div>'),o.put("components/carrossel/diretivas/diretiva-paginas.html",'<div class="pagina" ng-hide="!visivel"><div class="conteudo" ng-transclude="" ng-click="alternarDetalhe()"></div><div ng-click="alternarDetalhe()" class="detalhe" ng-class="{ocultar : !detalheVisivel}"><table class="detalhe-rodada"><tr><td class="cabecalho-detalhe-rodada" colspan="4">Detalhes da Rodada</td></tr><tr><td class="esquerda">Número:</td><td class="esquerda">{{conteudo.id}}</td><td class="esquerda">Total de Pontos:</td><td class="direita">{{conteudo.pontos}}</td></tr><tr><td class="esquerda">Data:</td><td class="esquerda">{{conteudo.data | date : \'dd/MM/yyyy\'}}</td><td class="esquerda">Total de Placares:</td><td class="direita">{{conteudo.Placares}}</td></tr></table></div></div>')}]);