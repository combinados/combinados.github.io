webpackJsonp([1,3],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cabecalho_css__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cabecalho_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cabecalho_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cabecalho_html__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cabecalho_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__cabecalho_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sub_cabecalho_html__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sub_cabecalho_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__sub_cabecalho_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_comum__ = __webpack_require__(32);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var Cabecalho = function () {
	function Cabecalho() {
		_classCallCheck(this, Cabecalho);
	}

	_createClass(Cabecalho, [{
		key: "desenhar",
		value: function desenhar(node) {
			// qs(node).innerHTML = cabecalhoTemplate;

			var titulo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		}
	}, {
		key: "desenharSub",
		value: function desenharSub(elemento) {
			var dados = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			elemento.innerHTML = Mustache.render(__WEBPACK_IMPORTED_MODULE_2__sub_cabecalho_html___default.a, dados);
		}
	}]);

	return Cabecalho;
}();

/* harmony default export */ __webpack_exports__["a"] = Cabecalho;

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepositorioLocal = function () {
  function RepositorioLocal(nome) {
    _classCallCheck(this, RepositorioLocal);

    this._bdNome = nome;

    if (!localStorage[nome]) {
      var dados = {
        judicial: {
          Naturezas: [],
          TiposProcesso: [],
          RitosProcesso: [],
          Comarcas: [],
          Juizos: []
        }
      };
      localStorage[nome] = JSON.stringify(dados);
    }
  }

  _createClass(RepositorioLocal, [{
    key: "buscarCache",
    value: function buscarCache(categoria, filtro) {
      var cache = JSON.parse(localStorage[this._bdNome]);
      return cache.judicial[categoria].filter(function (item) {
        return item["filtro"] === filtro;
      });
    }
  }, {
    key: "atualizarCache",
    value: function atualizarCache(dados, categoria, filtro) {
      var cache = JSON.parse(localStorage[this._bdNome]);
      cache.judicial[categoria] = dados;
      cache.judicial[categoria].map(function (item) {
        item.filtro = filtro;
      });
      localStorage[this._bdNome] = JSON.stringify(cache);
      return cache.judicial[categoria];
    }
  }, {
    key: "buscarRemota",
    value: function buscarRemota(categoria, filtro) {
      var self = this;
      return new Promise(function (resolve, reject) {
        // self.processoProxy[`busca${categoria}`](filtro)
        //   .then(dados => {
        //     resolve(self.atualizarCache(dados, categoria, filtro));
        //   }).catch(function(e) {
        //     reject(e);
        //   });
      });
    }
  }, {
    key: "filtrar",
    value: function filtrar(itens, filtro) {
      if (filtro) {
        itens = itens.filter(function (item) {
          return item.id === filtro;
        });
      }
      return itens;
    }
  }, {
    key: "buscar",
    value: function buscar(categoria, filtro) {
      var _this = this;

      var self = this;
      // Primeiro busca no cache
      var itens = this.buscarCache(categoria);
      return new Promise(function (resolve, reject) {
        if (itens.length === 0) {
          _this.buscarRemota(categoria).then(function (dados) {
            resolve(self.filtrar(dados, filtro));
          });
        } else {
          // no caso do cache, retorna uma promessa apenas para manter a interface uniforme nas camadas mais alta.
          resolve(_this.filtrar(itens, filtro));
        }
      });
    }
  }, {
    key: "buscarTiposProcesso",
    value: function buscarTiposProcesso(categoria, naturezaId) {
      var _this2 = this;

      var self = this;
      // Primeiro busca no cache
      var itens = this.buscarCache(categoria, naturezaId);
      return new Promise(function (resolve, reject) {
        if (itens.length === 0) {
          _this2.buscarRemota(categoria, naturezaId).then(function (dados) {
            resolve(dados);
          }).catch(function (e) {
            reject(e);
          });
        } else {
          // no caso do cache, retorna uma promessa apenas para manter a interface uniforme nas camadas mais alta.
          resolve(itens);
        }
      });
    }
  }]);

  return RepositorioLocal;
}();

/* harmony default export */ __webpack_exports__["a"] = RepositorioLocal;

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_drawer__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_checkbox__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_icon_toggle__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_snackbar__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__material_ripple__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__comum__ = __webpack_require__(32);
/* unused harmony export retrairMenu */
/* harmony export (immutable) */ __webpack_exports__["b"] = paginaPronta;
/* harmony export (immutable) */ __webpack_exports__["a"] = atualizarPagina;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







// import * as utils from "@material/drawer/util";


function retrairMenu() {
    var menu = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["c" /* qs */])("div.navbar-collapse");
    menu.classList.remove("active", "in");
}

function paginaPronta(eventoDom, buscaGeral) {
    // $on(qs("#frmBuscaGeral"), "submit", e => {
    //     e.preventDefault();
    //     navegarPara(`${buscaGeral}?envolvido=${e.target.elements[0].value}`, true);
    // });
}

function atualizarPagina(evento, callback) {
    var hash = window.location.hash;
    if (evento && /^load|hashchange$/.test(evento.type)) {
        hash = hash ? hash : callback.paginaPadrao;
        callback.atacharEvento(hash);
    }
    // atualizarMenu(hash);
    inicializarMCW();
}

function inicializarMCW(hash) {
    var drawer = new __WEBPACK_IMPORTED_MODULE_0__material_drawer__["a" /* MDCTemporaryDrawer */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["c" /* qs */])(".mdc-temporary-drawer"));
    document.querySelector(".demo-menu").addEventListener("click", function () {
        return drawer.open = true;
    });

    // let icon = new MDCIconToggle();

    var snackbar = new __WEBPACK_IMPORTED_MODULE_3__material_snackbar__["a" /* MDCSnackbar */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["c" /* qs */])("#mdc-js-snackbar"));
    var data = {
        message: "teste da snackbar"
    };
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["c" /* qs */])(".demo-snackbar").addEventListener("click", function () {
        snackbar.show(data);
    });

    __WEBPACK_IMPORTED_MODULE_4__material_ripple__["a" /* MDCRipple */].attachTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["c" /* qs */])(".demo-surface"));
}

function atualizarMenu(hash) {
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width,
        itemSelecionado = void 0,
        menuPai = void 0,
        menuAvo = void 0,
        menuPaiNaoSelecionado = void 0,
        itemPai = void 0;
    if (width < 768) {
        retrairMenu();
    }

    [].concat(_toConsumableArray(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["d" /* qsa */])("#side-menu a"))).map(function (menuItem) {
        menuItem.classList.remove("active");
        if (menuItem.hash && hash.startsWith(menuItem.hash)) {
            itemSelecionado = menuItem;
        } else {
            menuPaiNaoSelecionado = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["e" /* $parent */])(menuItem, "ul");
            if (menuPaiNaoSelecionado && menuPaiNaoSelecionado.id !== "side-menu") {
                menuPaiNaoSelecionado.classList.remove("in");
                itemPai = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["e" /* $parent */])(menuPaiNaoSelecionado, "li");
                if (itemPai) {
                    itemPai.classList.remove("active");
                }
            }
        }
    });
    // Expandir os menus ancestrais do item
    menuPai = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["e" /* $parent */])(itemSelecionado, "ul");
    menuAvo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__comum__["e" /* $parent */])(menuPai, "ul");

    if (menuPai && menuAvo) {
        itemSelecionado.classList.add("active");
        menuPai.classList.add("collapse", "in");
        menuPai.parentNode.classList.add("active");
        menuAvo.classList.add("collapse", "in");
        menuAvo.parentNode.classList.add("active");
    }
}

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__evento_visao__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__evento_servico__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__ = __webpack_require__(91);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Evento = function () {
  function Evento(processo) {
    _classCallCheck(this, Evento);

    this.servico = new __WEBPACK_IMPORTED_MODULE_1__evento_servico__["a" /* default */]();
    this.visao = new __WEBPACK_IMPORTED_MODULE_0__evento_visao__["a" /* default */]("#eventoCompontente");
    this.processo = processo;
    this.andamentoAtual = {};
    this.modalId = "";
  }

  _createClass(Evento, [{
    key: "abrirTelaPrincipal",
    value: function abrirTelaPrincipal() {
      var opcoes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      opcoes = Object.assign({
        "andamentos": false,
        "providencias": false,
        "exibir": true,
        "processo": this.processo
      }, opcoes);

      // this.visao.abrirTelaPrincipal(opcoes);
      // if (opcoes.exibir) {
      //   this.visao.atacharEvento("selecionarTipoEvento", evento => this.abrirModal(evento));
      //   this.visao.atacharEvento("exibirAndamentos", evento => this.exibirAndamentos(evento));
      // }
      // if (opcoes.andamentos) {
      //   this.buscarEventos("andamentos");
      //   this.visao.atacharEvento("excluirAndamento", e => this.excluirEvento(e));
      //   this.visao.atacharEvento("listarProvidencias", e => this.listarProvidencias(e));
      // }
      // if (opcoes.providencias) {
      //   this.buscarEventos("providencias");
      //   this.visao.atacharEvento("excluirProvidencia", e => this.excluirEvento(e));
      // }
    }
  }, {
    key: "abrirModal",
    value: function abrirModal(modalId, andamento) {
      var _this = this;

      this.modalId = modalId;
      this.visao.abrirModal(this.modalId, andamento);
      this.visao.atacharEvento("buscarEventosPor", function (evento) {
        return _this.buscarEventosPor(evento);
      });
    }
  }, {
    key: "associarEvento",
    value: function associarEvento(dados) {
      var _this2 = this;

      if (dados.eventoPotencial) {
        dados["processoId"] = this.processo.id;

        this.servico.associarEvento(dados).then(function (resposta) {
          _this2.visao.fecharModal(_this2.modalId);
          dados["mensagem"] = "{\"mensagens\": " + JSON.stringify(resposta.mensagens) + "}";
          if (dados.andamentoId) {
            return _this2.listarProvidencias(dados);
          }

          _this2.buscarEventos(dados.tipoEvento);
          __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens({
            "response": dados.mensagem
          }).mostrar("#mensagem-evento");
        }).catch(function (req) {
          __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens(req).mostrar("#mensagem-" + dados.eventoPotencial.evento.id);
        });
      }
    }
  }, {
    key: "excluirEvento",
    value: function excluirEvento(dados) {
      var _this3 = this;

      dados["processoId"] = this.processo.id;
      this.servico.excluirEvento(dados).then(function (resposta) {
        dados["mensagem"] = "{\"mensagens\": " + JSON.stringify(resposta.mensagens) + "}";
        if (dados.andamentoId) {
          return _this3.listarProvidencias(dados);
        }

        _this3.buscarEventos(dados.tipoEvento);
        __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens({
          "response": dados.mensagem
        }).mostrar("#mensagem-evento");
      }).catch(function (req) {
        __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens(req).mostrar("#mensagem-evento");
      });
    }
  }, {
    key: "exibirAndamentos",
    value: function exibirAndamentos() {
      __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].ocultar();
    }
  }, {
    key: "listarProvidencias",
    value: function listarProvidencias(dados) {
      var _this4 = this;

      __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].apagar("#mensagem-evento");
      var andamentoId = parseInt(dados.andamentoId ? dados.andamentoId : dados.eventoId);
      if (this.processo.andamentos) {
        (function () {
          _this4.andamentoAtual = Object.assign({}, _this4.processo.andamentos.find(function (item) {
            return item.andamento.id === andamentoId;
          }).andamento);
          var opcoes = {
            andamento: _this4.andamentoAtual,
            exibirProvidenciasDoAndamento: true
          };
          _this4.servico.buscarProvidencias(_this4.processo.id, _this4.andamentoAtual.id).then(function (resposta) {
            _this4.andamentoAtual["providencias"] = resposta.dados.providencias;
            _this4.andamentoAtual["exibirProvidencias"] = true;
            opcoes["andamento"] = _this4.andamentoAtual;
            _this4.visao.listarProvidencias(opcoes);
            _this4.visao.atacharEvento("pesquisarProvidencia", function () {
              return _this4.abrirModal("#modalprovidencias", _this4.andamentoAtual);
            });
            _this4.visao.atacharEvento("excluirProvidenciaAndamento", function (e) {
              return _this4.excluirEvento(e);
            });
            if (dados.mensagem) {
              __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens({
                "response": dados.mensagem
              }).mostrar("#mensagem-providencia");
            }
          }).catch(function (req) {
            _this4.visao.listarProvidencias(opcoes);
            _this4.visao.atacharEvento("pesquisarProvidencia", function () {
              return _this4.abrirModal("#modalprovidencias", _this4.andamentoAtual);
            });
            if (dados.mensagem) {
              __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens({
                "response": dados.mensagem
              }).mostrar("#mensagem-providencia");
              __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens(req, false).mostrar("#mensagem-providencia");
            } else {
              __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens(req).mostrar("#mensagem-providencia");
            }
          });
        })();
      }
    }
  }, {
    key: "buscarEventos",
    value: function buscarEventos(tipoEvento) {
      var _this5 = this;

      var opcoes = {
        tipoEvento: tipoEvento
      };
      this.servico.buscarEventos(this.processo.id, tipoEvento).then(function (resposta) {
        if (tipoEvento === "andamentos") {
          _this5.processo.andamentos = resposta.dados.andamentos;
          opcoes["exibirAndamentos"] = _this5.processo.andamentos.length > 0;
        }
        if (tipoEvento === "providencias") {
          _this5.processo.providencias = resposta.dados.providencias;
          opcoes["exibirProvidencias"] = _this5.processo.providencias.length > 0;
        }
        opcoes["processo"] = _this5.processo;
        _this5.visao.listarEventos(opcoes);
      }).catch(function (req) {
        __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens(req).mostrar("#mensagem-evento");
        _this5.visao.listarEventos(opcoes);
      });
    }
  }, {
    key: "buscarEventosPor",
    value: function buscarEventosPor(opcoes) {
      var _this6 = this;

      this.servico.buscarEventosPor(opcoes).then(function (resposta) {
        var dados = {
          tipoEvento: opcoes.tipoEvento,
          eventosPotencial: resposta.dados.eventos
        };
        _this6.visao.listarEventosPotencial(dados);
        _this6.visao.atacharEvento("associarEvento", function (evento) {
          return _this6.associarEvento(evento);
        });
        // mensagemUtil.ocultar("#mensagem-modal");
      }).catch(function (req) {
        __WEBPACK_IMPORTED_MODULE_2__componentes_mensagem_mensagem__["a" /* mensagemUtil */].adicionarMensagens(req).mostrar("#mensagem-modal");
        _this6.visao.listarEventosPotencial();
      });
    }
  }]);

  return Evento;
}();

/* harmony default export */ __webpack_exports__["a"] = Evento;

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(88);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var MDCComponent = function () {
  _createClass(MDCComponent, null, [{
    key: 'attachTo',
    value: function attachTo(root) {
      // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
      // returns an instantiated component with its root set to that element. Also note that in the cases of
      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
      // from getDefaultFoundation().
      return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
    }
  }]);

  function MDCComponent(root, foundation) {
    _classCallCheck(this, MDCComponent);

    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  _createClass(MDCComponent, [{
    key: 'initialize',
    value: function initialize() /* ...args */{
      // Subclasses can override this to do any additional setup work that would be considered part of a
      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
      // initialized. Any additional arguments besides root and foundation will be passed in here.
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    // Wrapper method to add an event listener to the component's root element. This is most useful when
    // listening for custom events.

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    // Wrapper method to remove an event listener to the component's root element. This is most useful when
    // unlistening for custom events.

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    // Fires a cross-browser-compatible custom event from the component root of the given type,
    // with the given data.

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var evt = void 0;
      if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, { detail: evtData });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, false, false, evtData);
      }

      this.root_.dispatchEvent(evt);
    }
  }]);

  return MDCComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = MDCComponent;

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return numbers; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ROOT = 'mdc-checkbox';
var ANIM = ROOT + '--anim';

