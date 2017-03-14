import {
  qs,
  qsa,
  $on,
  $parent,
  $delegate
} from "comum/comum";
import {
  MDCTextfield,
  MDCTextfieldFoundation
} from "@material/textfield";
import {
  MDCSnackbar
} from "@material/snackbar";
import Mensagem from "comum/mensagem/mensagem";
import telaListaJogos from "./telas/lista.html";
import telaLista from "./telas/listaP.html";

import telaPrincipal from "./telas/principal.html";

export default class Visao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
    this.jogos = {};
    this.atacharEvento("proximoFoco");
  }

  atacharEvento(comando, controle) {
    switch (comando) {
      case "salvarPalpites":
        $on(qs("#palpites"), "submit", e => controle(this.fomularioParaJson(e)));
        break;
      case "alternarGabarito":
        $on(qs("#ehGabarito"), "change", e => this.alternarGabarito(e));
        break;
      case "proximoFoco":
        $delegate(this.$conteiner, "input", "keyup", e => this.proximoFoco(e));
        break;
    }
  }
  exibirMensagem = (msg) => {
    const snackbar = new MDCSnackbar(qs(".mdc-snackbar"));

    let data = {
      message: msg.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
    };
    snackbar.show(data);
  }

  mapearElementoParaJson(elemento) {
    let json = "";
    switch (elemento.name) {
      case "mandante-gol":
      case "visitante-gol":
        json = `{"${elemento.name}" : "${elemento.value}"}`;
        break;
      case "ehGabarito":
        json = `{"${elemento.name}" : ${elemento.checked}}`;
        break;
    }
    return json;
  }

  validarElemento(elemento) {
    if (!/^fieldset|button|submit$/.test(elemento.type) && !elemento.disabled) {
      let jsonString = this.mapearElementoParaJson(elemento);
      if (jsonString) {
        return JSON.parse(jsonString);
      }
    }
  }

  fomularioParaJson = evento => {
    evento.preventDefault();
    let $formulario = evento.target,
      formularioJson = {};

    [...$formulario.elements].map(elemento => {
      let jogoId = $parent(elemento, "div").id,
        elementoEmJson = this.validarElemento(elemento);

      if (jogoId) {
        formularioJson[jogoId] ? Object.assign(formularioJson[jogoId], elementoEmJson) : formularioJson[jogoId] = elementoEmJson;
      } else {
        Object.assign(formularioJson, elementoEmJson)
      }
    });

    if ($formulario.checkValidity()) {
      return formularioJson;
    }
  }

  proximoFoco = evento => {
    evento.preventDefault();
    let $input = evento.target,
      gols = parseInt($input.value);
    if (/^[\d]+$/.test(gols)) {
      let $inputs = [...qsa("input", $parent("form"))],
        indice;

      $inputs.find((input, i) => {
        if (input === $input) {
          indice = i + 1;
          return $inputs[indice + 1];
        }
      });
      if ($inputs[indice]) $inputs[indice].focus();
    }
  }

  pegarRodada(evento) {
    evento.preventDefault();
    let rodadaId = evento.target.textContent;
    return rodadaId;
  }

  alternarGabarito(evento) {
    let ehGabarito = evento.target.checked;
    this.jogos = this.jogos.map(jogo => ({...jogo,ehGabarito}));
    this.lista();
  }

  lista() {
    qs("#jogos",this.$conteiner).innerHTML = telaListaJogos(this.jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  emFormaDeLista(jogos) {
    this.jogos = jogos;
    this.$conteiner.innerHTML = telaLista();
    this.lista();
    // this.$conteiner.innerHTML = telaListaJogos({jogos: this.jogos, ehGabarito: this.jogos[0].ehGabarito});
    this.atacharEvento("alternarGabarito");
  }

  abrirTelaPrincipal(opcoes) {
    this.$conteiner.innerHTML = telaPrincipal(opcoes);
  }
}
