import Visao from "./visao";
import Servico from "./servico";
import {
  mensagemUtil
} from "comum/mensagem/mensagem";

export default class Usuario {

  constructor(conteiner) {
    this.servico = new Servico();
    this.visao = new Visao(conteiner);
    // this.visao.atacharEvento("novoOuAtualizacao", e => this.novoOuAtualizacao(e));
  }
  iniciar(opcoes = {}) {
    this.visao.abrirTelaPrincipal(opcoes);
    this.exibirEmFormaDeCartao();
  }
  exibirEmFormaDeCartao(opcoes = {}) {

    this.servico.buscarTodos()
      .then(resposta => {
        let usuarios = Object.keys(resposta.val())
          // .sort((a, b) => resposta.val()[a].classificacao - resposta.val()[b].classificacao)
          // .reverse()
          .map(usuarioId => ({ ...resposta.val()[usuarioId],id: usuarioId,classificacao: resposta.val()[usuarioId].classificacao || 0}))
          .sort((a,b)=> b.classificacao - a.classificacao);

        // let entries = Object.entries(resposta.val());
        // let sorted = entries.sort((a, b) => b[1].classificacao - a[1].classificacao);
        this.visao.emFormaDeCartao(usuarios)
      });
  }

  novoOuAtualizacao(credential) {
    // this.servico.criarOuAtualizar(credential)
    //     .then(usuario => {
    //         usuario = usuario || {
    //             foto: imagemPadrao,
    //             nome: "Deslogado"
    //         };
    //         this.visao.exibirLogado(usuario);
    //         return this.servico.buscarTodos();
    //     })
    //     .then(resposta => this.visao.emFormaDeCartao(resposta));
  }
}