var cssClasses = {
  ROOT: ROOT,
  CHECKED: ROOT + '--checked',
  INDETERMINATE: ROOT + '--indeterminate',
  ANIM_UNCHECKED_CHECKED: ANIM + '-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: ANIM + '-unchecked-indeterminate',
  ANIM_CHECKED_UNCHECKED: ANIM + '-checked-unchecked',
  ANIM_CHECKED_INDETERMINATE: ANIM + '-checked-indeterminate',
  ANIM_INDETERMINATE_CHECKED: ANIM + '-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: ANIM + '-indeterminate-unchecked'
};

var strings = {
  NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control',
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_UNCHECKED: 'unchecked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate'
};

var numbers = {
  ANIM_END_LATCH_MS: 100
};

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(132);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var CB_PROTO_PROPS = ['checked', 'indeterminate'];

var MDCCheckboxFoundation = function (_MDCFoundation) {
  _inherits(MDCCheckboxFoundation, _MDCFoundation);

  _createClass(MDCCheckboxFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */];
    }
  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */];
    }
  }, {
    key: 'numbers',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* numbers */];
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerAnimationEndHandler: function registerAnimationEndHandler() /* handler: EventListener */{},
        deregisterAnimationEndHandler: function deregisterAnimationEndHandler() /* handler: EventListener */{},
        registerChangeHandler: function registerChangeHandler() /* handler: EventListener */{},
        deregisterChangeHandler: function deregisterChangeHandler() /* handler: EventListener */{},
        getNativeControl: function getNativeControl() /* HTMLInputElement */{},
        forceLayout: function forceLayout() {},
        isAttachedToDOM: function isAttachedToDOM() /* boolean */{}
      };
    }
  }]);

  function MDCCheckboxFoundation(adapter) {
    _classCallCheck(this, MDCCheckboxFoundation);

    var _this = _possibleConstructorReturn(this, (MDCCheckboxFoundation.__proto__ || Object.getPrototypeOf(MDCCheckboxFoundation)).call(this, Object.assign(MDCCheckboxFoundation.defaultAdapter, adapter)));

    _this.currentCheckState_ = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_INIT;
    _this.currentAnimationClass_ = '';
    _this.animEndLatchTimer_ = 0;
    _this.animEndHandler_ = function () {
      clearTimeout(_this.animEndLatchTimer_);
      _this.animEndLatchTimer_ = setTimeout(function () {
        _this.adapter_.removeClass(_this.currentAnimationClass_);
        _this.adapter_.deregisterAnimationEndHandler(_this.animEndHandler_);
      }, __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* numbers */].ANIM_END_LATCH_MS);
    };
    _this.changeHandler_ = function () {
      return _this.transitionCheckState_();
    };
    return _this;
  }

  _createClass(MDCCheckboxFoundation, [{
    key: 'init',
    value: function init() {
      this.adapter_.registerChangeHandler(this.changeHandler_);
      this.installPropertyChangeHooks_();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterChangeHandler(this.changeHandler_);
      this.uninstallPropertyChangeHooks_();
    }
  }, {
    key: 'isChecked',
    value: function isChecked() {
      return this.getNativeControl_().checked;
    }
  }, {
    key: 'setChecked',
    value: function setChecked(checked) {
      this.getNativeControl_().checked = checked;
    }
  }, {
    key: 'isIndeterminate',
    value: function isIndeterminate() {
      return this.getNativeControl_().indeterminate;
    }
  }, {
    key: 'setIndeterminate',
    value: function setIndeterminate(indeterminate) {
      this.getNativeControl_().indeterminate = indeterminate;
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.getNativeControl_().disabled;
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(disabled) {
      this.getNativeControl_().disabled = disabled;
    }
  }, {
    key: 'installPropertyChangeHooks_',
    value: function installPropertyChangeHooks_() {
      var _this2 = this;

      var nativeCb = this.getNativeControl_();
      var cbProto = Object.getPrototypeOf(nativeCb);

      CB_PROTO_PROPS.forEach(function (controlState) {
        var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
        // We have to check for this descriptor, since some browsers (Safari) don't support its return.
        // See: https://bugs.webkit.org/show_bug.cgi?id=49739
        if (validDescriptor(desc)) {
          Object.defineProperty(nativeCb, controlState, {
            get: desc.get,
            set: function set(state) {
              desc.set.call(nativeCb, state);
              _this2.transitionCheckState_();
            },
            configurable: desc.configurable,
            enumerable: desc.enumerable
          });
        }
      });
    }
  }, {
    key: 'uninstallPropertyChangeHooks_',
    value: function uninstallPropertyChangeHooks_() {
      var nativeCb = this.getNativeControl_();
      var cbProto = Object.getPrototypeOf(nativeCb);

      CB_PROTO_PROPS.forEach(function (controlState) {
        var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
        if (validDescriptor(desc)) {
          Object.defineProperty(nativeCb, controlState, desc);
        }
      });
    }
  }, {
    key: 'transitionCheckState_',
    value: function transitionCheckState_() {
      var nativeCb = this.adapter_.getNativeControl();
      if (!nativeCb) {
        return;
      }
      var oldState = this.currentCheckState_;
      var newState = this.determineCheckState_(nativeCb);
      if (oldState === newState) {
        return;
      }

      // Check to ensure that there isn't a previously existing animation class, in case for example
      // the user interacted with the checkbox before the animation was finished.
      if (this.currentAnimationClass_.length > 0) {
        clearTimeout(this.animEndLatchTimer_);
        this.adapter_.forceLayout();
        this.adapter_.removeClass(this.currentAnimationClass_);
      }

      this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
      this.currentCheckState_ = newState;

      // Check for parentNode so that animations are only run when the element is attached
      // to the DOM.
      if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
        this.adapter_.addClass(this.currentAnimationClass_);
        this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
      }
    }
  }, {
    key: 'determineCheckState_',
    value: function determineCheckState_(nativeCb) {
      var TRANSITION_STATE_INDETERMINATE = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_INDETERMINATE,
          TRANSITION_STATE_CHECKED = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_CHECKED,
          TRANSITION_STATE_UNCHECKED = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_UNCHECKED;


      if (nativeCb.indeterminate) {
        return TRANSITION_STATE_INDETERMINATE;
      }
      return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
    }
  }, {
    key: 'getTransitionAnimationClass_',
    value: function getTransitionAnimationClass_(oldState, newState) {
      var TRANSITION_STATE_INIT = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_INIT,
          TRANSITION_STATE_CHECKED = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_CHECKED,
          TRANSITION_STATE_UNCHECKED = __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */].TRANSITION_STATE_UNCHECKED;
      var _MDCCheckboxFoundatio = MDCCheckboxFoundation.cssClasses,
          ANIM_UNCHECKED_CHECKED = _MDCCheckboxFoundatio.ANIM_UNCHECKED_CHECKED,
          ANIM_UNCHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_UNCHECKED_INDETERMINATE,
          ANIM_CHECKED_UNCHECKED = _MDCCheckboxFoundatio.ANIM_CHECKED_UNCHECKED,
          ANIM_CHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_CHECKED_INDETERMINATE,
          ANIM_INDETERMINATE_CHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_CHECKED,
          ANIM_INDETERMINATE_UNCHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_UNCHECKED;


      switch (oldState) {
        case TRANSITION_STATE_INIT:
          if (newState === TRANSITION_STATE_UNCHECKED) {
            return '';
          }
        // fallthrough
        case TRANSITION_STATE_UNCHECKED:
          return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
        case TRANSITION_STATE_CHECKED:
          return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
        // TRANSITION_STATE_INDETERMINATE
        default:
          return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
      }
    }
  }, {
    key: 'getNativeControl_',
    value: function getNativeControl_() {
      return this.adapter_.getNativeControl() || {
        checked: false,
        indeterminate: false,
        disabled: false
      };
    }
  }]);

  return MDCCheckboxFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["b" /* MDCFoundation */]);

/* harmony default export */ __webpack_exports__["a"] = MDCCheckboxFoundation;


function validDescriptor(inputPropDesc) {
  return inputPropDesc && typeof inputPropDesc.set === 'function';
}

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_animation__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(133);
/* unused harmony reexport MDCCheckboxFoundation */
/* unused harmony export MDCCheckbox */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var MDCCheckbox = function (_MDCComponent) {
  _inherits(MDCCheckbox, _MDCComponent);

  function MDCCheckbox() {
    _classCallCheck(this, MDCCheckbox);

    return _possibleConstructorReturn(this, (MDCCheckbox.__proto__ || Object.getPrototypeOf(MDCCheckbox)).apply(this, arguments));
  }

  _createClass(MDCCheckbox, [{
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */]({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
          return _this2.root_.addEventListener(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__material_animation__["a" /* getCorrectEventName */])(window, 'animation'), handler);
        },
        deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
          return _this2.root_.removeEventListener(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__material_animation__["a" /* getCorrectEventName */])(window, 'animation'), handler);
        },
        registerChangeHandler: function registerChangeHandler(handler) {
          return _this2.nativeCb_.addEventListener('change', handler);
        },
        deregisterChangeHandler: function deregisterChangeHandler(handler) {
          return _this2.nativeCb_.removeEventListener('change', handler);
        },
        getNativeControl: function getNativeControl() {
          return _this2.nativeCb_;
        },
        forceLayout: function forceLayout() {
          return _this2.root_.offsetWidth;
        },
        isAttachedToDOM: function isAttachedToDOM() {
          return Boolean(_this2.root_.parentNode);
        }
      });
    }
  }, {
    key: 'nativeCb_',
    get: function get() {
      var NATIVE_CONTROL_SELECTOR = __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */].strings.NATIVE_CONTROL_SELECTOR;

      return this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
    }
  }, {
    key: 'checked',
    get: function get() {
      return this.foundation_.isChecked();
    },
    set: function set(checked) {
      this.foundation_.setChecked(checked);
    }
  }, {
    key: 'indeterminate',
    get: function get() {
      return this.foundation_.isIndeterminate();
    },
    set: function set(indeterminate) {
      this.foundation_.setIndeterminate(indeterminate);
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this.foundation_.isDisabled();
    },
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCCheckbox(root);
    }
  }]);

  return MDCCheckbox;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["a" /* MDCComponent */]);

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__temporary__ = __webpack_require__(138);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__temporary__["a"]; });
/* unused harmony reexport MDCTemporaryDrawerFoundation */
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strings; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ROOT = 'mdc-temporary-drawer';

var cssClasses = {
  ROOT: ROOT,
  OPEN: ROOT + '--open',
  ANIMATING: ROOT + '--animating',
  RIGHT: ROOT + '--right'
};

var strings = {
  DRAWER_SELECTOR: '.' + ROOT + '__drawer',
  OPACITY_VAR_NAME: '--' + ROOT + '-opacity',
  FOCUSABLE_ELEMENTS: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
};

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(136);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var MDCTemporaryDrawerFoundation = function (_MDCFoundation) {
  _inherits(MDCTemporaryDrawerFoundation, _MDCFoundation);

  _createClass(MDCTemporaryDrawerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */];
    }
  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */];
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        hasClass: function hasClass() /* className: string */{},
        hasNecessaryDom: function hasNecessaryDom() {
          return (/* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        setTranslateX: function setTranslateX() /* value: number | null */{},
        updateCssVariable: function updateCssVariable() /* value: string */{},
        getFocusableElements: function getFocusableElements() /* NodeList */{},
        saveElementTabState: function saveElementTabState() /* el: Element */{},
        restoreElementTabState: function restoreElementTabState() /* el: Element */{},
        makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
        isRtl: function isRtl() {
          return (/* boolean */false
          );
        },
        getDrawerWidth: function getDrawerWidth() {
          return (/* number */0
          );
        },
        isDrawer: function isDrawer() {
          return (/* el: Element */ /* boolean */false
          );
        }
      };
    }
  }]);

  function MDCTemporaryDrawerFoundation(adapter) {
    _classCallCheck(this, MDCTemporaryDrawerFoundation);

    var _this = _possibleConstructorReturn(this, (MDCTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation)).call(this, Object.assign(MDCTemporaryDrawerFoundation.defaultAdapter, adapter)));

    _this.transitionEndHandler_ = function (ev) {
      if (_this.adapter_.isDrawer(ev.target)) {
        _this.adapter_.removeClass(MDCTemporaryDrawerFoundation.cssClasses.ANIMATING);
        _this.adapter_.deregisterTransitionEndHandler(_this.transitionEndHandler_);
      }
    };

    _this.inert_ = false;

    _this.componentClickHandler_ = function () {
      return _this.close();
    };
    _this.drawerClickHandler_ = function (evt) {
      return evt.stopPropagation();
    };
    _this.componentTouchStartHandler_ = function (evt) {
      return _this.handleTouchStart_(evt);
    };
    _this.componentTouchMoveHandler_ = function (evt) {
      return _this.handleTouchMove_(evt);
    };
    _this.componentTouchEndHandler_ = function (evt) {
      return _this.handleTouchEnd_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.close();
      }
    };
    return _this;
  }

  _createClass(MDCTemporaryDrawerFoundation, [{
    key: 'init',
    value: function init() {
      var _MDCTemporaryDrawerFo = MDCTemporaryDrawerFoundation.cssClasses,
          ROOT = _MDCTemporaryDrawerFo.ROOT,
          OPEN = _MDCTemporaryDrawerFo.OPEN;


      if (!this.adapter_.hasClass(ROOT)) {
        throw new Error(ROOT + ' class required in root element.');
      }

      if (!this.adapter_.hasNecessaryDom()) {
        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
      }

      if (this.adapter_.hasClass(OPEN)) {
        this.isOpen_ = true;
      } else {
        this.detabinate_();
        this.isOpen_ = false;
      }

      // Make browser aware of custom property being used in this element.
      // Workaround for certain types of hard-to-reproduce heisenbugs.
      this.adapter_.updateCssVariable(0);

      this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.registerDrawerInteractionHandler('click', this.drawerClickHandler_);
      this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.deregisterDrawerInteractionHandler('click', this.drawerClickHandler_);
      this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
      // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    }
  }, {
    key: 'open',
    value: function open() {
      // Make sure custom property values are cleared before starting.
      this.adapter_.updateCssVariable('');

      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.addClass(MDCTemporaryDrawerFoundation.cssClasses.ANIMATING);
      this.adapter_.addClass(MDCTemporaryDrawerFoundation.cssClasses.OPEN);
      this.retabinate_();
      this.isOpen_ = true;
    }
  }, {
    key: 'close',
    value: function close() {
      // Make sure custom property values are cleared before making any changes.
      this.adapter_.updateCssVariable('');

      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.addClass(MDCTemporaryDrawerFoundation.cssClasses.ANIMATING);
      this.adapter_.removeClass(MDCTemporaryDrawerFoundation.cssClasses.OPEN);
      this.detabinate_();
      this.isOpen_ = false;
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isOpen_;
    }

    /**
     *  Render all children of the drawer inert when it's closed.
     */

  }, {
    key: 'detabinate_',
    value: function detabinate_() {
      if (this.inert_) {
        return;
      }

      var elements = this.adapter_.getFocusableElements();
      if (elements) {
        for (var i = 0; i < elements.length; i++) {
          this.adapter_.saveElementTabState(elements[i]);
          this.adapter_.makeElementUntabbable(elements[i]);
        }
      }

      this.inert_ = true;
    }

    /**
     *  Make all children of the drawer tabbable again when it's open.
     */

  }, {
    key: 'retabinate_',
    value: function retabinate_() {
      if (!this.inert_) {
        return;
      }

      var elements = this.adapter_.getFocusableElements();
      if (elements) {
        for (var i = 0; i < elements.length; i++) {
          this.adapter_.restoreElementTabState(elements[i]);
        }
      }

      this.inert_ = false;
    }
  }, {
    key: 'handleTouchStart_',
    value: function handleTouchStart_(evt) {
      if (!this.adapter_.hasClass(MDCTemporaryDrawerFoundation.cssClasses.OPEN)) {
        return;
      }
      if (evt.pointerType && evt.pointerType !== 'touch') {
        return;
      }

      this.direction_ = this.adapter_.isRtl() ? -1 : 1;
      this.drawerWidth_ = this.adapter_.getDrawerWidth();
      this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
      this.currentX_ = this.startX_;
      this.touchingSideNav_ = true;

      requestAnimationFrame(this.updateDrawer_.bind(this));
    }
  }, {
    key: 'handleTouchMove_',
    value: function handleTouchMove_(evt) {
      if (evt.pointerType && evt.pointerType !== 'touch') {
        return;
      }

      this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    }
  }, {
    key: 'handleTouchEnd_',
    value: function handleTouchEnd_(evt) {
      if (evt.pointerType && evt.pointerType !== 'touch') {
        return;
      }

      this.touchingSideNav_ = false;
      this.adapter_.setTranslateX(null);
      this.adapter_.updateCssVariable('');

      var newPos = null;
      if (this.direction_ === 1) {
        newPos = Math.min(0, this.currentX_ - this.startX_);
      } else {
        newPos = Math.max(0, this.currentX_ - this.startX_);
      }

      // Did the user close the drawer by more than 50%?
      if (Math.abs(newPos / this.drawerWidth_) >= 0.5) {
        this.close();
      } else {
        // Triggering an open here means we'll get a nice animation back to the fully open state.
        this.open();
      }
    }
  }, {
    key: 'updateDrawer_',
    value: function updateDrawer_() {
      if (!this.touchingSideNav_) {
        return;
      }

      requestAnimationFrame(this.updateDrawer_.bind(this));

      var newPos = null;
      var newOpacity = null;

      if (this.direction_ === 1) {
        newPos = Math.min(0, this.currentX_ - this.startX_);
      } else {
        newPos = Math.max(0, this.currentX_ - this.startX_);
      }

      newOpacity = Math.max(0, 1 + this.direction_ * (newPos / this.drawerWidth_));

      this.adapter_.setTranslateX(newPos);
      this.adapter_.updateCssVariable(newOpacity);
    }
  }]);

  return MDCTemporaryDrawerFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["b" /* MDCFoundation */]);

