import ServicoGenerico from "comum/servico"
import firebase from "comum/seguranca";
export default class Servico extends ServicoGenerico {
    constructor() {
        super();
    }
    buscarTodos() {
        return firebase.database().ref("usuarios").once("value");
    }
    salvar(atualizacoes) {
      return firebase.database().ref().update(atualizacoes);
    }
}
