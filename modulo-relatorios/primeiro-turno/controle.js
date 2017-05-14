import Visao from "./visao";
import Servico from "./servico";
import {
  qs
} from "comum/util";
export default class Usuario {

  constructor(conteiner) {
    this.servico = new Servico();
    this.visao = new Visao(conteiner);
  }
  iniciar(opcoes = {}) {
    this.servico.buscarParticipantesEJogos()
      .then(resposta => {
        opcoes["jogos"] = Object.keys(resposta[1].val())
          .filter(idJogo => parseInt(idJogo) < 191)
          .map(idJogo => {
            return {
              ...resposta[1].val()[idJogo],
              palpites: Object.keys(resposta[1].val()[idJogo].palpites)
                .map(usuarioId => Object.assign({}, resposta[1].val()[idJogo].palpites[usuarioId], resposta[0].val()[usuarioId]))
            }
          });
        this.visao.abrirTelaPrincipal(opcoes);
      });
  }
}
