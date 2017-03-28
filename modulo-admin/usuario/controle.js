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
    this.visao.abrirTelaPrincipal(opcoes);
    this.exibirEmFormaDeCartao();
  }
  exibirEmFormaDeCartao(opcoes = {}) {

    this.servico.buscarTodos()
      .then(resposta => {
        if(opcoes.ehSimulacao) {
          opcoes["usuarios"] = Object.keys(resposta.val())
          .map(usuarioId => ({ ...resposta.val()[usuarioId],
            id: usuarioId,
            simulacao: resposta.val()[usuarioId].simulacao || 0
          }))
          .sort((a, b) => b.simulacao - a.simulacao);
        }
        else {
          opcoes["usuarios"] = Object.keys(resposta.val())
          .map(usuarioId => ({ ...resposta.val()[usuarioId],
            id: usuarioId,
            classificacao: resposta.val()[usuarioId].classificacao || 0
          }))
          .sort((a, b) => b.classificacao - a.classificacao);
        }
        this.visao.emFormaDeCartao(opcoes)
      });
  }

  novoOuAtualizacao(simulacao) {
    this.exibirEmFormaDeCartao({
      ehSimulacao: simulacao
    });
  }
}
