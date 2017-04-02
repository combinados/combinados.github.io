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
          .map(usuarioId => ({ ...resposta.val()[usuarioId],
            id: usuarioId,
            simulacao: (resposta.val()[usuarioId].simulacao || 0) + (resposta.val()[usuarioId].classificacao || 0),
            classificacao: (resposta.val()[usuarioId].classificacao || 0)
          }));
        opcoes["usuarios"] = opcoes.ehSimulacao ? opcoes.usuarios.sort((a, b) => b.simulacao - a.simulacao) : opcoes.usuarios.sort((a, b) => b.classificacao - a.classificacao);

        this.visao.emFormaDeCartao(opcoes)
      });
  }

  novoOuAtualizacao(opcoes) {
    this.exibirEmFormaDeCartao(opcoes);
  }
}
