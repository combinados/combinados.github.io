import ServicoGenerico from "componentes/comum/servico"
import firebase from "componentes/comum/seguranca";
export default class Servico extends ServicoGenerico {
    constructor() {
        super();
    }

    buscarJogos(opcoes) {
        let f = firebase;
        return firebase.database().ref("gabarito").orderByChild("rodada").equalTo(opcoes.rodadaId).once("value");
    }
}