/* harmony default export */ __webpack_exports__["a"] = MDCTemporaryDrawerFoundation;

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(139);
/* unused harmony reexport MDCTemporaryDrawerFoundation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCTemporaryDrawer; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var MDCTemporaryDrawer = function (_MDCComponent) {
  _inherits(MDCTemporaryDrawer, _MDCComponent);

  function MDCTemporaryDrawer() {
    _classCallCheck(this, MDCTemporaryDrawer);

    return _possibleConstructorReturn(this, (MDCTemporaryDrawer.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawer)).apply(this, arguments));
  }

  _createClass(MDCTemporaryDrawer, [{
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      var _MDCTemporaryDrawerFo = __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings,
          FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
          OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


      return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */]({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        hasClass: function hasClass(className) {
          return _this2.root_.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this2.drawer);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          return _this2.root_.addEventListener(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* remapEvent */](evt), handler, __WEBPACK_IMPORTED_MODULE_2__util__["b" /* applyPassive */]());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          return _this2.root_.removeEventListener(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* remapEvent */](evt), handler, __WEBPACK_IMPORTED_MODULE_2__util__["b" /* applyPassive */]());
        },
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
          return _this2.drawer.addEventListener(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* remapEvent */](evt), handler);
        },
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
          return _this2.drawer.removeEventListener(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* remapEvent */](evt), handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          return _this2.drawer.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          return _this2.drawer.removeEventListener('transitionend', handler);
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          return document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          return document.removeEventListener('keydown', handler);
        },
        getDrawerWidth: function getDrawerWidth() {
          return _this2.drawer.offsetWidth;
        },
        setTranslateX: function setTranslateX(value) {
          return _this2.drawer.style.setProperty(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* getTransformPropertyName */](), value === null ? null : 'translateX(' + value + 'px)');
        },
        updateCssVariable: function updateCssVariable(value) {
          if (__WEBPACK_IMPORTED_MODULE_2__util__["d" /* supportsCssCustomProperties */]()) {
            _this2.root_.style.setProperty(OPACITY_VAR_NAME, value);
          }
        },
        getFocusableElements: function getFocusableElements() {
          return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
        },
        saveElementTabState: function saveElementTabState(el) {
          return __WEBPACK_IMPORTED_MODULE_2__util__["e" /* saveElementTabState */](el);
        },
        restoreElementTabState: function restoreElementTabState(el) {
          return __WEBPACK_IMPORTED_MODULE_2__util__["f" /* restoreElementTabState */](el);
        },
        makeElementUntabbable: function makeElementUntabbable(el) {
          return el.setAttribute('tabindex', -1);
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
        },
        isDrawer: function isDrawer(el) {
          return el === _this2.drawer;
        }
      });
    }
  }, {
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }

    /* Return the drawer element inside the component. */

  }, {
    key: 'drawer',
    get: function get() {
      return this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.DRAWER_SELECTOR);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCTemporaryDrawer(root);
    }
  }]);

  return MDCTemporaryDrawer;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["a" /* MDCComponent */]);

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = remapEvent;
/* harmony export (immutable) */ __webpack_exports__["c"] = getTransformPropertyName;
/* harmony export (immutable) */ __webpack_exports__["d"] = supportsCssCustomProperties;
/* harmony export (immutable) */ __webpack_exports__["b"] = applyPassive;
/* harmony export (immutable) */ __webpack_exports__["e"] = saveElementTabState;
/* harmony export (immutable) */ __webpack_exports__["f"] = restoreElementTabState;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TAB_DATA = 'data-mdc-tabindex';
var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

var storedTransformPropertyName_ = void 0;
var supportsPassive_ = void 0;

// Remap touch events to pointer events, if the browser doesn't support touch events.
function remapEvent(eventName) {
  var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
      case 'touchstart':
        return 'pointerdown';
      case 'touchmove':
        return 'pointermove';
      case 'touchend':
        return 'pointerup';
      default:
        return eventName;
    }
  }

  return eventName;
}

// Choose the correct transform property to use on the current browser.
function getTransformPropertyName() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

// Determine whether the current browser supports CSS properties.
function supportsCssCustomProperties() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

// Save the tab state for an element.
function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

// Restore the tab state for an element, if it was saved.
function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
  }
}

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var ROOT = 'mdc-icon-toggle';

var MDCIconToggleFoundation = function (_MDCFoundation) {
  _inherits(MDCIconToggleFoundation, _MDCFoundation);

  _createClass(MDCIconToggleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return {
        ROOT: ROOT,
        DISABLED: ROOT + '--disabled'
      };
    }
  }, {
    key: 'strings',
    get: function get() {
      return {
        DATA_TOGGLE_ON: 'data-toggle-on',
        DATA_TOGGLE_OFF: 'data-toggle-off',
        ARIA_PRESSED: 'aria-pressed',
        ARIA_DISABLED: 'aria-disabled',
        ARIA_LABEL: 'aria-label'
      };
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
        setText: function setText() /* text: string */{},
        getTabIndex: function getTabIndex() {
          return (/* number */0
          );
        },
        setTabIndex: function setTabIndex() /* tabIndex: number */{},
        getAttr: function getAttr() {
          return (/* name: string */ /* string */''
          );
        },
        setAttr: function setAttr() /* name: string, value: string */{},
        rmAttr: function rmAttr() /* name: string */{},
        notifyChange: function notifyChange() /* evtData: {isOn: boolean} */{}
      };
    }
  }]);

  function MDCIconToggleFoundation(adapter) {
    _classCallCheck(this, MDCIconToggleFoundation);

    var _this = _possibleConstructorReturn(this, (MDCIconToggleFoundation.__proto__ || Object.getPrototypeOf(MDCIconToggleFoundation)).call(this, Object.assign(MDCIconToggleFoundation.defaultAdapter, adapter)));

    _this.on_ = false;
    _this.disabled_ = false;
    _this.savedTabIndex_ = -1;
    _this.toggleOnData_ = null;
    _this.toggleOffData_ = null;
    _this.clickHandler_ = function () {
      return _this.toggleFromEvt_();
    };
    _this.isHandlingKeydown_ = false;
    _this.keydownHandler_ = function (evt) {
      if (isSpace(evt)) {
        _this.isHandlingKeydown_ = true;
        return evt.preventDefault();
      }
    };
    _this.keyupHandler_ = function (evt) {
      if (isSpace(evt)) {
        _this.isHandlingKeydown_ = false;
        _this.toggleFromEvt_();
      }
    };
    return _this;
  }

  _createClass(MDCIconToggleFoundation, [{
    key: 'init',
    value: function init() {
      this.refreshToggleData();
      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
    }
  }, {
    key: 'refreshToggleData',
    value: function refreshToggleData() {
      var _MDCIconToggleFoundat = MDCIconToggleFoundation.strings,
          DATA_TOGGLE_ON = _MDCIconToggleFoundat.DATA_TOGGLE_ON,
          DATA_TOGGLE_OFF = _MDCIconToggleFoundat.DATA_TOGGLE_OFF;

      this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
      this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
    }
  }, {
    key: 'toggleFromEvt_',
    value: function toggleFromEvt_() {
      this.toggle();
      var isOn = this.on_;

      this.adapter_.notifyChange({ isOn: isOn });
    }
  }, {
    key: 'isOn',
    value: function isOn() {
      return this.on_;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.on_;

      this.on_ = isOn;

      var _MDCIconToggleFoundat2 = MDCIconToggleFoundation.strings,
          ARIA_LABEL = _MDCIconToggleFoundat2.ARIA_LABEL,
          ARIA_PRESSED = _MDCIconToggleFoundat2.ARIA_PRESSED;

      var _ref = this.on_ ? this.toggleOnData_ : this.toggleOffData_,
          content = _ref.content,
          label = _ref.label,
          cssClass = _ref.cssClass;

      var _ref2 = this.on_ ? this.toggleOffData_ : this.toggleOnData_,
          classToRemove = _ref2.cssClass;

      if (this.on_) {
        this.adapter_.setAttr(ARIA_PRESSED, 'true');
      } else {
        this.adapter_.setAttr(ARIA_PRESSED, 'false');
      }

      if (classToRemove) {
        this.adapter_.removeClass(classToRemove);
      }
      if (cssClass) {
        this.adapter_.addClass(cssClass);
      }
      if (content) {
        this.adapter_.setText(content);
      }
      if (label) {
        this.adapter_.setAttr(ARIA_LABEL, label);
      }
    }
  }, {
    key: 'parseJsonDataAttr_',
    value: function parseJsonDataAttr_(dataAttr) {
      var val = this.adapter_.getAttr(dataAttr);
      if (!val) {
        return {};
      }
      return JSON.parse(val);
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.disabled_;
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(isDisabled) {
      this.disabled_ = isDisabled;

      var DISABLED = MDCIconToggleFoundation.cssClasses.DISABLED;
      var ARIA_DISABLED = MDCIconToggleFoundation.strings.ARIA_DISABLED;


      if (this.disabled_) {
        this.savedTabIndex = this.adapter_.getTabIndex();
        this.adapter_.setTabIndex(-1);
        this.adapter_.setAttr(ARIA_DISABLED, 'true');
        this.adapter_.addClass(DISABLED);
      } else {
        this.adapter_.setTabIndex(this.savedTabIndex);
        this.adapter_.rmAttr(ARIA_DISABLED);
        this.adapter_.removeClass(DISABLED);
      }
    }
  }, {
    key: 'isKeyboardActivated',
    value: function isKeyboardActivated() {
      return this.isHandlingKeydown_;
    }
  }]);

  return MDCIconToggleFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["b" /* MDCFoundation */]);

/* harmony default export */ __webpack_exports__["a"] = MDCIconToggleFoundation;


