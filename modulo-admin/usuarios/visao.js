import {
    qs,
    $on,
    $parent,
    $delegate
} from "comum/comum";
import Mensagem from "comum/mensagem/mensagem";
import usuarioCard from "./cartao.html";
import foto from "comum/imagens/justice.gif";

export default class Visao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
        this.$principal = qs("#principal");
    }

    atacharEvento(comando, controle, elemento) {
        const self = this;
        switch (comando) {
            case "novoOuAtualizacao":
                $on(this.$principal, "usuario.novoOuAtualizacao", evento => controle(evento.detail));
                break;
        }
    }

    emFormaDeCartao(opcoes = {}) {
        opcoes["foto"] = foto;
        this.$conteiner.innerHTML = usuarioCard(opcoes);
    }

    exibirLogado = usuario => {
        const $usuarioDiv = document.querySelector("#usuario-corrente");
        $usuarioDiv.style.backgroundImage = `url("${usuario.foto}")`;
        const primeiroNome = usuario.nome.split(" ")[0];
        $usuarioDiv.innerHTML = `
                  <h1 class="mdc-card__title login-card__title">${primeiroNome}</h1>`;
        // <h2 class="mdc-card__subtitle">${restoNome}</h2>`;
    }
}
