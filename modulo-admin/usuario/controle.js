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
        let usuarios = Object.keys(resposta.val())
          .map(usuarioId => ({ ...resposta.val()[usuarioId],
            id: usuarioId,
            classificacao: resposta.val()[usuarioId].classificacao || 0
          }))
          .sort((a, b) => b.classificacao - a.classificacao);
        this.visao.emFormaDeCartao(usuarios)
      });
  }

  novoOuAtualizacao(credential) {
    this.exibirEmFormaDeCartao();
  }
}