function isSpace(_ref3) {
  var key = _ref3.key,
      keyCode = _ref3.keyCode;

  return key && key === 'Space' || keyCode === 32;
}

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_ripple__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(140);
/* unused harmony reexport MDCIconToggleFoundation */
/* unused harmony export MDCIconToggle */
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var MDCIconToggle = function (_MDCComponent) {
  _inherits(MDCIconToggle, _MDCComponent);

  _createClass(MDCIconToggle, null, [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCIconToggle(root);
    }
  }]);

  function MDCIconToggle() {
    var _ref;

    _classCallCheck(this, MDCIconToggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCIconToggle.__proto__ || Object.getPrototypeOf(MDCIconToggle)).call.apply(_ref, [this].concat(args)));

    _this.ripple_ = _this.initRipple_();
    return _this;
  }

  _createClass(MDCIconToggle, [{
    key: 'initRipple_',
    value: function initRipple_() {
      var _this2 = this;

      var adapter = Object.assign(__WEBPACK_IMPORTED_MODULE_1__material_ripple__["a" /* MDCRipple */].createAdapter(this), {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return _this2.foundation_.isKeyboardActivated();
        },
        computeBoundingRect: function computeBoundingRect() {
          var dim = 48;

          var _root_$getBoundingCli = _this2.root_.getBoundingClientRect(),
              left = _root_$getBoundingCli.left,
              top = _root_$getBoundingCli.top;

          return {
            left: left,
            top: top,
            width: dim,
            height: dim,
            right: left + dim,
            bottom: left + dim
          };
        }
      });
      var foundation = new __WEBPACK_IMPORTED_MODULE_1__material_ripple__["b" /* MDCRippleFoundation */](adapter);
      return new __WEBPACK_IMPORTED_MODULE_1__material_ripple__["a" /* MDCRipple */](this.root_, foundation);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.ripple_.destroy();
      _get(MDCIconToggle.prototype.__proto__ || Object.getPrototypeOf(MDCIconToggle.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this3 = this;

      return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */]({
        addClass: function addClass(className) {
          return _this3.iconEl_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this3.iconEl_.classList.remove(className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this3.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this3.root_.removeEventListener(type, handler);
        },
        setText: function setText(text) {
          _this3.iconEl_.textContent = text;
        },
        getTabIndex: function getTabIndex() {
          return (/* number */_this3.root_.tabIndex
          );
        },
        setTabIndex: function setTabIndex(tabIndex) {
          _this3.root_.tabIndex = tabIndex;
        },
        getAttr: function getAttr(name, value) {
          return _this3.root_.getAttribute(name, value);
        },
        setAttr: function setAttr(name, value) {
          return _this3.root_.setAttribute(name, value);
        },
        rmAttr: function rmAttr(name, value) {
          return _this3.root_.removeAttribute(name, value);
        },
        notifyChange: function notifyChange(evtData) {
          return _this3.emit('MDCIconToggle:change', evtData);
        }
      });
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      this.on = this.root_.getAttribute(__WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */].strings.ARIA_PRESSED) === 'true';
      this.disabled = this.root_.getAttribute(__WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */].strings.ARIA_DISABLED) === 'true';
    }
  }, {
    key: 'refreshToggleData',
    value: function refreshToggleData() {
      this.foundation_.refreshToggleData();
    }
  }, {
    key: 'iconEl_',
    get: function get() {
      var sel = this.root_.dataset.iconInnerSelector;

      return sel ? this.root_.querySelector(sel) : this.root_;
    }
  }, {
    key: 'on',
    get: function get() {
      return this.foundation_.isOn();
    },
    set: function set(isOn) {
      this.foundation_.toggle(isOn);
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this.foundation_.isDisabled();
    },
    set: function set(isDisabled) {
      this.foundation_.setDisabled(isDisabled);
    }
  }]);

  return MDCIconToggle;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["a" /* MDCComponent */]);

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ROOT */
/* unused harmony export UPGRADED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return numbers; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ROOT = 'mdc-ripple';
var UPGRADED = ROOT + '-upgraded';

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: UPGRADED,
  UNBOUNDED: UPGRADED + '--unbounded',
  BG_ACTIVE: UPGRADED + '--background-active',
  BG_BOUNDED_ACTIVE_FILL: UPGRADED + '--background-bounded-active-fill',
  FG_BOUNDED_ACTIVE_FILL: UPGRADED + '--foreground-bounded-active-fill',
  FG_UNBOUNDED_ACTIVATION: UPGRADED + '--foreground-unbounded-activation',
  FG_UNBOUNDED_DEACTIVATION: UPGRADED + '--foreground-unbounded-deactivation'
};

var strings = {
  VAR_SURFACE_WIDTH: '--' + ROOT + '-surface-width',
  VAR_SURFACE_HEIGHT: '--' + ROOT + '-surface-height',
  VAR_FG_SIZE: '--' + ROOT + '-fg-size',
  VAR_FG_UNBOUNDED_OPACITY_DURATION: '--' + ROOT + '-fg-unbounded-opacity-duration',
  VAR_FG_UNBOUNDED_TRANSFORM_DURATION: '--' + ROOT + '-fg-unbounded-transform-duration',
  VAR_LEFT: '--' + ROOT + '-left',
  VAR_TOP: '--' + ROOT + '-top',
  VAR_XF_ORIGIN_X: '--' + ROOT + '-xfo-x',
  VAR_XF_ORIGIN_Y: '--' + ROOT + '-xfo-y',
  VAR_FG_APPROX_XF: '--' + ROOT + '-fg-approx-xf'
};

var numbers = {
  FG_TRANSFORM_DELAY_MS: 80,
  OPACITY_DURATION_DIVISOR: 3,
  ACTIVE_OPACITY_DURATION_MS: 110,
  MIN_OPACITY_DURATION_MS: 200,
  UNBOUNDED_TRANSFORM_DURATION_MS: 200
};

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_animation__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(90);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var DEACTIVATION_ACTIVATION_PAIRS = {
  mouseup: 'mousedown',
  pointerup: 'pointerdown',
  touchend: 'touchstart',
  keyup: 'keydown',
  blur: 'focus'
};

var MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  _createClass(MDCRippleFoundation, [{
    key: 'isSupported_',


    // We compute this property so that we are not querying information about the client
    // until the point in time where the foundation requests it. This prevents scenarios where
    // client-side feature-detection may happen too early, such as when components are rendered on the server
    // and then initialized at mount time on the client.
    get: function get() {
      return this.adapter_.browserSupportsCssVars();
    }
  }], [{
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */];
    }
  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* strings */];
    }
  }, {
    key: 'numbers',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* numbers */];
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    _classCallCheck(this, MDCRippleFoundation);

    var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, Object.assign(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;
    _this.frame_ = { width: 0, height: 0 };
    _this.activationState_ = _this.defaultActivationState_();
    _this.xfDuration_ = 0;
    _this.maxRadius = 0;
    _this.listenerInfos_ = [{ activate: 'touchstart', deactivate: 'touchend' }, { activate: 'pointerdown', deactivate: 'pointerup' }, { activate: 'mousedown', deactivate: 'mouseup' }, { activate: 'keydown', deactivate: 'keyup' }, { focus: 'focus', blur: 'blur' }];
    _this.listeners_ = {
      activate: function activate(e) {
        return _this.activate_(e);
      },
      deactivate: function deactivate(e) {
        return _this.deactivate_(e);
      },
      focus: function focus() {
        return requestAnimationFrame(function () {
          return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_ACTIVE);
        });
      },
      blur: function blur() {
        return requestAnimationFrame(function () {
          return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_ACTIVE);
        });
      }
    };
    _this.unboundedOpacityFadeTimer_ = 0;
    _this.resizeHandler_ = function () {
      return _this.layout();
    };
    _this.cancelBgBounded_ = function () {};
    _this.cancelFgBounded_ = function () {};
    _this.cancelFgUnbounded_ = function () {};
    return _this;
  }

  _createClass(MDCRippleFoundation, [{
    key: 'defaultActivationState_',
    value: function defaultActivationState_() {
      return {
        isActivated: false,
        wasActivatedByPointer: false,
        wasElementMadeActive: false,
        activationStartTime: 0,
        activationEvent: null
      };
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (!this.isSupported_) {
        return;
      }
      this.addEventListeners_();

      var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$.ROOT,
          UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

      requestAnimationFrame(function () {
        _this2.adapter_.addClass(ROOT);
        if (_this2.adapter_.isUnbounded()) {
          _this2.adapter_.addClass(UNBOUNDED);
        }
        _this2.layoutInternal_();
      });
    }
  }, {
    key: 'addEventListeners_',
    value: function addEventListeners_() {
      var _this3 = this;

      this.listenerInfos_.forEach(function (info) {
        Object.keys(info).forEach(function (k) {
          _this3.adapter_.registerInteractionHandler(info[k], _this3.listeners_[k]);
        });
      });
      this.adapter_.registerResizeHandler(this.resizeHandler_);
    }
  }, {
    key: 'activate_',
    value: function activate_(e) {
      var _this4 = this;

      var activationState = this.activationState_;

      if (activationState.isActivated) {
        return;
      }

      activationState.isActivated = true;
      activationState.activationEvent = e;
      activationState.wasActivatedByPointer = e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

      activationState.activationStartTime = Date.now();
      requestAnimationFrame(function () {
        // This needs to be wrapped in an rAF call b/c web browsers
        // report active states inconsistently when they're called within
        // event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        activationState.wasElementMadeActive = e.type === 'keydown' ? _this4.adapter_.isSurfaceActive() : true;
        if (activationState.wasElementMadeActive) {
          _this4.animateActivation_();
        } else {
          // Reset activation state immediately if element was not made active.
          _this4.activationState_ = _this4.defaultActivationState_();
        }
      });
    }
  }, {
    key: 'animateActivation_',
    value: function animateActivation_() {
      var _this5 = this;

      var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
          BG_ACTIVE = _MDCRippleFoundation$2.BG_ACTIVE,
          BG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$2.BG_BOUNDED_ACTIVE_FILL,
          FG_UNBOUNDED_DEACTIVATION = _MDCRippleFoundation$2.FG_UNBOUNDED_DEACTIVATION,
          FG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$2.FG_BOUNDED_ACTIVE_FILL;

      // If ripple is currently deactivating, cancel those animations.

      [BG_BOUNDED_ACTIVE_FILL, FG_UNBOUNDED_DEACTIVATION, FG_BOUNDED_ACTIVE_FILL].forEach(function (c) {
        return _this5.adapter_.removeClass(c);
      });
      this.cancelBgBounded_();
      this.cancelFgBounded_();
      this.cancelFgUnbounded_();
      if (this.unboundedOpacityFadeTimer_) {
        clearTimeout(this.unboundedOpacityFadeTimer_);
        this.unboundedOpacityFadeTimer_ = 0;
      }

      this.adapter_.addClass(BG_ACTIVE);
      if (this.adapter_.isUnbounded()) {
        this.animateUnboundedActivation_();
      }
    }
  }, {
    key: 'animateUnboundedActivation_',
    value: function animateUnboundedActivation_() {
      var FG_UNBOUNDED_ACTIVATION = MDCRippleFoundation.cssClasses.FG_UNBOUNDED_ACTIVATION;

      var startPoint = void 0;
      if (this.activationState_.wasActivatedByPointer) {
        startPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["c" /* getNormalizedEventCoords */])(this.activationState_.activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
      } else {
        startPoint = {
          left: this.frame_.width / 2,
          top: this.frame_.height / 2
        };
      }
      var _startPoint = startPoint,
          left = _startPoint.left,
          top = _startPoint.top;
      var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
          VAR_XF_ORIGIN_X = _MDCRippleFoundation$3.VAR_XF_ORIGIN_X,
          VAR_XF_ORIGIN_Y = _MDCRippleFoundation$3.VAR_XF_ORIGIN_Y;

      this.adapter_.updateCssVariable(VAR_XF_ORIGIN_X, left + 'px');
      this.adapter_.updateCssVariable(VAR_XF_ORIGIN_Y, top + 'px');
      this.adapter_.addClass(FG_UNBOUNDED_ACTIVATION);
    }
  }, {
    key: 'deactivate_',
    value: function deactivate_(e) {
      var _this6 = this;

      var activationState = this.activationState_;
      // This can happen in scenarios such as when you have a keyup event that blurs the element.

      if (!activationState.isActivated) {
        return;
      }
      var actualActivationType = DEACTIVATION_ACTIVATION_PAIRS[e.type];
      var expectedActivationType = activationState.activationEvent.type;
      // NOTE: Pointer events are tricky - https://patrickhlauke.github.io/touch/tests/results/
      // Essentially, what we need to do here is decouple the deactivation UX from the actual
      // deactivation state itself. This way, touch/pointer events in sequence do not trample one
      // another.
      var needsDeactivationUX = actualActivationType === expectedActivationType;
      var needsActualDeactivation = needsDeactivationUX;
      if (activationState.wasActivatedByPointer) {
        needsActualDeactivation = e.type === 'mouseup';
      }

      var state = Object.assign({}, this.activationState_);
      if (needsDeactivationUX) {
        requestAnimationFrame(function () {
          return _this6.animateDeactivation_(e, state);
        });
      }
      if (needsActualDeactivation) {
        this.activationState_ = this.defaultActivationState_();
      }
    }
  }, {
    key: 'animateDeactivation_',
    value: function animateDeactivation_(e, _ref) {
      var wasActivatedByPointer = _ref.wasActivatedByPointer,
          wasElementMadeActive = _ref.wasElementMadeActive,
          activationStartTime = _ref.activationStartTime;
      var BG_ACTIVE = MDCRippleFoundation.cssClasses.BG_ACTIVE;

      if (wasActivatedByPointer || wasElementMadeActive) {
        this.adapter_.removeClass(BG_ACTIVE);
        var isPointerEvent = e.type === 'touchend' || e.type === 'pointerup' || e.type === 'mouseup';
        if (this.adapter_.isUnbounded()) {
          this.animateUnboundedDeactivation_(this.getUnboundedDeactivationInfo_(activationStartTime));
        } else {
          this.animateBoundedDeactivation_(e, isPointerEvent);
        }
      }
    }
  }, {
    key: 'animateUnboundedDeactivation_',
    value: function animateUnboundedDeactivation_(_ref2) {
      var _this7 = this;

      var opacityDuration = _ref2.opacityDuration,
          transformDuration = _ref2.transformDuration,
          approxCurScale = _ref2.approxCurScale;
      var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
          FG_UNBOUNDED_ACTIVATION = _MDCRippleFoundation$4.FG_UNBOUNDED_ACTIVATION,
          FG_UNBOUNDED_DEACTIVATION = _MDCRippleFoundation$4.FG_UNBOUNDED_DEACTIVATION;
      var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
          VAR_FG_UNBOUNDED_OPACITY_DURATION = _MDCRippleFoundation$5.VAR_FG_UNBOUNDED_OPACITY_DURATION,
          VAR_FG_UNBOUNDED_TRANSFORM_DURATION = _MDCRippleFoundation$5.VAR_FG_UNBOUNDED_TRANSFORM_DURATION,
          VAR_FG_APPROX_XF = _MDCRippleFoundation$5.VAR_FG_APPROX_XF;

      this.adapter_.updateCssVariable(VAR_FG_APPROX_XF, 'scale(' + approxCurScale + ')');
      this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_OPACITY_DURATION, opacityDuration + 'ms');
      this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_TRANSFORM_DURATION, transformDuration + 'ms');
      this.adapter_.addClass(FG_UNBOUNDED_DEACTIVATION);
      this.adapter_.removeClass(FG_UNBOUNDED_ACTIVATION);
      // We use setTimeout here since we know how long the fade will take.
      this.unboundedOpacityFadeTimer_ = setTimeout(function () {
        _this7.adapter_.removeClass(FG_UNBOUNDED_DEACTIVATION);
      }, opacityDuration);
    }
  }, {
    key: 'getUnboundedDeactivationInfo_',
    value: function getUnboundedDeactivationInfo_(activationStartTime) {
      var msElapsed = Date.now() - activationStartTime;
      var _MDCRippleFoundation$6 = MDCRippleFoundation.numbers,
          FG_TRANSFORM_DELAY_MS = _MDCRippleFoundation$6.FG_TRANSFORM_DELAY_MS,
          OPACITY_DURATION_DIVISOR = _MDCRippleFoundation$6.OPACITY_DURATION_DIVISOR,
          ACTIVE_OPACITY_DURATION_MS = _MDCRippleFoundation$6.ACTIVE_OPACITY_DURATION_MS,
          UNBOUNDED_TRANSFORM_DURATION_MS = _MDCRippleFoundation$6.UNBOUNDED_TRANSFORM_DURATION_MS,
          MIN_OPACITY_DURATION_MS = _MDCRippleFoundation$6.MIN_OPACITY_DURATION_MS;


      var approxCurScale = 0;
      if (msElapsed > FG_TRANSFORM_DELAY_MS) {
        approxCurScale = Math.min((msElapsed - FG_TRANSFORM_DELAY_MS) / this.xfDuration_, 1);
      }

      var transformDuration = UNBOUNDED_TRANSFORM_DURATION_MS;
      var approxOpacity = Math.min(msElapsed / ACTIVE_OPACITY_DURATION_MS, 1);
      var opacityDuration = Math.max(MIN_OPACITY_DURATION_MS, 1000 * approxOpacity / OPACITY_DURATION_DIVISOR);

      return { transformDuration: transformDuration, opacityDuration: opacityDuration, approxCurScale: approxCurScale };
    }
  }, {
    key: 'animateBoundedDeactivation_',
    value: function animateBoundedDeactivation_(e, isPointerEvent) {
      var startPoint = void 0;
      if (isPointerEvent) {
        startPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["c" /* getNormalizedEventCoords */])(e, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
      } else {
        startPoint = {
          left: this.frame_.width / 2,
          top: this.frame_.height / 2
        };
      }
      var _startPoint2 = startPoint,
          left = _startPoint2.left,
          top = _startPoint2.top;
      var _MDCRippleFoundation$7 = MDCRippleFoundation.strings,
          VAR_LEFT = _MDCRippleFoundation$7.VAR_LEFT,
          VAR_TOP = _MDCRippleFoundation$7.VAR_TOP;
      var _MDCRippleFoundation$8 = MDCRippleFoundation.cssClasses,
          BG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$8.BG_BOUNDED_ACTIVE_FILL,
          FG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$8.FG_BOUNDED_ACTIVE_FILL;

      this.adapter_.updateCssVariable(VAR_LEFT, left + 'px');
      this.adapter_.updateCssVariable(VAR_TOP, top + 'px');
      this.cancelBgBounded_ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["d" /* animateWithClass */])(this.adapter_, BG_BOUNDED_ACTIVE_FILL, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__material_animation__["a" /* getCorrectEventName */])(window, 'transitionend'));
      this.cancelFgBounded_ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["d" /* animateWithClass */])(this.adapter_, FG_BOUNDED_ACTIVE_FILL, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__material_animation__["a" /* getCorrectEventName */])(window, 'animationend'));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this8 = this;

      if (!this.isSupported_) {
        return;
      }
      this.removeEventListeners_();

      var _MDCRippleFoundation$9 = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$9.ROOT,
          UNBOUNDED = _MDCRippleFoundation$9.UNBOUNDED;

      requestAnimationFrame(function () {
        _this8.adapter_.removeClass(ROOT);
        _this8.adapter_.removeClass(UNBOUNDED);
        _this8.removeCssVars_();
      });
    }
  }, {
    key: 'removeEventListeners_',
    value: function removeEventListeners_() {
      var _this9 = this;

      this.listenerInfos_.forEach(function (info) {
        Object.keys(info).forEach(function (k) {
          _this9.adapter_.deregisterInteractionHandler(info[k], _this9.listeners_[k]);
        });
      });
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }, {
    key: 'removeCssVars_',
    value: function removeCssVars_() {
      var _this10 = this;

      var strings = MDCRippleFoundation.strings;

      Object.keys(strings).forEach(function (k) {
        if (k.indexOf('VAR_') === 0) {
          _this10.adapter_.updateCssVariable(strings[k], null);
        }
      });
    }
  }, {
    key: 'layout',
    value: function layout() {
      var _this11 = this;

      if (this.layoutFrame_) {
        cancelAnimationFrame(this.layoutFrame_);
      }
      this.layoutFrame_ = requestAnimationFrame(function () {
        _this11.layoutInternal_();
        _this11.layoutFrame_ = 0;
      });
    }
  }, {
    key: 'layoutInternal_',
    value: function layoutInternal_() {
      this.frame_ = this.adapter_.computeBoundingRect();

      var maxDim = Math.max(this.frame_.height, this.frame_.width);

      // Sqrt(2) * square length == diameter
      this.maxRadius_ = Math.sqrt(2) * maxDim / 2;
      this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
      this.updateLayoutCssVars_();
    }
  }, {
    key: 'updateLayoutCssVars_',
    value: function updateLayoutCssVars_() {
      var fgSize = this.maxRadius_ * 2;
      var _MDCRippleFoundation$10 = MDCRippleFoundation.strings,
          VAR_SURFACE_WIDTH = _MDCRippleFoundation$10.VAR_SURFACE_WIDTH,
          VAR_SURFACE_HEIGHT = _MDCRippleFoundation$10.VAR_SURFACE_HEIGHT,
          VAR_FG_SIZE = _MDCRippleFoundation$10.VAR_FG_SIZE,
          VAR_FG_UNBOUNDED_TRANSFORM_DURATION = _MDCRippleFoundation$10.VAR_FG_UNBOUNDED_TRANSFORM_DURATION,
          VAR_LEFT = _MDCRippleFoundation$10.VAR_LEFT,
          VAR_TOP = _MDCRippleFoundation$10.VAR_TOP;


      this.adapter_.updateCssVariable(VAR_SURFACE_WIDTH, this.frame_.width + 'px');
      this.adapter_.updateCssVariable(VAR_SURFACE_HEIGHT, this.frame_.height + 'px');
      this.adapter_.updateCssVariable(VAR_FG_SIZE, fgSize + 'px');
      this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_TRANSFORM_DURATION, this.xfDuration_ + 'ms');

      if (this.adapter_.isUnbounded()) {
        var left = -(fgSize / 2) + this.frame_.width / 2;
        var top = -(fgSize / 2) + this.frame_.height / 2;
        this.adapter_.updateCssVariable(VAR_LEFT, left + 'px');
        this.adapter_.updateCssVariable(VAR_TOP, top + 'px');
      }
    }
  }]);

  return MDCRippleFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["b" /* MDCFoundation */]);

