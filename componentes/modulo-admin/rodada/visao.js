import {
    qs,
    $on,
    $parent,
    $delegate
} from "componentes/comum/comum";
import Mensagem from "componentes/comum/mensagem/mensagem";
import rodadaLista from "./tela-lista.html";
import telaPrincipal from "./tela-principal.html";

export default class Visao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    atacharEvento(comando, controle, elemento) {
        const self = this;
        switch (comando) {
            case "novoOuAtualizacao":
                $on(this.$conteiner, "usuario.novoOuAtualizacao", evento => controle(evento.detail));
                break;
            case "alternarRodadas":
                $delegate(this.$conteiner, ".alternar-rodada-js", "click", e => controle(self.alternarRodadas(e)));
                break;
            case "abrirJogos":
                $delegate(this.$conteiner, ".abrir-jogos-js", "click", e => controle(self.pegarRodada(e)));
                break;
        }
    }
    pegarRodada(evento) {
        evento.preventDefault();
        let rodadaId = evento.target.textContent;
        return rodadaId;
    }

    emFormaDeLista(jogos) {
        let $rodada = qs("#rodada-conteiner");
        $rodada.innerHTML = rodadaLista(jogos);
        console.log(Object.keys(jogos.val()));
    }

    alternarRodadas(evento) {
        evento.preventDefault();
        let usuarioId = evento.target.getAttribute("data-usuario-id"),
            $rodada = qs(`#rodada-${usuarioId}`),
            $classificacao = qs(`#classificacao-${usuarioId}`);
        $classificacao.classList.toggle("ocultar");
        $rodada.classList.toggle("ocultar");
        return $rodada;
    }

    abrirTelaPrincipal(opcoes) {
            this.$conteiner.innerHTML = telaPrincipal(opcoes);
    }
}
