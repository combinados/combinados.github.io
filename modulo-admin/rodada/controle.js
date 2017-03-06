import Visao from "./visao";
import Servico from "./servico";
import {
    mensagemUtil
} from "comum/mensagem/mensagem";

export default class Rodada {

    constructor(conteiner) {
        this.servico = new Servico();
        this.visao = new Visao(conteiner);
        this.opcoes = {
            "fotoUsuario": false,
            "exibir": true
        };
    }
    abrirTelaPrincipal(opcoes = {}) {
        this.opcoes = Object.assign(this.opcoes, opcoes);
        opcoes.id ? this.buscarJogos(opcoes.id) : this.visao.abrirTelaPrincipal(opcoes);

        // this.visao.atacharEvento("abrirJogos", e => this.buscarJogos(e));
    }

    buscarJogos(rodadaId) {
        let jogos;
        this.opcoes.rodadaId = rodadaId;
        this.servico.buscarJogosDoGabaritoPela(rodadaId)
            .then(jogosGabaritoDeUmaRodada => this.servico.mesclarJogosEPalpites(jogosGabaritoDeUmaRodada, this.opcoes.usuario))
            .then(palpites => this.visao.emFormaDeLista(palpites));
    }
}
