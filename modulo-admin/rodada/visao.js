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

  atacharEvento(comando, controle) {
    switch (comando) {
      case "salvarPalpitesOuGabaritoOuSimulador":
        $on(qs("#frmPalptes"), "submit", e => controle(this.formularioParaJson(e)));
        break;
      case "alternarGabarito":
        $delegate(this.$conteiner, "input[type='radio']", "change", e => this.alternarGabarito(e));
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
        json = `{"${elemento.id}" : ${elemento.checked}}`;
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
      formularioJson = {};
    if (evento.id === "frmPalptes") {
      $formulario = evento;
    } else {
      evento.preventDefault();
      $formulario = evento.target;
    }

    [...$formulario.elements].map(elemento => {
      if (/^number|radio$/.test(elemento.type) && !elemento.disabled) {
        let elementoEmJson = this.validarElemento(elemento),
          jogoId = $parent(elemento, "div").getAttribute("data-jogo-id");
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

  alternarGabarito(evento) {
    let ehGabarito = evento.target.checked && evento.target.id === "ehGabarito",
      ehPalpite = evento.target.checked && evento.target.id === "ehPalpite",
      ehSimulador = evento.target.checked && evento.target.id === "ehSimulador",
      $btnSalvar = qs("#btnSalvar");
    switch (true) {
      case ehGabarito:
        $btnSalvar.textContent = "Salvar Gabarito";
        this.exibirGabarito(this.jogos);
        break;
      case ehPalpite:
        $btnSalvar.textContent = "Salvar Palpites";
        this.exibirPalpites(this.jogos);
        break;
      case ehSimulador:
        $btnSalvar.textContent = "Salvar Simulador";
        this.exibirSimulador(this.jogos);
        break;
      default:

    }

  }

  exibirPalpites(jogos) {
    qs("#jogos", this.$conteiner).innerHTML = telaJogosPalpites(jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  exibirGabarito(jogos) {
    qs("#jogos", this.$conteiner).innerHTML = telaJogosGabarito(jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  exibirSimulador(jogos) {
    qs("#jogos", this.$conteiner).innerHTML = telaJogosSimulador(jogos);
    [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
  }

  emFormaDeLista(jogos) {
    this.jogos = Object.assign({}, jogos);
    this.$conteiner.innerHTML = telaJogosConteiner();
    this.atacharEvento("alternarGabarito");
    this.exibirPalpites(jogos);
  }

  abrirTelaPrincipal(opcoes) {
    this.$conteiner.innerHTML = telaRodadas(opcoes);
  }
}
