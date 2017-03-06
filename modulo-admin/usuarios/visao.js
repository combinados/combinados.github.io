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
}
