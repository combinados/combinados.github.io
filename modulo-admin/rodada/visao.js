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
import telaJogosPalpites from "./telas/jogosPalpites.html";
import telaJogosGabarito from "./telas/jogosGabarito.html";
import telaJogosSimulador from "./telas/jogosSimulador.html";
import telaJogosConteiner from "./telas/jogosConteiner.html";

import telaRodadas from "./telas/rodadas.html";

export default class Visao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
    this.jogos = {};
    this.atacharEvento("proximoFoco");
  }

  atacharEvento = (comando, controle) => {
    switch (comando) {
      case "salvarPalpitesOuGabaritoOuSimulador":
        $on(qs("#frmPalptes"), "submit", e => controle(this.formularioParaJson(e)));
        break;
      case "alternarTipoTabela":
        $delegate(this.$conteiner, "input[type='radio']", "change", e => this.alternarTipoTabela(e));
        break;
      case "proximoFoco":
        $delegate(this.$conteiner, "input", "keyup", e => this.proximoFoco(e));
        break;
    }
  }

  exibirMensagem = (msg) => {
    const snackbar = new MDCSnackbar(qs(".mdc-snackbar"));

    let data = {
      message: msg
    };
    snackbar.show(data);
  }

  mapearElementoParaJson(elemento) {
    let json = "";
    switch (elemento.name) {
      case "mandante-gol":
        json = `{
          "mandante" : {
            "gol": ${elemento.value}
          }
        }`;
        break;
      case "visitante-gol":
        json = `{
            "visitante" : {
              "gol": ${elemento.value}
            }
          }`;
        break;
      case "tipo-tabela":
        json = `{"tipoTabela": {"${elemento.id}" : ${elemento.checked}}}`;
        break;
    }
    return json;
  }

  validarElemento(elemento) {
    let jsonString = this.mapearElementoParaJson(elemento);
    if (jsonString) {
      return JSON.parse(jsonString);
    }
  }

  formularioParaJson = evento => {
    let $formulario,
      formularioJson = {},
      elementoEmJson = {};
    if (evento.id === "frmPalptes") {
      $formulario = evento;
    } else {
      evento.preventDefault();
      $formulario = evento.target;
    }

    [...$formulario.elements].map(elemento => {
      if (/^number|radio$/.test(elemento.type) && !elemento.disabled) {
        let elementoJson = this.validarElemento(elemento),
          jogoId = $parent(elemento, "div").getAttribute("data-jogo-id");
        if (elementoJson.tipoTabela) {
          elementoEmJson.tipoTabela = elementoEmJson.tipoTabela ?
            Object.assign(elementoEmJson.tipoTabela, elementoJson.tipoTabela) :
            elementoEmJson.tipoTabela = elementoJson.tipoTabela;
        } else {
          elementoEmJson = elementoJson;
        }

        if (jogoId) {
          formularioJson[jogoId] ? Object.assign(formularioJson[jogoId], elementoEmJson) : formularioJson[jogoId] = elementoEmJson;
        } else {
          Object.assign(formularioJson, elementoEmJson);
        }
      }
    });

    if ($formulario.checkValidity()) {
      return formularioJson;
    }
  }

  proximoFoco = evento => {
    evento.preventDefault();
    let $formulario = qs("#frmPalptes")
    if ($formulario.checkValidity() && evento.keyCode === 13) {
      this.formularioParaJson($formulario);
    } else {
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
  }

  pegarRodada(evento) {
    evento.preventDefault();
    let rodadaId = evento.target.textContent;
    return rodadaId;
  }

  alternarTipoTabela(evento) {
    let {ehGabarito, ehPalpite, ehSimulador} = evento;
    if (evento.target) {
      ehGabarito = evento.target.checked && evento.target.id === "ehGabarito";
      ehPalpite = evento.target.checked && evento.target.id === "ehPalpite";
      ehSimulador = evento.target.checked && evento.target.id === "ehSimulador";
    }
    switch (true) {
      case ehGabarito:
        this.exibirGabarito(this.jogos);
        break;
      case ehPalpite:
        this.exibirPalpites(this.jogos);
        break;
      case ehSimulador:
        this.exibirSimulador(this.jogos);
        break;
      default:
    }
  }

  exibirPalpites(jogos) {
    qs("#btnSalvar").textContent = "Salvar Palpites";
    qs("#ehPalpite").checked = true;
    qs("#jogos", this.$conteiner).innerHTML = telaJogosPalpites(jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  exibirGabarito(jogos) {
    qs("#btnSalvar").textContent = "Salvar Gabarito";
    qs("#ehGabarito").checked = true;
    qs("#jogos", this.$conteiner).innerHTML = telaJogosGabarito(jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  exibirSimulador(jogos) {
    qs("#btnSalvar").textContent = "Salvar Simulador";
    qs("#ehSimulador").checked = true;
    qs("#jogos", this.$conteiner).innerHTML = telaJogosSimulador(jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  emFormaDeLista(jogos, tipoTabela = {}) {
    this.jogos = Object.assign({}, jogos);
    this.$conteiner.innerHTML = telaJogosConteiner();
    this.atacharEvento("alternarTipoTabela");
    this.alternarTipoTabela(tipoTabela);
  }

  abrirTelaPrincipal(opcoes) {
    this.$conteiner.innerHTML = telaRodadas(opcoes);
  }
}
