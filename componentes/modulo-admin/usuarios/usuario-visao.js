import {
    qs,
    $on,
    $parent,
    $delegate
} from "componentes/comum/comum";
import Mensagem from "componentes/comum/mensagem/mensagem";
import usuarioCard from "./usuario-cartao.html";
import foto from "componentes/comum/imagens/justice.gif";

export default class UsuarioVisao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
        this.$principal = qs("#principal");
    }

    atacharEvento(comando, controle) {
        const self = this;
        switch (comando) {
            case "excluirProcesso":
                $delegate(self.$parcial, "#tblProcessos .processo-excluir-js", "click", e => controle(self.pegarProcesso(e)));
                break;
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
