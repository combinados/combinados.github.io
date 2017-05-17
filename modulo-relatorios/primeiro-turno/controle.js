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
    // this.servico.buscarParticipantesEJogos()
    //   .then(resposta => {

        // ///////////////////Definir o Campeão de cada participante. Obs.: 191 Primeiro Turno
        // let usuarios = {};
        // Object.keys(resposta[1].val())
        //   .filter(idJogo => parseInt(idJogo) < 191)
        //   .map(idJogo => {
        //     Object.keys(resposta[1].val()[idJogo].palpites)
        //       .map(usuarioId => {
        //         let mNome = resposta[1].val()[idJogo].mandante.nome,
        //           mGol = resposta[1].val()[idJogo].palpites[usuarioId].mandante.gol,
        //           vNome = resposta[1].val()[idJogo].visitante.nome,
        //           vGol = resposta[1].val()[idJogo].palpites[usuarioId].visitante.gol,
        //           mPontos = mGol > vGol ? 3 : mGol === vGol ? 1 : 0,
        //           vPontos = mGol < vGol ? 3 : mGol === vGol ? 1 : 0;
        //         if (!usuarios[usuarioId]) {
        //           usuarios[usuarioId] = {
        //             [mNome]: mPontos,
        //             [vNome]: vPontos
        //           };
        //         } else {
        //           usuarios[usuarioId][mNome] = usuarios[usuarioId][mNome] ? usuarios[usuarioId][mNome] + mPontos : mPontos;
        //           usuarios[usuarioId][vNome] = usuarios[usuarioId][vNome] ? usuarios[usuarioId][vNome] + vPontos : vPontos;
        //         }
        //       })
        //   });
        //
        // let atualizacoes = {}
        // Object.keys(usuarios)
        //   .map(usuarioId => {
        //     let entries = Object.entries(usuarios[usuarioId]);
        //     let sorted = entries.sort((a, b) => b[1] - a[1]);
        //     let retorno = {
        //       usuarioId,
        //       timesCampeoes: [sorted[0][0]],
        //       timesRebaixados: [sorted[sorted.length - 1][0]],
        //       pontosCampeoes: sorted[0][1],
        //       pontosRebaixados: sorted[sorted.length - 1][1]
        //     };
        //     for (let i = 1; i < sorted.length - 1; i++) {
        //       if (sorted[i][1] === retorno.pontosCampeoes) {
        //         retorno.timesCampeoes.push(sorted[i][0]);
        //       }
        //       if (sorted[i][1] === retorno.pontosRebaixados) {
        //         retorno.timesRebaixados.push(sorted[i][0]);
        //       }
        //     }
        //     return retorno;
        //   })
        //   .map(campeao => {
        //     let usuarioId = campeao.usuarioId;
        //     delete campeao["usuarioId"];
        //     atualizacoes[`/usuarios/${usuarioId}/campeao`] = campeao;
        //   });
        //
        // // console.log(atualizacoes);
        //
        // this.servico.salvar(atualizacoes)
        //   .then(resposta => {
        //     this.visao.exibirMensagem("Capeões dos Participantes Atualizado");
        //   })
        //   .catch(error => {
        //     let mensagem = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : error.code
        //     this.visao.exibirMensagem(mensagem)
        //   });

        // ///////////////// Exibir Tela de Autitoria
        // opcoes["jogos"] = Object.keys(resposta[1].val())
        //   .filter(idJogo => parseInt(idJogo) < 191)
        //   .map(idJogo => {
        //     return {
        //       ...resposta[1].val()[idJogo],
        //       palpites: Object.keys(resposta[1].val()[idJogo].palpites)
        //         .map(usuarioId => Object.assign({}, resposta[1].val()[idJogo].palpites[usuarioId], resposta[0].val()[usuarioId]))
        //     }
        //   });
        // this.visao.abrirTelaPrincipal(opcoes);
      // });
  }
}
