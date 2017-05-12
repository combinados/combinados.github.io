import Visao from "./visao";
import Servico from "./servico";
import {
  qs
} from "comum/util";
import {
  mensagemUtil
} from "comum/mensagem/mensagem";
import {
  MDCDialog,
  MDCDialogFoundation,
  util
} from "@material/dialog";
export default class Usuario {

  constructor(conteiner) {
    this.servico = new Servico();
    this.visao = new Visao(conteiner);
    this.usuarioId = "";
    this.dialog = null;
    this.visao.atacharEvento("novoOuAtualizacao", e => this.novoOuAtualizacao(e));
    this.visao.atacharEvento("remover", id => {
      this.usuarioId = id;
      this.dialog.show();
    });
  }
  iniciar(opcoes = {}) {
    this.exibirEmFormaDeCartao(this.visao.abrirTelaPrincipal(opcoes));
    this.dialog = new MDCDialog(qs("#dialogo-excluir"));
    this.dialog.listen("MDCDialog:accept", this.remover);
  }

  remover = () => {
    console.log(this.usuarioId);
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