/* harmony default export */ __webpack_exports__["a"] = MDCRippleFoundation;

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return numbers; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ROOT = 'mdc-snackbar';

var cssClasses = {
  ROOT: ROOT,
  TEXT: ROOT + '__text',
  ACTION_WRAPPER: ROOT + '__action-wrapper',
  ACTION_BUTTON: ROOT + '__action-button',
  ACTIVE: ROOT + '--active',
  MULTILINE: ROOT + '--multiline',
  ACTION_ON_BOTTOM: ROOT + '--action-on-bottom'
};

var strings = {
  get TEXT_SELECTOR() {
    return '.' + cssClasses.TEXT;
  },

  get ACTION_WRAPPER_SELECTOR() {
    return '.' + cssClasses.ACTION_WRAPPER;
  },

  get ACTION_BUTTON_SELECTOR() {
    return '.' + cssClasses.ACTION_BUTTON;
  }
};

var numbers = {
  MESSAGE_TIMEOUT: 2750
};

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(144);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var MDCSnackbarFoundation = function (_MDCFoundation) {
  _inherits(MDCSnackbarFoundation, _MDCFoundation);

  _createClass(MDCSnackbarFoundation, [{
    key: 'active',
    get: function get() {
      return this.active_;
    }
  }], [{
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */];
    }
  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* strings */];
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        setAriaHidden: function setAriaHidden() {},
        unsetAriaHidden: function unsetAriaHidden() {},
        setMessageText: function setMessageText() /* message: string */{},
        setActionText: function setActionText() /* actionText: string */{},
        setActionAriaHidden: function setActionAriaHidden() {},
        unsetActionAriaHidden: function unsetActionAriaHidden() {},
        registerActionClickHandler: function registerActionClickHandler() /* handler: EventListener */{},
        deregisterActionClickHandler: function deregisterActionClickHandler() /* handler: EventListener */{},
        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{}
      };
    }
  }]);

  function MDCSnackbarFoundation(adapter) {
    _classCallCheck(this, MDCSnackbarFoundation);

    var _this = _possibleConstructorReturn(this, (MDCSnackbarFoundation.__proto__ || Object.getPrototypeOf(MDCSnackbarFoundation)).call(this, Object.assign(MDCSnackbarFoundation.defaultAdapter, adapter)));

    _this.active_ = false;
    _this.queue_ = [];
    _this.actionClickHandler_ = function () {
      return _this.invokeAction_();
    };
    return _this;
  }

  _createClass(MDCSnackbarFoundation, [{
    key: 'init',
    value: function init() {
      this.adapter_.registerActionClickHandler(this.actionClickHandler_);
      this.adapter_.setAriaHidden();
      this.adapter_.setActionAriaHidden();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
    }
  }, {
    key: 'show',
    value: function show(data) {
      if (!data) {
        throw new Error('Please provide a data object with at least a message to display.');
      }
      if (!data.message) {
        throw new Error('Please provide a message to be displayed.');
      }
      if (data.actionHandler && !data.actionText) {
        throw new Error('Please provide action text with the handler.');
      }

      if (this.active) {
        this.queue_.push(data);
        return;
      }

      var ACTIVE = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */].ACTIVE,
          MULTILINE = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */].MULTILINE,
          ACTION_ON_BOTTOM = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */].ACTION_ON_BOTTOM;
      var MESSAGE_TIMEOUT = __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* numbers */].MESSAGE_TIMEOUT;


      this.adapter_.setMessageText(data.message);

      if (data.multiline) {
        this.adapter_.addClass(MULTILINE);
        if (data.actionOnBottom) {
          this.adapter_.addClass(ACTION_ON_BOTTOM);
        }
      }

      if (data.actionHandler) {
        this.adapter_.setActionText(data.actionText);
        this.actionHandler_ = data.actionHandler;
        this.setActionHidden_(false);
      } else {
        this.setActionHidden_(true);
        this.actionHandler_ = null;
        this.adapter_.setActionText(null);
      }

      this.active_ = true;
      this.adapter_.addClass(ACTIVE);
      this.adapter_.unsetAriaHidden();

      setTimeout(this.cleanup_.bind(this), data.timeout || MESSAGE_TIMEOUT);
    }
  }, {
    key: 'invokeAction_',
    value: function invokeAction_() {
      if (!this.actionHandler_) {
        return;
      }

      this.actionHandler_();
    }
  }, {
    key: 'cleanup_',
    value: function cleanup_() {
      var _this2 = this;

      var ACTIVE = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */].ACTIVE,
          MULTILINE = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */].MULTILINE,
          ACTION_ON_BOTTOM = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* cssClasses */].ACTION_ON_BOTTOM;


      this.adapter_.removeClass(ACTIVE);

      var handler = function handler() {
        _this2.adapter_.deregisterTransitionEndHandler(handler);
        _this2.adapter_.removeClass(MULTILINE);
        _this2.adapter_.removeClass(ACTION_ON_BOTTOM);
        _this2.setActionHidden_(true);
        _this2.adapter_.setMessageText(null);
        _this2.adapter_.setActionText(null);
        _this2.adapter_.setAriaHidden();
        _this2.active_ = false;
        _this2.showNext_();
      };

      this.adapter_.registerTransitionEndHandler(handler);
    }
  }, {
    key: 'showNext_',
    value: function showNext_() {
      if (!this.queue_.length) {
        return;
      }

      this.show(this.queue_.shift());
    }
  }, {
    key: 'setActionHidden_',
    value: function setActionHidden_(isHidden) {
      if (isHidden) {
        this.adapter_.setActionAriaHidden();
      } else {
        this.adapter_.unsetActionAriaHidden();
      }
    }
  }]);

  return MDCSnackbarFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["b" /* MDCFoundation */]);

/* harmony default export */ __webpack_exports__["a"] = MDCSnackbarFoundation;

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_animation__ = __webpack_require__(61);
/* unused harmony reexport MDCSnackbarFoundation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCSnackbar; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var MDCSnackbar = function (_MDCComponent) {
  _inherits(MDCSnackbar, _MDCComponent);

  function MDCSnackbar() {
    _classCallCheck(this, MDCSnackbar);

    return _possibleConstructorReturn(this, (MDCSnackbar.__proto__ || Object.getPrototypeOf(MDCSnackbar)).apply(this, arguments));
  }

  _createClass(MDCSnackbar, [{
    key: 'show',
    value: function show(data) {
      this.foundation_.show(data);
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      var _MDCSnackbarFoundatio = __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings,
          TEXT_SELECTOR = _MDCSnackbarFoundatio.TEXT_SELECTOR,
          ACTION_BUTTON_SELECTOR = _MDCSnackbarFoundatio.ACTION_BUTTON_SELECTOR;

      var getText = function getText() {
        return _this2.root_.querySelector(TEXT_SELECTOR);
      };
      var getActionButton = function getActionButton() {
        return _this2.root_.querySelector(ACTION_BUTTON_SELECTOR);
      };

      /* eslint brace-style: "off" */
      return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */]({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        setAriaHidden: function setAriaHidden() {
          return _this2.root_.setAttribute('aria-hidden', 'true');
        },
        unsetAriaHidden: function unsetAriaHidden() {
          return _this2.root_.removeAttribute('aria-hidden');
        },
        setActionAriaHidden: function setActionAriaHidden() {
          return getActionButton().setAttribute('aria-hidden', 'true');
        },
        unsetActionAriaHidden: function unsetActionAriaHidden() {
          return getActionButton().removeAttribute('aria-hidden');
        },
        setActionText: function setActionText(text) {
          getActionButton().textContent = text;
        },
        setMessageText: function setMessageText(text) {
          getText().textContent = text;
        },
        registerActionClickHandler: function registerActionClickHandler(handler) {
          return getActionButton().addEventListener('click', handler);
        },
        deregisterActionClickHandler: function deregisterActionClickHandler(handler) {
          return getActionButton().removeEventListener('click', handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          return _this2.root_.addEventListener(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__material_animation__["a" /* getCorrectEventName */])(window, 'transitionend'), handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          return _this2.root_.removeEventListener(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__material_animation__["a" /* getCorrectEventName */])(window, 'transitionend'), handler);
        }
      });
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCSnackbar(root);
    }
  }]);

  return MDCSnackbar;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["a" /* MDCComponent */]);

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dialogo_exclusao_html__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dialogo_exclusao_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dialogo_exclusao_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_comum__ = __webpack_require__(32);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Dialogo = function () {
  function Dialogo(opcoes) {
    _classCallCheck(this, Dialogo);

    this.opcoes = opcoes;
    this.conteinerModal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_comum__["c" /* qs */])("#modalConfirmacao");
    this.conteinerModal.setAttribute("tabindex", "-1");
    this.conteinerModal.setAttribute("role", "dialog");
    this.conteinerModal.classList.add("modal", "fade");
  }

  _createClass(Dialogo, [{
    key: "fecharModal",
    value: function fecharModal() {
      $(this.conteinerModal).modal("hide");
    }
  }, {
    key: "exibirModal",
    value: function exibirModal() {
      var _this = this;

      this.exibirModalExcluir(this.conteinerModal, this.opcoes);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_comum__["b" /* $on */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_comum__["c" /* qs */])("#btnExclusaoProcessoConfirmada"), "click", function (e) {
        _this.fecharModal();
        _this.opcoes.callback(_this.opcoes.dados);
      });
      $(this.conteinerModal).modal();
    }
  }, {
    key: "exibirModalExcluir",
    value: function exibirModalExcluir(elemento, dados) {
      elemento.innerHTML = __WEBPACK_IMPORTED_MODULE_0__dialogo_exclusao_html___default.a;
    }
  }]);

  return Dialogo;
}();
// export let dialogo = new Dialogo();


/* harmony default export */ __webpack_exports__["a"] = Dialogo;

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__servico__ = __webpack_require__(151);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var EventoServico = function (_Servico) {
  _inherits(EventoServico, _Servico);

  function EventoServico() {
    _classCallCheck(this, EventoServico);

    return _possibleConstructorReturn(this, (EventoServico.__proto__ || Object.getPrototypeOf(EventoServico)).call(this));
  }

  _createClass(EventoServico, [{
    key: "buscarEventos",
    value: function buscarEventos(processoId, tipoEvento) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", _this2.baseUrl + "/processos/" + processoId + "/" + tipoEvento);
        req.onload = function () {
          if (req.status == 200) {
            resolve(JSON.parse(req.response));
          } else {
            reject(req);
          }
        };
        req.onerror = function () {
          reject("Problemas na Rede, durante buscarEventos");
        };
        req.send();
      });
    }
  }, {
    key: "buscarProvidencias",
    value: function buscarProvidencias(processoId, andamentoId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        // req.open("GET", `${this.baseUrl}/processos/${processoId}/andamentos/${andamentoId}/providencias`);
        req.open("GET", _this3.baseUrl + "/processos/" + processoId + "/andamentos/" + andamentoId + "/providencias");
        req.onload = function () {
          if (req.status == 200) {
            resolve(JSON.parse(req.response));
          } else {
            reject(req);
          }
        };
        req.onerror = function () {
          reject("Problemas na Rede, durante buscarProvidencias");
        };
        req.send();
      });
    }
  }, {
    key: "buscarEventosPor",
    value: function buscarEventosPor(opcoes) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", _this4.baseUrl + "/eventos" + (opcoes.tipoEvento === "andamentos" ? "" : "/providencias") + "?" + opcoes.filtro);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = function () {
          if (req.status == 200) {
            resolve(JSON.parse(req.response));
          } else {
            reject(req);
          }
        };
        req.onerror = function () {
          reject("Problemas na Rede, durante buscarEventosPor");
        };
        req.send();
      });
    }
  }, {
    key: "associarEvento",
    value: function associarEvento(dados) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("POST", _this5.baseUrl + "/processos/" + dados.processoId + "/" + (dados.andamentoId ? "andamentos/" + dados.andamentoId + "/providencias" : dados.tipoEvento));
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = function () {
          if (/200|201/.test(req.status)) {
            resolve(JSON.parse(req.response));
            // resolve(req);
          } else {
            reject(req);
          }
        };
        req.onerror = function () {
          reject("Problemas na Rede, durante associarEvento");
        };
        req.send(JSON.stringify(dados.eventoPotencial));
      });
    }
  }, {
    key: "excluirEvento",
    value: function excluirEvento(dados) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest(),
            url = _this6.baseUrl + "/processos/" + dados.processoId;
        if (dados.andamentoId) {
          url = url + "/andamentos/" + dados.andamentoId + "/providencias/" + dados.eventoId;
        } else {
          url = url + "/" + dados.tipoEvento + "/" + dados.eventoId;
        }
        req.open("DELETE", url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = function () {
          if (req.status == 200) {
            resolve(JSON.parse(req.response));
            // resolve(req);
          } else {
            reject(req);
          }
        };
        req.onerror = function () {
          reject("Problemas na Rede, durante excluirEvento");
        };
        req.send();
      });
    }
  }]);

  return EventoServico;
}(__WEBPACK_IMPORTED_MODULE_0__servico__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = EventoServico;

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_processo_evento_evento_html__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_processo_evento_evento_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__html_processo_evento_evento_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_processo_evento_evento_andamentos_html__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_processo_evento_evento_andamentos_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__html_processo_evento_evento_andamentos_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__html_processo_evento_evento_providencias_html__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__html_processo_evento_evento_providencias_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__html_processo_evento_evento_providencias_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__html_processo_evento_eventos_andamento_potencial_html__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__html_processo_evento_eventos_andamento_potencial_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__html_processo_evento_eventos_andamento_potencial_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__html_processo_evento_eventos_providencia_potencial_html__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__html_processo_evento_eventos_providencia_potencial_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__html_processo_evento_eventos_providencia_potencial_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__html_processo_evento_modal_html__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__html_processo_evento_modal_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__html_processo_evento_modal_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__comum__ = __webpack_require__(32);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }









