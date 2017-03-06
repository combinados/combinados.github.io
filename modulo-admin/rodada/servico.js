import ServicoGenerico from "comum/servico"
import firebase from "comum/seguranca";
export default class Servico extends ServicoGenerico {
    constructor() {
        super();
    }

    buscarJogosDoGabaritoPela(rodadaId) {
        return firebase
            .database()
            .ref("gabarito")
            .orderByChild("rodada")
            .equalTo(rodadaId)
            .once("value");
    }

    mesclarJogosEPalpites(jogosGabaritoDeUmaRodadaSnap, usuarioId) {
        let promessas = Object
            .keys(jogosGabaritoDeUmaRodadaSnap.val())
            .map(jogoId => {
                return firebase
                    .database()
                    .ref("palpites")
                    .orderByChild("jogo")
                    .equalTo(jogoId)
                    .once("value")
                    .then(palpiteSnap => {
                        let palpite = Object
                            .keys(palpiteSnap.val())
                            .map(palpiteId => (palpiteSnap.val()[palpiteId].jogo === jogoId && palpiteSnap.val()[palpiteId].usuario === usuarioId) ? palpiteSnap.val()[palpiteId] : false)
                            .filter(palpite => palpite)[0];
                        return Object.assign(jogosGabaritoDeUmaRodadaSnap.val()[jogoId], palpite);
                    });
            });
        return Promise.all(promessas);
    }
}
