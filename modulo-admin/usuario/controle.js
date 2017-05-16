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
    let remocoes = {};
    remocoes[`/usuarios/${this.usuarioId}`] = null;
    [...Array(380)].map((_, i) => remocoes[`/gabarito/${i+1}/palpites/${this.usuarioId}`] = null);

    this.servico.salvar(remocoes)
      .then(resposta => {
        this.exibirEmFormaDeCartao();
      })
      .catch(error => {
        let mensagem = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : error.code
        this.visao.exibirMensagem(mensagem)
      });

    // this.servico.buscarJogosDoGabaritoPela(this.usuarioId)
    //   .then(jogosDoUsuario => {
    //     console.log(jogosDoUsuario.val());
    //   });
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
              pontos,
              placares
            };
          });
        if (opcoes.ehSimulacao) {
          opcoes["usuarios"] = opcoes.usuarios.sort((a, b) => b.simulacao - a.simulacao);
        } else {
          opcoes["usuarios"] = opcoes.usuarios.sort((a, b) => (b.pontos - a.pontos) || (b.placares - a.placares) || (a.nome === b.nome ? 0 : a.nome < b.nome ? -1 : 1));
          // opcoes["usuarios"] = opcoes.usuarios.sort((a, b) => b.placares - a.placares);
        }
        opcoes.permitirRemover = USUARIO_LOGADO.uid === "54YN3SAdb7RckPCw5uYiiCNKjsH3"
        this.visao.emFormaDeCartao(opcoes)
      });
  }

  novoOuAtualizacao(opcoes) {
    this.exibirEmFormaDeCartao(opcoes);
  }
}
