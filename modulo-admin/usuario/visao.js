import {
  qs,
  $on,
  $parent,
  $delegate,
  imagens
} from "comum/util";
import Mensagem from "comum/mensagem/mensagem";
import telaCartao from "./telas/cartao.html";
import telaPrincipal from "./telas/tela-principal.html";

export default class Visao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
  }

  atacharEvento(comando, controle) {
    switch (comando) {
      case "novoOuAtualizacao":
        $on(qs("#principal"), "usuario.novoOuAtualizacao", evento => controle(this.abrirTelaPrincipal(evento.detail)));
        break;
      case "remover":
        $delegate(this.$conteiner, ".js-remover", "click", e => controle(this.pegarId(e)));
        break;
    }
  }

  abrirTelaPrincipal(evento = {}) {
    if (evento.simulacao) {
      evento.$conteiner.innerHTML = telaPrincipal();
      return {
        "$conteiner": evento.$conteiner,
        "ehSimulacao": true
      };
    } else {
      this.$conteiner.innerHTML = telaPrincipal();
      return {
        "$conteiner": this.$conteiner,
        "ehSimulacao": false
      };
    }
  }

  pegarId = (evento, controle) => {
    evento.preventDefault();
    return evento.target.dataset.id;
  }

  emFormaDeCartao(opcoes = {}) {
    opcoes = {...opcoes, imagens}
    qs("#usuarios-cartao", opcoes.$conteiner).innerHTML = telaCartao(opcoes);
  }

  exibirLogado = usuario => {
    // const $usuarioDiv = document.querySelector("#usuario-corrente");
    // $usuarioDiv.style.backgroundImage = `url("${usuario.foto}")`;
    // const primeiroNome = usuario.nome.split(" ")[0];
    // $usuarioDiv.innerHTML = `
    //           <h1 class="mdc-card__title login-card__title">${primeiroNome}</h1>`;
    // // <h2 class="mdc-card__subtitle">${restoNome}</h2>`;
  }
  exibirMensagem = (msg) => {
    const snackbar = new MDCSnackbar(qs(".mdc-snackbar"));

    let data = {
      message: msg
    };
    snackbar.show(data);
  }
}
