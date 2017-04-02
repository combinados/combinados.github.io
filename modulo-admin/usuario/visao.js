import {
  qs,
  $on,
  $parent,
  $delegate
} from "comum/comum";
import Mensagem from "comum/mensagem/mensagem";
import telaCartao from "./telas/cartao.html";
import telaPrincipal from "./telas/tela-principal.html";

export default class Visao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
  }

  atacharEvento(comando, controle) {
    const self = this;
    switch (comando) {
      case "novoOuAtualizacao":
        $on(qs("#principal"), "usuario.novoOuAtualizacao", evento => controle(this.abrirTelaPrincipal(evento.detail)));
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

  emFormaDeCartao(opcoes = {}) {
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
}
