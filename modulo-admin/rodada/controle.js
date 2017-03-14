import Visao from "./visao";
import Servico from "./servico";
import {
    mensagemUtil
} from "comum/mensagem/mensagem";

export default class Rodada {

    constructor(conteiner) {
        this.servico = new Servico();
        this.visao = new Visao(conteiner);
        this.opcoes = {};
    }
    iniciar(opcoes = {}) {
        this.opcoes = opcoes;
        this.opcoes.id ? this.buscarJogos(this.opcoes.id) : this.visao.abrirTelaPrincipal(this.opcoes);
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
        let atualizacoes = {},
        ehGabarito = palpites.ehGabarito;

        delete palpites["ehGabarito"];

        Object.keys(palpites).map(jogoId => {
          if(ehGabarito) {
            atualizacoes[`/gabarito/${jogoId}`] = palpites[jogoId];
          }
          else {
            atualizacoes[`/gabarito/${jogoId}/palpites/${this.opcoes.usuario}`] = palpites[jogoId];
          }
        });
        this.servico.salvar(atualizacoes)
            .then(() => this.buscarJogos(this.opcoes.id))
            .catch(error => this.visao.exibirMensagem(error));
    }
}