var EventoTemplate = function () {
  function EventoTemplate() {
    _classCallCheck(this, EventoTemplate);
  }

  _createClass(EventoTemplate, [{
    key: "exibirTelaPrincipal",
    value: function exibirTelaPrincipal(elemento, dados) {
      elemento.innerHTML = __WEBPACK_IMPORTED_MODULE_0__html_processo_evento_evento_html___default.a;
    }
  }, {
    key: "exibirEventos",
    value: function exibirEventos(opcoes) {
      if (opcoes.processo) {
        opcoes.processo["dataFormatada"] = function () {
          return function (data, render) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__comum__["g" /* formatarData */])(data, render);
          };
        };
      }

      if (opcoes.tipoEvento === "andamentos") {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__comum__["c" /* qs */])("#andamentos").innerHTML = __WEBPACK_IMPORTED_MODULE_1__html_processo_evento_evento_andamentos_html___default.a;
      }
      if (opcoes.tipoEvento === "providencias") {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__comum__["c" /* qs */])("#providencias").innerHTML = __WEBPACK_IMPORTED_MODULE_2__html_processo_evento_evento_providencias_html___default.a;
      }
    }
  }, {
    key: "exibirProvidencias",
    value: function exibirProvidencias(elemento) {
      if (opcoes.processo) {
        opcoes.processo["dataFormatada"] = function () {
          return function (data, render) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__comum__["g" /* formatarData */])(data, render);
          };
        };
      }
      if (opcoes.andamento) {
        opcoes.andamento["dataFormatada"] = function () {
          return function (data, render) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__comum__["g" /* formatarData */])(data, render);
          };
        };
      }
      elemento.innerHTML = __WEBPACK_IMPORTED_MODULE_2__html_processo_evento_evento_providencias_html___default.a;
    }
  }, {
    key: "exibirEventosPotencial",
    value: function exibirEventosPotencial(elemento, dados) {
      if (dados.tipoEvento === "andamentos") {
        elemento.innerHTML = __WEBPACK_IMPORTED_MODULE_3__html_processo_evento_eventos_andamento_potencial_html___default.a;
      }
      if (dados.tipoEvento === "providencias") {
        elemento.innerHTML = __WEBPACK_IMPORTED_MODULE_4__html_processo_evento_eventos_providencia_potencial_html___default.a;
      }
    }
  }, {
    key: "prepararModal",
    value: function prepararModal(elemento, dados) {
      elemento.innerHTML = __WEBPACK_IMPORTED_MODULE_5__html_processo_evento_modal_html___default.a;
    }
  }]);

  return EventoTemplate;
}();

/* harmony default export */ __webpack_exports__["a"] = EventoTemplate;

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comum__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__componentes_mensagem_mensagem__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__evento_template__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__componentes_dialogo_dialogo_exclusao__ = __webpack_require__(147);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var EventoVisao = function () {
  function EventoVisao(conteiner) {
    _classCallCheck(this, EventoVisao);

    this.$conteiner = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])(conteiner);
    this.$parcial = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#parcial");
    this.template = new __WEBPACK_IMPORTED_MODULE_2__evento_template__["a" /* default */]();
  }

  _createClass(EventoVisao, [{
    key: "atacharEvento",
    value: function atacharEvento(comando, controle) {
      var _this = this;

      var self = this;
      switch (comando) {
        case "listarProvidencias":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamentos"), ".andamento-providencias-js", "click", function (e) {
            return controle(self.pegarEvento(e, "andamento"));
          });
          break;
        case "associarEvento":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#eventoPotencial"), "form", "submit", function (e) {
            return controle(self.eventoSelecionado(e));
          });
          break;
        case "selecionarTipoEvento":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#cmbTipoEvento"), "a", "click", function (e) {
            return controle(_this.selecionarTipoEvento(e));
          });
          break;
        case "buscarEventosPor":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["b" /* $on */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#frmEvento"), "submit", function (e) {
            return controle(self.buscarEventosPor(e));
          });
          break;
        case "excluirAndamento":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamentos"), ".excluir-andamento-js", "click", function (e) {
            return self.questionarExclusao(e, controle, "andamento");
          });
          break;
        case "excluirProvidencia":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#providencias"), ".excluir-providencia-js", "click", function (e) {
            return self.questionarExclusao(e, controle, "providencia");
          });
          break;
        case "excluirProvidenciaAndamento":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamento-providencias"), ".excluir-providencia-js", "click", function (e) {
            return self.questionarExclusao(e, controle, "providencia");
          });
          break;
        case "exibirAndamentos":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["b" /* $on */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#btnExibirAndamentos"), "click", function (e) {
            return controle(self.exibirAndamentos(e));
          });
          break;
        case "pesquisarProvidencia":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["b" /* $on */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#btnPesquisarProvidencia"), "click", function (e) {
            return controle();
          });
          break;
        case "aplicarMascaraHora":
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["f" /* $delegate */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#eventosPotencial"), ".mascara-hora-js", "click", function (e) {
            return self.aplicarMascaraHora(e);
          });
          break;
      }
    }
  }, {
    key: "abrirTelaPrincipal",
    value: function abrirTelaPrincipal() {
      var opcoes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.template.exibirTelaPrincipal(this.$conteiner, opcoes);
    }
  }, {
    key: "pegarEvento",
    value: function pegarEvento(e, tipoEvento) {
      e.preventDefault();
      var $btnEvento = e.target;
      return {
        eventoId: $btnEvento.getAttribute("data-" + tipoEvento + "-id"),
        andamentoId: $btnEvento.getAttribute("data-id-andamento")
      };
    }
  }, {
    key: "questionarExclusao",
    value: function questionarExclusao(e, controle, tipoEvento) {
      var dados = this.pegarEvento(e, tipoEvento);
      dados["tipoEvento"] = tipoEvento + "s";

      var opcoes = {
        callback: controle,
        dados: dados,
        titulo: "Excluir " + (tipoEvento === "andamento" ? "Andamento" : "Providência") + "?"
      };
      var dialogo = new __WEBPACK_IMPORTED_MODULE_3__componentes_dialogo_dialogo_exclusao__["a" /* default */](opcoes);
      dialogo.exibirModal();
    }
  }, {
    key: "selecionarTipoEvento",
    value: function selecionarTipoEvento(e) {
      e.preventDefault();
      return e.target.getAttribute(["href"]);
    }
  }, {
    key: "abrirModal",
    value: function abrirModal(modalId, andamento) {
      var $modal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#modalEvento"),
          dados = {
        "modalId": modalId
      };
      switch (modalId) {
        case "#modalandamentos":
          dados["titulo"] = "Associar Andamento ao Processo";
          dados["ajuda"] = "Digite a descrciao do andamento que deseja buscar";
          dados["id"] = "andamentos";
          break;
        case "#modalprovidencias":
          dados["titulo"] = "Associar Provid\xEAncia ao " + (andamento ? "Andamento: " + andamento.evento : "Processo");
          dados["ajuda"] = "Digite a descrciao da providência que deseja buscar";
          dados["id"] = "providencias";
          if (andamento) {
            dados["andamentoId"] = andamento.id;
          }
          break;
      }
      if (modalId) {
        this.template.prepararModal($modal, dados);
        $(modalId).modal();
      }
    }
  }, {
    key: "fecharModal",
    value: function fecharModal(modalId) {
      $(modalId).modal("hide");
    }
  }, {
    key: "eventoSelecionado",
    value: function eventoSelecionado(e) {
      e.preventDefault();
      var $formEvento = e.target,
          dados = {
        andamentoId: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#eventosPotencial").getAttribute("data-andamento-id"),
        tipoEvento: $formEvento.getAttribute("data-evento-tipo"),
        eventoPotencial: this.validarFormulario($formEvento)
      };
      return dados;
    }
  }, {
    key: "exibirErro",
    value: function exibirErro(elemento, id) {
      var $grupoPai = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["e" /* $parent */])(elemento, "div", "form-group");
      $grupoPai.classList.add("has-error");
      $grupoPai.classList.remove("has-success");
      var erro = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#" + elemento.name + "-erro-" + id);
      if (erro) {
        erro.classList.remove("invisible");
      }
    }
  }, {
    key: "exibirSucesso",
    value: function exibirSucesso(elemento, id) {
      var $grupoPai = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["e" /* $parent */])(elemento, "div", "form-group");
      $grupoPai.classList.add("has-success");
      $grupoPai.classList.remove("has-error");

      var erro = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#" + elemento.name + "-erro-" + id);
      if (erro) {
        erro.classList.add("invisible");
      }
    }
  }, {
    key: "mapearElementoParaJson",
    value: function mapearElementoParaJson(elemento) {
      var json = "";
      switch (elemento.name) {
        case "instancia_extraordinaria":
          if (elemento.checked) {
            json = "{\"" + elemento.name + "\" : " + elemento.checked + "}";
          }
          break;
        case "data":
        case "data_prazo_fatal":
          // Browser sem suporte ao tipo date
          if (elemento.type === "text") {
            json = "{\"" + elemento.name + "\" : \"" + elemento.value.replace(/^(\d{2})[-/](\d{2})[-/](\d{4})$/, "$3-$2-$1") + "\"}";
          } else {
            json = "{\"" + elemento.name + "\" : \"" + elemento.value + "\"}";
          }
          break;
        case "fase":
        case "observacao":
        case "hora_prazo_fatal":
          json = "{\"" + elemento.name + "\" : \"" + elemento.value + "\"}";
          break;
        case "evento":
        case "tipo_providencia":
          json = "{\"" + elemento.name + "\" : {\"id\" : \"" + elemento.value + "\"}}";
          break;
      }
      return json;
    }
  }, {
    key: "validarElemento",
    value: function validarElemento(elemento, id) {
      if (!/^fieldset|button|submit$/.test(elemento.type) && !elemento.disabled) {
        if (!elemento.checkValidity()) {
          this.exibirErro(elemento, id);
        } else {
          this.exibirSucesso(elemento, id);
          var jsonString = this.mapearElementoParaJson(elemento);
          if (jsonString) {
            return JSON.parse(jsonString);
          }
        }
      }
    }
  }, {
    key: "validarFormulario",
    value: function validarFormulario($formulario) {
      var _this2 = this;

      var formularioJson = {},
          id = $formulario.getAttribute("data-evento-id");

      [].concat(_toConsumableArray($formulario.elements)).map(function (elemento) {
        Object.assign(formularioJson, _this2.validarElemento(elemento, id));
      });
      if ($formulario.checkValidity()) {
        return formularioJson;
      }
    }
  }, {
    key: "buscarEventosPor",
    value: function buscarEventosPor(e) {
      e.preventDefault();
      var form = e.target,
          elemento = form.elements[0];
      return {
        filtro: elemento.name + "=" + elemento.value,
        tipoEvento: form.getAttribute("data-tipo-evento")
      };
    }
  }, {
    key: "listarEventos",
    value: function listarEventos() {
      var opcoes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        "processo": {}
      };

      this.template.exibirEventos(opcoes);
    }
  }, {
    key: "listarEventosPotencial",
    value: function listarEventosPotencial() {
      var dados = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      dados["exibir"] = dados.eventosPotencial ? dados.eventosPotencial.length > 0 : false;
      this.template.exibirEventosPotencial(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#eventosPotencial"), dados);
      this.atacharEvento("aplicarMascaraHora");
    }
  }, {
    key: "listarProvidencias",
    value: function listarProvidencias() {
      var opcoes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // opcoes["exibirProvidenciasDoAndamento"] = opcoes.andamento.providencias ? opcoes.andamento.providencias.length > 0 : false;
      if (opcoes.exibirProvidenciasDoAndamento) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamentos").classList.add("hidden");
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamento-providencias").classList.remove("hidden");
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#btnExibirAndamentos").classList.remove("hidden");
        this.template.exibirProvidencias(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamento-providencias"), opcoes);
      }
    }
  }, {
    key: "exibirAndamentos",
    value: function exibirAndamentos() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamento-providencias").classList.add("hidden");
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#btnExibirAndamentos").classList.add("hidden");
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comum__["c" /* qs */])("#andamentos").classList.remove("hidden");
    }
  }, {
    key: "aplicarMascaraHora",
    value: function aplicarMascaraHora(e) {
      var $campoHora = e.target;
      if ($campoHora.type === "text") {
        new Inputmask("99:99", {
          "placeholder": "HH:MM"
        }).mask($campoHora);
      }
    }
  }]);

  return EventoVisao;
}();

/* harmony default export */ __webpack_exports__["a"] = EventoVisao;

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Servico = function Servico() {
  _classCallCheck(this, Servico);

  this.baseUrl = "/reinaldo/api";
};

/* harmony default export */ __webpack_exports__["a"] = Servico;

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(88);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__foundation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(131);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__component__["a"]; });
/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = formatarData;
/* unused harmony export dispararEvento */
/* harmony export (immutable) */ __webpack_exports__["a"] = queryStringParaJson;
/* unused harmony export navegarPara */
/* harmony export (immutable) */ __webpack_exports__["c"] = qs;
/* harmony export (immutable) */ __webpack_exports__["d"] = qsa;
/* harmony export (immutable) */ __webpack_exports__["b"] = $on;
/* harmony export (immutable) */ __webpack_exports__["f"] = $delegate;
/* harmony export (immutable) */ __webpack_exports__["e"] = $parent;
function formatarData(data, render) {
  data = render(data).trim();
  return data ? data.replace(/^(\d{4})[-/](\d{2})[-/](\d{2})$/, "$3/$2/$1") : "";
}

// Interceptador ajax
(function (open) {
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener("readystatechange", function () {
      // this.readyState === 4 ? qs("#parcial").style.cursor = "auto" : qs("#parcial").style.cursor = "progress";
    }, false);
    open.apply(this, arguments);
  };
})(XMLHttpRequest.prototype.open);

function dispararEvento(evento) {
  qs("#parcial").dispatchEvent(new CustomEvent(evento.nome, {
    "detail": evento
  }));
}

function queryStringParaJson(qs) {
  try {
    return JSON.parse("{\"" + qs.replace(/&/g, "\",\"").replace(/=/g, "\":\"") + "\"}");
  } catch (e) {
    return "";
  }
}

//forcar, dispara o evento hashchange
function navegarPara(url) {
  var forcar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var hash = window.location.hash;

  if (url.startsWith("#")) {
    if (forcar) {
      hash !== url ? window.location.hash = url : history.go(0);
    } else if (hash !== url) {
      history.pushState(null, "", url);
    } else {
      history.replaceState(null, "", url);
    }
  } else {
    window.location.href = url;
  }
}

// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
NodeList.prototype.forEach = Array.prototype.forEach;

// Get element(s) by CSS selector:
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
function $on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
function $delegate(target, selector, type, handler, capture) {
  var dispatchEvent = function dispatchEvent(event) {
    var targetElement = event.target;
    var potentialElements = target.querySelectorAll(selector);
    var i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
  var useCapture = type === "blur" || type === "focus";

  $on(target, type, dispatchEvent, !!capture);
}

// Find the element's parent with the given tag name:
// $parent(qs('a'), 'div')
function $parent(element, tagName, className) {
  if (!element || !element.parentNode || element.parentNode.tagName.toLowerCase() === "body") {
    return;
  }

  if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
    if (className) {
      if (element.parentNode.classList.contains(className)) {
        return element.parentNode;
      }
    } else {
      return element.parentNode;
    }
  }

  return $parent(element.parentNode, tagName, className);
}

/***/ }),

/***/ 333:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 334:
/***/ (function(module, exports) {

module.exports = " <a class=\"sd title principal\" href=\"index.html\">reinaldo: {{titulo}}</a>\n";

/***/ }),

