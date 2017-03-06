import {
    qs,
    $on,
    $parent,
    $delegate
} from "comum/comum";
import Mensagem from "comum/mensagem/mensagem";
import telaListaJogos from "./telas/lista.html";
import telaPrincipal from "./telas/principal.html";

export default class Visao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    atacharEvento(comando, controle, elemento) {
        const self = this;
        switch (comando) {
            case "salvarPalpites":
                $delegate(this.$conteiner, ".salvar-palpites-js", "click", e => controle(self.pegarRodada(e)));
                break;
        }
    }
    pegarRodada(evento) {
        evento.preventDefault();
        let rodadaId = evento.target.textContent;
        return rodadaId;
    }

    emFormaDeLista(palpites) {
        this.$conteiner.innerHTML = telaListaJogos(palpites);
    }

    abrirTelaPrincipal(opcoes) {
            this.$conteiner.innerHTML = telaPrincipal(opcoes);
    }
}
