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

    // buscarJogos(rodadaId) {
    //     let jogos;
    //     this.opcoes.rodadaId = rodadaId;
    //     this.servico.buscarJogosDoGabaritoPela(rodadaId)
    //         .then(jogosGabaritoDeUmaRodadaSnap => {
    //             jogos = Object.keys(jogosGabaritoDeUmaRodadaSnap.val())
    //                 .map(jogoId => ({
    //                     jogo: jogoId,
    //                     ...jogosGabaritoDeUmaRodadaSnap.val()[jogoId]
    //                 }));
    //             return this.servico.mesclarJogosEPalpites(jogosGabaritoDeUmaRodadaSnap, this.opcoes.usuario);
    //         })
    //         .then(palpites => {
    //             palpites = palpites
    //                 .filter(palpite => palpite);
    //             palpites
    //                 .map(palpite => {
    //                     jogos = jogos
    //                         .filter(jogo => palpite.jogo !== jogo.jogo);
    //                 });
    //
    //             palpites = [...jogos, ...palpites];
    //             this.visao.emFormaDeLista(palpites);
    //         });
    // }

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
            });
    }
}
