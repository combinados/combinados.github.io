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
            case "alternarRodadas":
                $delegate(this.$conteiner, ".alternar-rodada-js", "click", e => self.alternarRodadas(e));
                break;
        }
    }
    emFormaDeCartao(opcoes = {}) {
        opcoes["foto"] = foto;
        this.$conteiner.innerHTML = usuarioCard(opcoes);
        this.atacharEvento("alternarRodadas", e => this.alternarRodadas(e))
    }

    alternarRodadas(evento) {
      evento.preventDefault();
      let usuarioId = evento.target.getAttribute("data-usuario-id"),
      $rodada = qs(`#rodada-${usuarioId}`),
      $classificacao = qs(`#classificacao-${usuarioId}`);
      $rodada.classList.toggle("ocultar");
      $classificacao.classList.toggle("ocultar");
      // $rodada.style.display = "none";
    }
}