/***/ 335:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-8 col-md-6 col-xs-12\">\n  <h1 class=\"sd title\">{{cabecalho}}</h1>\n</div>\n{{#exibirBotoes}}\n<div class=\"col-lg-4 col-md-6 col-xs-12\">\n  <div class=\"btn-group pull-right\">\n    <button class=\"sd btn default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n      <i class=\"{{ iconeBotao }}\"></i> {{tituloBotao}} <b class=\"caret\"></b>\n    </button>\n    <ul class=\"dropdown-menu\">\n      {{#botoes}}\n      <li><a href=\"{{acao}}\"><i class=\"{{ icone }}\"></i> {{titulo}}</a></li>\n      {{/botoes}}\n    </ul>\n  </div>\n</div>\n{{/exibirBotoes}}\n<div class=\"col-lg-12 col-md-12 col-xs-12\" id=\"mensagem-generico\"></div>\n";

/***/ }),

/***/ 336:
/***/ (function(module, exports) {

module.exports = "<!-- <div id=\"modalProcessoConfirmacao\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"> -->\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">{{titulo}}</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>Esta operação não pederá ser desfeita. Deseja continuar?</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancelar</button>\n        <button id=\"btnExclusaoProcessoConfirmada\" type=\"button\" class=\"btn btn-danger\">Continuar</button>\n      </div>\n    </div>\n  </div>\n<!-- </div> -->\n";

/***/ }),

/***/ 337:
/***/ (function(module, exports) {

module.exports = "{{#erros}}\n  <div role=\"alert\" class=\"sd alert icon danger\">\n    <span class=\"fa fa-times-circle\" aria-hidden=\"true\"></span>\n    <strong>Erro!</strong> {{{mensagem}}}. {{#property}} Contexto: {{property}}{{/property}}\n  </div>\n{{/erros}}\n\n{{#sucessos}}\n  <div role=\"alert\" class=\"sd alert icon success\">\n    <span class=\"fa fa-check-circle\" aria-hidden=\"true\"></span>\n    <strong>Parabéns!</strong> {{mensagem}} {{#property}} Contexto: {{property}}{{/property}}\n  </div>\n{{/sucessos}}\n\n{{#atencoes}}\n  <div role=\"alert\" class=\"sd alert icon warning\">\n     <span class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></span>\n     <strong>Atenção!</strong> {{mensagem}}. {{#property}} Contexto: {{property}}{{/property}}\n  </div>\n{{/atencoes}}\n";

/***/ }),

/***/ 338:
/***/ (function(module, exports) {

module.exports = "{{#exibirAndamentos}}\n<div id=\"tblAndamentos\" class=\"row\">\n  <div class=\"table-responsive col-lg-12\">\n    <table class=\"sd table table-striped vertical-center table-hover uppercase\">\n      <thead>\n        <tr>\n          <th>Data</th>\n          <th class=\"text-center\">Andamento</th>\n          <th class=\"text-center\">Fase</th>\n          <th class=\"text-center\">Observação</th>\n          <th class=\"text-center\">Opções de Ação</th>\n        </tr>\n      </thead>\n      <tbody>\n        {{#processo.andamentos}}\n        <tr>\n          <td>{{#processo.dataFormatada}} {{andamento.data}} {{/processo.dataFormatada}}</td>\n          <td>{{andamento.evento}}</td>\n          <td>{{andamento.fase}}</td>\n          <td>{{andamento.observacao}}</td>\n          <td class=\" text-center\">\n            <div class=\"btn-group pull-right\">\n              <button type=\"button\" class=\"sd btn small icon default andamento-providencias-js\" data-andamento-id=\"{{andamento.id}}\" title=\"Associar Providência\">\n                <i class=\"fa fa-thumb-tack andamento-providencias-js\" data-andamento-id=\"{{andamento.id}}\" aria-hidden=\"true\"></i>\n                <span class=\"sr-only\">Associar Providência</span>\n              </button>\n              <button type=\"button\" class=\"sd btn small icon default excluir-andamento-js\" data-andamento-id=\"{{andamento.id}}\" title=\"Desassociar Andamento\">\n                <i class=\"fa fa-trash-o excluir-andamento-js\" data-andamento-id=\"{{andamento.id}}\" aria-hidden=\"true\"></i>\n                <span class=\"sr-only\">Desassociar</span>\n              </button>\n            </div>\n          </td>\n        </tr>\n        {{/processo.andamentos}}\n      </tbody>\n    </table>\n  </div>\n</div>\n{{/exibirAndamentos}}\n";

/***/ }),

/***/ 339:
/***/ (function(module, exports) {

module.exports = "{{#exibirProvidenciasDoAndamento}}\n<div class=\"row\">\n  <div class=\"col-lg-10 col-md-8\">\n    <h3><i class=\"fa fa-thumb-tack\"></i> Providencias do Andamento: {{andamento.evento}}</h3>\n  </div>\n  <div class=\"col-lg-2 col-md-4\">\n    <div class=\"btn-group pull-right\">\n      <button id=\"btnPesquisarProvidencia\" data-andamento-id=\"{{andamento.id}}\" class=\"sd btn default\" type=\"button\">\n        <i class=\"fa fa-plus\"></i> ASSOCIAR PROVIDÊNCIA\n      </button>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-lg-12 col-md-12\" id=\"mensagem-providencia\"></div>\n</div>\n{{/exibirProvidenciasDoAndamento}}\n{{#andamento.exibirProvidencias}}\n<div id=\"tblAndamentoProvidencias\" class=\"row\">\n  <div class=\"table-responsive col-lg-12\">\n    <table class=\"sd table table-striped vertical-center table-hover uppercase\">\n      <thead>\n        <tr>\n          <th>Data Fatal</th>\n          <th>Hora</th>\n          <th class=\"text-center\">Tipo</th>\n          <th class=\"text-center\">Descrição</th>\n          <th class=\"text-center\">Observação</th>\n          <th class=\"text-center\">Opções de Ação</th>\n        </tr>\n      </thead>\n      <tbody>\n        {{#andamento.providencias}}\n        <tr>\n          <td>{{#andamento.dataFormatada}} {{providencia.data_prazo_fatal}} {{/andamento.dataFormatada}}</td>\n          <td>{{providencia.hora_prazo_fatal}}</td>\n          <td>{{providencia.tipo_providencia.providencia.descricao}}</td>\n          <td>{{providencia.evento.evento.nome}}</td>\n          <td>{{providencia.observacao}}</td>\n          <td class=\" text-center\">\n            <div class=\"btn-group pull-right\">\n              <button type=\"button\" class=\"sd btn small icon default excluir-providencia-js\" data-providencia-id=\"{{providencia.id}}\" data-id-andamento=\"{{andamento.id}}\" title=\"Desassociar Providência\">\n                <i class=\"fa fa-trash-o excluir-providencia-js\" data-providencia-id=\"{{providencia.id}}\" data-id-andamento=\"{{andamento.id}}\" aria-hidden=\"true\"></i>\n                <span class=\"sr-only\">Desassociar</span>\n              </button>\n            </div>\n          </td>\n        </tr>\n        {{/andamento.providencias}}\n      </tbody>\n    </table>\n  </div>\n</div>\n{{/andamento.exibirProvidencias}}\n{{#exibirProvidencias}}\n<div id=\"tblProvidencias\" class=\"row\">\n  <div class=\"table-responsive col-lg-12\">\n    <table class=\"sd table table-striped vertical-center table-hover uppercase\">\n      <thead>\n        <tr>\n          <th>Data Fatal</th>\n          <th>Hora</th>\n          <th class=\"text-center\">Tipo</th>\n          <th class=\"text-center\">Descrição</th>\n          <th class=\"text-center\">Observação</th>\n          <th class=\"text-center\">Opções de Ação</th>\n        </tr>\n      </thead>\n      <tbody>\n        {{#processo.providencias}}\n        <tr>\n          <td>{{#processo.dataFormatada}} {{providencia.data_prazo_fatal}} {{/processo.dataFormatada}}</td>\n          <td>{{providencia.hora_prazo_fatal}}</td>\n          <td>{{providencia.tipo_providencia.providencia.descricao}}</td>\n          <td>{{providencia.evento.evento.nome}}</td>\n          <td>{{providencia.observacao}}</td>\n          <td class=\" text-center\">\n            <div class=\"btn-group pull-right\">\n              <button type=\"button\" class=\"sd btn small icon default excluir-providencia-js\" data-providencia-id=\"{{providencia.id}}\" title=\"Desassociar Providência\">\n                <i class=\"fa fa-trash-o excluir-providencia-js\" data-providencia-id=\"{{providencia.id}}\" aria-hidden=\"true\"></i>\n                <span class=\"sr-only\">Desassociar</span>\n              </button>\n            </div>\n          </td>\n        </tr>\n        {{/processo.providencias}}\n      </tbody>\n    </table>\n  </div>\n</div>\n{{/exibirProvidencias}}\n";

/***/ }),

/***/ 340:
/***/ (function(module, exports) {

module.exports = "<div id=\"modalEvento\"></div>\n{{#exibir}}\n<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\" id=\"mensagem-evento\"></div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-6 col-md-4\">\n        <h3><i class=\"fa fa-exchange\"></i> Andamentos</h3>\n      </div>\n      <div class=\"col-lg-6 col-md-8\">\n        <div class=\"btn-group pull-right\">\n          <button class=\"sd btn default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <i class=\"fa fa-plus\"></i> ASSOCIAR <b class=\"caret\"></b>\n          </button>\n          <ul id=\"cmbTipoEvento\" class=\"dropdown-menu\">\n            <li><a href=\"#modalandamentos\"><i class=\"fa fa-exchange\"></i> Andamento</a></li>\n            <li><a href=\"#modalprovidencias\"><i class=\"fa fa-thumb-tack\"></i> Providência</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-12\">\n        <!-- Contener Para a tabela de andamentos -->\n        <div id=\"andamentos\"> </div>\n        <div id=\"andamento-providencias\" class=\"hidden\"> </div>\n        <button id=\"btnExibirAndamentos\" class=\"sd btn default hidden\">Exibir Andamentos</button>\n      </div>\n      <div class=\"col-lg-12 col-md-12\">\n        <h3><i class=\"fa fa-thumb-tack\"></i> Providências</h3>\n        <div id=\"providencias\"> </div>\n      </div>\n    </div>\n  </div>\n</div>\n{{/exibir}}\n\n<div class=\"columns\">\n  <div class=\"column\">\n    First column\n  </div>\n  <div class=\"column\">\n    Second column\n  </div>\n  <div class=\"column\">\n    Third column\n  </div>\n  <div class=\"column\">\n    Fourth column\n  </div>\n</div>\n";

/***/ }),

/***/ 341:
/***/ (function(module, exports) {

module.exports = "{{#exibir}}\n<div id=\"eventoPotencial\" role=\"tablist\" aria-multiselectable=\"true\" class=\"sd accordion\">\n  <div class=\"panel\">\n    {{#eventosPotencial}}\n    <a href=\"#collapse{{evento.id}}\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#eventoPotencial\" class=\"collapsed\">\n      <span class=\"fa fa-chevron-up\"></span>\n      <span>{{evento.nome}}</span>\n    </a>\n    <div id=\"collapse{{evento.id}}\" class=\"collapse\">\n      <form class=\"sd form\" role=\"form\" data-evento-id=\"{{evento.id}}\" data-evento-tipo=\"{{tipoEvento}}\" novalidate>\n        <div class=\"row\" id=\"mensagem-{{evento.id}}\">\n          <div class=\"col-lg-12\"></div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-3\">\n            <div class=\"form-group\">\n              <input type=\"hidden\" name=\"evento\" value=\"{{evento.id}}\">\n              <label class=\"control-label required\" for=\"txtData\">Data</label>\n              <input aria-describedby=\"data-erro-{{evento.id}}\" name=\"data\" data-inputmask=\"'alias': 'date'\" type=\"date\" lang=\"pt\" date-format=\"dd/mm/yyyy\" class=\"form-control\" placeholder=\"DD/MM/AAAA\" required>\n              <span id=\"data-erro-{{evento.id}}\" class=\"invisible help-block text-danger\">Campo obrigatório!</span>\n            </div>\n          </div>\n          <div class=\"col-lg-3\">\n            <div class=\"form-group\">\n              <label class=\"control-label required\" for=\"cmbOrigemProcesso\">Fase</label>\n              <select aria-describedby=\"fase-erro-{{evento.id}}\" name=\"fase\" class=\"form-control\" required>\n                <option value=\"\">Selecione um item</option>\n                <option value=\"CONHECIMENTO\">Conhecimento</option>\n                <option value=\"EXECUCAO\">Execução</option>\n              </select>\n              <span id=\"fase-erro-{{evento.id}}\" class=\"invisible help-block text-danger\">Campo obrigatório!</span>\n            </div>\n          </div>\n          <div class=\"col-lg-2\">\n            <div class=\"form-group\">\n              <label class=\"control-label required\">Instâncias Superiores</label>\n              <p></p>\n              <div class=\"radio\">\n                <input type=\"radio\" name=\"instancia_extraordinaria\" id=\"instancia_extraordinaria_sim{{evento.id}}\" required>\n                <label for=\"instancia_extraordinaria_sim{{evento.id}}\">Sim</label>\n              </div>\n              <div class=\"radio\">\n                <input type=\"radio\" name=\"instancia_extraordinaria\" id=\"instancia_extraordinaria_nao{{evento.id}}\" required>\n                <label for=\"instancia_extraordinaria_nao{{evento.id}}\">Não</label>\n              </div>\n              <span id=\"instancia_extraordinaria-erro-{{evento.id}}\" class=\"invisible help-block text-danger\">Campo obrigatório!</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-9\">\n            <div class=\"form-group\">\n              <label class=\"control-label\">Observação</label>\n              <textarea rows=\"6\" name=\"observacao\" class=\"form-control\"></textarea>\n            </div>\n          </div>\n          <div class=\"col-lg-3\">\n            <div class=\"pull-right\">\n              <button id=\"bntAssociar\" class=\"sd btn primary associar-js\" type=\"submit\">SALVAR</button>\n              <button type=\"button\" class=\"sd btn default\" data-dismiss=\"modal\" aria-label=\"Close\">CANCELAR</button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n    {{/eventosPotencial}}\n  </div>\n</div>\n{{/exibir}}\n";

/***/ }),

