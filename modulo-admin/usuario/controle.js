import Visao from "./visao";
import Servico from "./servico";
import {
  mensagemUtil
} from "comum/mensagem/mensagem";

export default class Usuario {

  constructor(conteiner) {
    this.servico = new Servico();
    this.visao = new Visao(conteiner);
    this.visao.atacharEvento("novoOuAtualizacao", e => this.novoOuAtualizacao(e));
  }
  iniciar(opcoes = {}) {
    this.exibirEmFormaDeCartao(this.visao.abrirTelaPrincipal(opcoes));
  }
  exibirEmFormaDeCartao(opcoes = {}) {

    this.servico.buscarTodos()
      .then(resposta => {

        opcoes["usuarios"] = Object.keys(resposta.val())
          .map(usuarioId => {
            const rodadas = resposta.val()[usuarioId].rodadas || {};
            let pontos = Object.keys(rodadas).map(rodadaId => rodadas[rodadaId].pontos);
            if (pontos.length > 0) {
              pontos = pontos.reduce((a, b) => a + b);
            }

            let placares = Object.keys(rodadas).map(rodadaId => rodadas[rodadaId].placares);
            if (placares.length > 0) {
              placares = placares.reduce((a, b) => a + b);
            }

            return { ...resposta.val()[usuarioId],
              id: usuarioId,
              simulacao: (resposta.val()[usuarioId].simulacao || 0) + pontos,
              pontos: pontos,
              placares: placares
            };
          });
        if (opcoes.ehSimulacao) {
          opcoes["usuarios"] = opcoes.usuarios.sort((a, b) => b.simulacao - a.simulacao);
        } else {
          opcoes["usuarios"] = opcoes.usuarios.sort((a, b) => b.placares - a.placares);
          opcoes["usuarios"] = opcoes.usuarios.sort((a, b) => b.pontos - a.pontos);
        }

        this.visao.emFormaDeCartao(opcoes)
      });
  }

  novoOuAtualizacao(opcoes) {
    this.exibirEmFormaDeCartao(opcoes);
  }
}
