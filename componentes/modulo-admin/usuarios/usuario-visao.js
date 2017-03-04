import {
    qs,
    $on,
    $parent,
    $delegate
} from "componentes/comum/comum";
import Mensagem from "componentes/comum/mensagem/mensagem";
import usuarioCard from "./usuario-cartao.html";
import rodadaLista from "./rodada-lista.html";
import foto from "componentes/comum/imagens/justice.gif";

export default class UsuarioVisao {

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
            case "alternarRodadas":
                $delegate(this.$conteiner, ".alternar-rodada-js", "click", e => controle(self.alternarRodadas(e)));
                break;
            case "abrirJogos":
                $delegate(elemento, ".abrir-jogos-js", "click", e => controle(self.pegarRodada(e)));
                break;
        }
    }
    pegarRodada(evento) {
        evento.preventDefault();
        let rodadaId = evento.target.textContent,
            usuarioId = evento.target.getAttribute("data-usuario-id");
        return {
            rodadaId,
            usuarioId
        };
    }
    emFormaDeCartao(opcoes = {}) {
        opcoes["foto"] = foto;
        this.$conteiner.innerHTML = usuarioCard(opcoes);
    }
    emFormaDeLista(jogos) {
      this.$conteiner.classList.toggle("ocultar");
      let $rodada = qs("#rodada-conteiner");
      $rodada.innerHTML = rodadaLista(jogos);
      $rodada.classList.toggle("ocultar");

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

    criarRodadas($rodada) {
        if (!$rodada.classList.contains("ocultar") && !$rodada.hasChildNodes()) {
            $rodada.innerHTML = `
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            ${[...Array(38)].map((_,i) => `
            <button class="mdc-button mdc-button--primary mdc-button--dense abrir-jogos-js" data-usuario-id="${$rodada.id.split("-")[1]}">${i+1}ª</button>
            `).join("")}
          </div>`;
            return true;
        }
        return false;
    }
}
