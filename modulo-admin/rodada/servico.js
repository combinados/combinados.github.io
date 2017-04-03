import ServicoGenerico from "comum/servico"
import firebase from "comum/seguranca";
export default class Servico extends ServicoGenerico {
  constructor() {
    super();
  }

  buscarJogosDoGabaritoPela(rodadaId) {
    rodadaId = decodeURIComponent(rodadaId);
    return firebase
      .database()
      .ref("gabarito")
      .orderByChild("rodada/id")
      .equalTo(rodadaId)
      .once("value");
  }
  salvar(atualizacoes) {
    return firebase.database().ref().update(atualizacoes);
  }
}
