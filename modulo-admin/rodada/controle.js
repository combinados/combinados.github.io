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
                        if (jogo.palpites) {
                            jogo.palpite = jogo.palpites[this.opcoes.usuario];
                        }
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
            if (ehGabarito) {
                atualizacoes[`/gabarito/${jogoId}/mandante/gol`] = palpites[jogoId].mandante.gol;
                atualizacoes[`/gabarito/${jogoId}/visitante/gol`] = palpites[jogoId].visitante.gol;

            } else {
                atualizacoes[`/gabarito/${jogoId}/palpites/${this.opcoes.usuario}`] = palpites[jogoId];
            }
        });
        this.servico.salvar(atualizacoes)
            .then(resposta => {
                if (ehGabarito) {
                    let atualizacoesPonto = {};
                    this.servico.buscarJogosDoGabaritoPela(this.opcoes.id)
                        .then(jogosGabaritoDeUmaRodadaSnap => {
                            let jogos = Object.keys(jogosGabaritoDeUmaRodadaSnap.val())
                                .map(jogoId => {
                                    let jogo = jogosGabaritoDeUmaRodadaSnap.val()[jogoId];
                                    let pontos = this.calcularPontos(jogo);
                                });
                        });
                }
                return this.buscarJogos(this.opcoes.id)
            })
            .catch(error => {
                this.visao.exibirMensagem(error)
            });
    }

    calcularPontos = (jogo) => {
      let gm = parseInt(jogo.mandante.gol),
          gv = parseInt(jogo.visitante.gol);
          Object.keys(jogo.palpites).map(usuarioId => {
            let pm = jogo.palpites[usuarioId].mandante.gol,
            pv = jogo.palpites[usuarioId].visitante.gol;
            if(gm === pm && gv === pv) return 3;
          });
    }
    simularPontos = (palpite, palpiteSimulado) => {
        let pm = palpite.placar_mandante,
            pv = palpite.placar_visitante;
        if (palpiteSimulado.placar_mandante === "" || palpiteSimulado.placar_visitante === "" || palpite.placar_mandante === "" || palpite.placar_visitante === "") {
            return 0;
        } else if (palpiteSimulado.placar_mandante === palpite.placar_mandante && palpiteSimulado.placar_visitante === palpite.placar_visitante) {
            return 3;
        } else if (
            (palpiteSimulado.placar_mandante === palpiteSimulado.placar_visitante && palpite.placar_mandante === palpite.placar_visitante) ||
            (palpiteSimulado.placar_mandante < palpiteSimulado.placar_visitante && palpite.placar_mandante < palpite.placar_visitante) ||
            (palpiteSimulado.placar_mandante > palpiteSimulado.placar_visitante && palpite.placar_mandante > palpite.placar_visitante)) {
            return 1;
        } else {
            return 0;
        }
    }
}