/***/ 342:
/***/ (function(module, exports) {

module.exports = "{{#exibir}}\n<div id=\"eventoPotencial\" role=\"tablist\" aria-multiselectable=\"true\" class=\"sd accordion\">\n  <div class=\"panel\">\n    {{#eventosPotencial}}\n    <a href=\"#collapse{{evento.id}}\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#eventoPotencial\" class=\"collapsed\">\n      <span class=\"fa fa-chevron-up\"></span>\n      <span>{{evento.nome}}</span>\n    </a>\n    <div id=\"collapse{{evento.id}}\" class=\"collapse\">\n      <form class=\"sd form\" role=\"form\" data-evento-id=\"{{evento.id}}\" data-evento-tipo=\"{{tipoEvento}}\" novalidate>\n        <div class=\"row\" id=\"mensagem-{{evento.id}}\">\n          <div class=\"col-lg-12\"></div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-3\">\n            <div class=\"form-group\">\n              <input type=\"hidden\" name=\"evento\" value=\"{{evento.id}}\">\n              <label class=\"control-label required\" for=\"txtData\">Data/Prazo Fatal</label>\n              <input aria-describedby=\"data_prazo_fatal-erro-{{evento.id}}\" name=\"data_prazo_fatal\" data-inputmask=\"'alias': 'date'\" type=\"date\" lang=\"pt\" date-format=\"dd/mm/yyyy hh:mm\" class=\"form-control\" placeholder=\"DD/MM/AAAA\" required>\n              <span id=\"data_prazo_fatal-erro-{{evento.id}}\" class=\"invisible help-block text-danger\">Campo obrigatório!</span>\n            </div>\n          </div>\n          <div class=\"col-lg-3\">\n            <div class=\"form-group\">\n              <label class=\"control-label required\" for=\"txtData\">Hora</label>\n              <input class=\"form-control mascara-hora-js\" aria-describedby=\"hora_prazo_fatal-erro-{{evento.id}}\" name=\"hora_prazo_fatal\" data-inputmask=\"'alias': 'hh:mm'\" type=\"time\" lang=\"pt\" date-format=\"hh:mm\" placeholder=\"HH:MM\" required>\n              <span id=\"hora_prazo_fatal-erro-{{evento.id}}\" class=\"invisible help-block text-danger\">Campo obrigatório!</span>\n            </div>\n          </div>\n          <div class=\"col-lg-3\">\n            <div class=\"form-group\">\n              <label class=\"control-label required\" for=\"cmbOrigemProcesso\">Tipo de Providência</label>\n              <select aria-describedby=\"tipo_providencia-erro-{{evento.id}}\" name=\"tipo_providencia\" class=\"form-control\" required>\n                <option value=\"\">Selecione um item</option>\n                <option value=\"1\">Audiência/Sessão</option>\n                <option value=\"2\">Prazo Judicial</option>\n                <option value=\"3\">Administrativa</option>\n              </select>\n              <span id=\"tipo_providencia-erro-{{evento.id}}\" class=\"invisible help-block text-danger\">Campo obrigatório!</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-9\">\n            <div class=\"form-group\">\n              <label class=\"control-label\">Observação</label>\n              <textarea rows=\"6\" name=\"observacao\" class=\"form-control\"></textarea>\n            </div>\n          </div>\n          <div class=\"col-lg-3\">\n            <div class=\"pull-right\">\n              <button id=\"bntAssociar\" class=\"sd btn primary associar-js\" type=\"submit\">SALVAR</button>\n              <button type=\"button\" class=\"sd btn default\" data-dismiss=\"modal\" aria-label=\"Close\">CANCELAR</button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n    {{/eventosPotencial}}\n  </div>\n</div>\n{{/exibir}}\n";

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal fade\" id=\"modal{{id}}\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">{{titulo}}</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"row\">\n          <div class=\"col-lg-12\" id=\"mensagem-modal\"></div>\n          <div class=\"col-md-12\">\n            <form id=\"frmEvento\" data-tipo-evento=\"{{id}}\" class=\"sd form\" role=\"form\">\n              <div class=\"input-group\">\n                <input name=\"filtro\" type=\"text\" class=\"form-control\" placeholder=\"{{ ajuda }}\">\n                <div class=\"input-group-btn\">\n                  <button class=\"sd btn success\" type=\"submit\">Buscar</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <br>\n        <div class=\"row\">\n          <div id=\"eventosPotencial\" class=\"col-md-12\" data-andamento-id=\"{{andamentoId}}\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_externo_material_scss__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_externo_material_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_externo_material_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_externo_bulma_scss__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_externo_bulma_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_externo_bulma_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_comum_css__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_comum_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_comum_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_processo_css__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_processo_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_processo_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__componentes_cabecalho_cabecalho__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__evento_evento_controle__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__armazenamento__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__comum__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__barra_lateral__ = __webpack_require__(123);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }












var ModuloAdministrativo = function () {
  function ModuloAdministrativo(modulo) {
    _classCallCheck(this, ModuloAdministrativo);

    this.titulo = "Módulo Administrativo";
    this.seletor = "a[href^='processo']";
    this.repositorio = new __WEBPACK_IMPORTED_MODULE_6__armazenamento__["a" /* default */](modulo);
    this.paginaPadrao = "#pesquisar";
    this.cabecalho = new __WEBPACK_IMPORTED_MODULE_4__componentes_cabecalho_cabecalho__["a" /* default */]();
    // this.evento = new Evento(this.repositorio);
  }

  _createClass(ModuloAdministrativo, [{
    key: "inicio",
    value: function inicio() {
      this.cabecalho.desenhar(".navbar-brand", this.titulo);
    }
  }, {
    key: "atacharEvento",
    value: function atacharEvento(hash) {
      switch (true) {
        case /^#pesquisar(.*)$/.test(hash):
          hash = hash.replace(/^#pesquisar([\?]?(.*))$/, "$2");
          new __WEBPACK_IMPORTED_MODULE_5__evento_evento_controle__["a" /* default */]({}).abrirTelaPrincipal({
            "andamentos": true,
            "providencias": true
          });
          break;
        case /^#judicial(.*)$/.test(hash):
          hash = hash.replace(/^#judicial([\?]?(.*))$/, "$2");
          if (hash) {
            var opcoes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__comum__["a" /* queryStringParaJson */])(hash);
            opcoes["tipoProcesso"] = "judicial";
            if (opcoes.editar) {
              opcoes["processoId"] = opcoes.editar;
              // this.processoJudicial.abirTelaEditar(opcoes);
            } else {
                // this.processoJudicial.abrirTelaDetalhe(opcoes);
              }
          } else {
              // this.processoJudicial.abrirTelaJudicial();
            }
          break;
        default:
          // TODO: Criar página 404 interna
          console.log("Página 404 interna");
          break;
      }
    }
  }]);

  return ModuloAdministrativo;
}();

var moduloAdmin = new ModuloAdministrativo("admin");
moduloAdmin.inicio();

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__comum__["b" /* $on */])(window, "hashchange", function (e) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__barra_lateral__["a" /* atualizarPagina */])(e, moduloAdmin);
});
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__comum__["b" /* $on */])(window, "load", function (e) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__barra_lateral__["a" /* atualizarPagina */])(e, moduloAdmin);
});
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__comum__["b" /* $on */])(document, "DOMContentLoaded", function (e) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__barra_lateral__["b" /* paginaPronta */])(e, moduloAdmin.paginaPadrao);
});

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCorrectEventName;
/* unused harmony export getCorrectPropertyName */
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var eventTypeMap = {
  animationstart: {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart'
  },
  animationend: {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd'
  },
  animationiteration: {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration'
  },
  transitionend: {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd'
  }
};

var cssPropertyMap = {
  animation: {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  transform: {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  transition: {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};

function hasProperShape(windowObj) {
  return windowObj.document !== undefined && typeof windowObj.document.createElement === 'function';
}

function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}

// If 'animation' or 'transition' exist as style property, webkit prefix isn't necessary. Since we are unable to
// see the event types on the element, we must rely on the corresponding style properties.
function getJavaScriptEventName(eventType, map, el) {
  switch (eventType) {
    case 'animationstart':
    case 'animationend':
    case 'animationiteration':
      return 'animation' in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    case 'transitionend':
      return 'transition' in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    default:
      return map[eventType].noPrefix;
  }
}

// Helper function to determine browser prefix for CSS3 animation events
// and property names
//
// Parameters:
// windowObject: Object -- Contains Document with a `createElement()` method
// eventType: string -- The type of animation
//
// returns the value of the event as a string, prefixed if necessary.
// If proper arguments are not supplied, this function will return
// the property or event type without webkit prefix.
//
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  var map = eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  var el = windowObj.document.createElement('div');
  var eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.
//
// Parameters:
// windowObject: Object -- Contains Document with a `createElement()` method
// eventType: string -- The type of animation
//
// returns the value of the event as a string, prefixed if necessary.
// If proper arguments are not supplied, this function will return
// the property or event type without webkit prefix.
//
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }
  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }
  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }
  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }
  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    this.adapter_ = adapter;
  }

  _createClass(MDCFoundation, [{
    key: "init",
    value: function init() {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }]);

  return MDCFoundation;
}();

/* harmony default export */ __webpack_exports__["a"] = MDCFoundation;

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(90);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__foundation__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCRipple; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





var MATCHES = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* getMatchesProperty */])(HTMLElement.prototype);



var MDCRipple = function (_MDCComponent) {
  _inherits(MDCRipple, _MDCComponent);

  function MDCRipple() {
    _classCallCheck(this, MDCRipple);

    return _possibleConstructorReturn(this, (MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).apply(this, arguments));
  }

  _createClass(MDCRipple, [{
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */](MDCRipple.createAdapter(this));
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
    }
  }, {
    key: 'unbounded',
    get: function get() {
      return this.unbounded_;
    },
    set: function set(unbounded) {
      var UNBOUNDED = __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].cssClasses.UNBOUNDED;

      this.unbounded_ = Boolean(unbounded);
      if (this.unbounded_) {
        this.root_.classList.add(UNBOUNDED);
      } else {
        this.root_.classList.remove(UNBOUNDED);
      }
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$isUnbounded = _ref.isUnbounded,
          isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

      var ripple = new MDCRipple(root);
      // Only override unbounded behavior if option is explicitly specified
      if (isUnbounded !== undefined) {
        ripple.unbounded = isUnbounded;
      }
      return ripple;
    }
  }, {
    key: 'createAdapter',
    value: function createAdapter(instance) {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* supportsCssVariables */])(window);
        },
        isUnbounded: function isUnbounded() {
          return instance.unbounded;
        },
        isSurfaceActive: function isSurfaceActive() {
          return instance.root_[MATCHES](':active');
        },
        addClass: function addClass(className) {
          return instance.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return instance.root_.classList.remove(className);
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          return instance.root_.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          return instance.root_.removeEventListener(evtType, handler);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        updateCssVariable: function updateCssVariable(varName, value) {
          return instance.root_.style.setProperty(varName, value);
        },
        computeBoundingRect: function computeBoundingRect() {
          return instance.root_.getBoundingClientRect();
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return { x: window.pageXOffset, y: window.pageYOffset };
        }
      };
    }
  }]);

  return MDCRipple;
}(__WEBPACK_IMPORTED_MODULE_0__material_base__["a" /* MDCComponent */]);

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = supportsCssVariables;
/* harmony export (immutable) */ __webpack_exports__["a"] = getMatchesProperty;
/* harmony export (immutable) */ __webpack_exports__["d"] = animateWithClass;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNormalizedEventCoords;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function supportsCssVariables(windowObj) {
  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');
  return explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
}

function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

function animateWithClass(rippleAdapter, cls, endEvent) {
  var cancelled = false;
  var cancel = function cancel() {
    if (cancelled) {
      return;
    }
    cancelled = true;
    rippleAdapter.removeClass(cls);
    rippleAdapter.deregisterInteractionHandler(endEvent, cancel);
  };
  rippleAdapter.registerInteractionHandler(endEvent, cancel);
  rippleAdapter.addClass(cls);
  return cancel;
}

function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentLeft = x + clientRect.left;
  var documentTop = y + clientRect.top;

  var normalizedLeft = void 0;
  var normalizedTop = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchend') {
    normalizedLeft = ev.changedTouches[0].pageX - documentLeft;
    normalizedTop = ev.changedTouches[0].pageY - documentTop;
  } else {
    normalizedLeft = ev.pageX - documentLeft;
    normalizedTop = ev.pageY - documentTop;
  }

  return { left: normalizedLeft, top: normalizedTop };
}

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mensagem_html__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mensagem_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mensagem_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_comum__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mensagemUtil; });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var botaoEntrar = "<a class=\\\"sd btn icon left warning\\\" onclick=\\\"history.go(0)\\\"><span class=\\\"fa fa-sign-in\\\" aria-hidden=\\\"true\\\"></span><span class=\\\"sr-only\\\">Entrar</span>Aqui</a>";
var statusCode = {
  "_204": "Nenhum registro encontrado",
  "_500": "Inesperado",
  "_0": "Sess\xE3o expirada! Clique " + botaoEntrar + " para autenticar-se novamente"
};

var mensagens = {
  "sucessos": [],
  "atencoes": [],
  "erros": []
};

var Mensagem = function () {
  function Mensagem(seletor) {
    _classCallCheck(this, Mensagem);

    this.seletorMsgPadrao = seletor;
  }

  _createClass(Mensagem, [{
    key: "mostrar",
    value: function mostrar(seletorMsg) {
      var $elementoMsg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_comum__["c" /* qs */])(seletorMsg || this.seletorMsgPadrao);
      if ($elementoMsg && (mensagens.sucessos.length > 0 || mensagens.erros.length > 0 || mensagens.atencoes.length > 0)) {
        $elementoMsg.classList.remove("hidden");
        $elementoMsg.innerHTML = __WEBPACK_IMPORTED_MODULE_0__mensagem_html___default.a;
      }
    }
  }, {
    key: "ocultar",
    value: function ocultar(seletorMsg) {
      var $elementoMsg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_comum__["c" /* qs */])(seletorMsg || this.seletorMsgPadrao);
      if ($elementoMsg) {
        $elementoMsg.classList.add("hidden");
      }
    }
  }, {
    key: "apagar",
    value: function apagar(seletorMsg) {
      var $elementoMsg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_comum__["c" /* qs */])(seletorMsg || this.seletorMsgPadrao);
      if ($elementoMsg) {
        mensagens.sucessos = [];
        mensagens.atencoes = [];
        mensagens.erros = [];
        $elementoMsg.innerHTML = __WEBPACK_IMPORTED_MODULE_0__mensagem_html___default.a;
      }
    }
  }, {
    key: "adicionar",
    value: function adicionar(msg) {
      var substituir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      try {
        msg.mensagem = JSON.parse(msg.mensagem);
      } catch (e) {
        msg.mensagem = JSON.parse("{\"property\": \"\", \"mensagem\": \"Erro Inesperado, " + msg.mensagem + "\"}");
      }
      if (substituir) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(mensagens)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            key !== msg.tipo ? mensagens[key] = [] : mensagens[msg.tipo] = [msg.mensagem];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        mensagens[msg.tipo].push(msg.mensagem);
      }
      return this;
    }
  }, {
    key: "adicionarMensagens",
    value: function adicionarMensagens(requisicao) {
      var substituir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (requisicao.response) {
        try {
          var resposta = JSON.parse(requisicao.response);
          // tratar erros do sgp
          if (resposta.appMessageError) {
            resposta = JSON.parse("{\"property\": \"" + requisicao.responseURL.replace(/^.*\/(.*)$/, "$1") + "\", \"mensagem\": \"" + resposta.appMessageError + "\"}");
            mensagens.erros = [resposta];
            return this;
          }

          if (substituir) {
            // gambiarra até padronizar o back-end
            if (Array.isArray(resposta)) {
              mensagens.atencoes = resposta;
              mensagens.sucessos = [];
              mensagens.erros = [];
            } else {
              mensagens.sucessos = resposta.mensagens.sucessos ? resposta.mensagens.sucessos : [];
              mensagens.atencoes = resposta.mensagens.atencoes ? resposta.mensagens.atencoes : [];
              mensagens.erros = resposta.mensagens.erros ? resposta.mensagens.erros : [];
            }
          } else {
            Object.assign(mensagens, resposta);
          }
        } catch (e) {
          this.adicionar({
            "mensagem": "{\"property\": \"" + requisicao.responseURL.replace(/^.*\/(.*)$/, "$1") + "\", \"mensagem\": \"" + statusCode._500 + ", " + requisicao.response + "\"}",
            "tipo": "erros"
          }, substituir);
        }
      } else {
        var msg = "",
            tipo = "erros",
            contexto = requisicao.responseURL ? requisicao.responseURL.replace(/^.*\/(.*)$/, "$1") : "";
        if (requisicao.status === 204) {
          msg = statusCode._204;
          tipo = "atencoes";
        } else if (requisicao.status === 0) {
          msg = statusCode._0;
        } else if (requisicao.statusText) {
          msg = requisicao.statusText;
        } else {
          msg = statusCode._500 + ". Detalhes: " + requisicao;
        }
        msg = "{\"property\": \"" + contexto + "\", \"mensagem\": \"" + msg + "\"}";
        this.adicionar({
          "mensagem": msg,
          "tipo": tipo
        }, substituir);
      }
      return this;
    }
  }, {
    key: "enquadrarMensagem",
    value: function enquadrarMensagem() {
      $("html, body").animate({
        scrollTop: 0
      }, "fast");
    }
  }]);

  return Mensagem;
}();

var mensagemUtil = new Mensagem("#mensagem-generico");

/***/ })

},[346]);
//# sourceMappingURL=admin.bundle.js.map