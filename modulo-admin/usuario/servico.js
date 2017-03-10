import ServicoGenerico from "comum/servico"
import firebase from "comum/seguranca";
export default class Servico extends ServicoGenerico {
    constructor() {
        super();
    }
    buscarTodos() {
        return firebase.database().ref("usuarios").orderByKey().once("value");
    }
    buscarJogos(rodadaId) {
        return firebase.database().ref("gabarito").orderByChild("rodada").equalTo(rodadaId).once("value");
    }
}
