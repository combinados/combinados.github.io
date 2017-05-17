import ServicoGenerico from "comum/servico"
import firebase from "comum/seguranca";
export default class Servico extends ServicoGenerico {
  constructor() {
    super();
  }
  buscarParticipantesEJogos() {
    return Promise.all([firebase.database().ref("usuarios").once("value"),
      firebase
      .database()
      .ref("gabarito")
      // .orderByChild("rodada/id")
      // .equalTo("1ª")
      .once("value")
    ]);
  }

  salvar(atualizacoes) {
    return firebase.database().ref().update(atualizacoes);
  }
}
