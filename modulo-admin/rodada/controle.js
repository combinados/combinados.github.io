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
    }

    buscarJogos(rodadaId) {
        this.servico.buscarJogosDoGabaritoPela(rodadaId)
            .then(jogosGabaritoDeUmaRodadaSnap => {
                let jogos = Object.keys(jogosGabaritoDeUmaRodadaSnap.val())
                    .map(jogoId => {
                        let jogo = jogosGabaritoDeUmaRodadaSnap.val()[jogoId];
                        jogo.palpite = jogo.palpites[this.opcoes.usuario];
                        jogo.jogoId = jogoId;
                        return jogo;
                    });
                this.visao.emFormaDeLista(jogos);
                this.visao.atacharEvento("salvarPalpites", e => this.salvarPalpites(e))
            });
    }

    salvarPalpites = palpites => {
        let atualizacoes = {};
        Object.keys(palpites).map(jogoId => {
            atualizacoes[`/gabarito/${jogoId}/palpites/${this.opcoes.usuario}`] = palpites[jogoId];
        });
        this.servico.salvar(atualizacoes)
            .then(() => this.buscarJogos(this.opcoes.id));
    }
}
