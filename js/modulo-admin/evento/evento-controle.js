import EventoVisao from "./evento-visao";
import EventoServico from "./evento-servico";
import {
  mensagemUtil
} from "../../../componentes/mensagem/mensagem";

export default class Evento {

  constructor(processo) {
    this.servico = new EventoServico();
    this.visao = new EventoVisao("#eventoCompontente");
    this.processo = processo;
    this.andamentoAtual = {};
    this.modalId = "";
  }
  abrirTelaPrincipal(opcoes = {}) {
    opcoes = Object.assign({
      "andamentos": false,
      "providencias": false,
      "exibir": true,
      "processo": this.processo
    }, opcoes);

    // this.visao.abrirTelaPrincipal(opcoes);
    // if (opcoes.exibir) {
    //   this.visao.atacharEvento("selecionarTipoEvento", evento => this.abrirModal(evento));
    //   this.visao.atacharEvento("exibirAndamentos", evento => this.exibirAndamentos(evento));
    // }
    // if (opcoes.andamentos) {
    //   this.buscarEventos("andamentos");
    //   this.visao.atacharEvento("excluirAndamento", e => this.excluirEvento(e));
    //   this.visao.atacharEvento("listarProvidencias", e => this.listarProvidencias(e));
    // }
    // if (opcoes.providencias) {
    //   this.buscarEventos("providencias");
    //   this.visao.atacharEvento("excluirProvidencia", e => this.excluirEvento(e));
    // }
  }

  abrirModal(modalId, andamento) {
    this.modalId = modalId;
    this.visao.abrirModal(this.modalId, andamento);
    this.visao.atacharEvento("buscarEventosPor", evento => this.buscarEventosPor(evento));
  }
  associarEvento(dados) {
    if (dados.eventoPotencial) {
      dados["processoId"] = this.processo.id;

      this.servico.associarEvento(dados)
        .then(resposta => {
          this.visao.fecharModal(this.modalId);
          dados["mensagem"] = `{"mensagens": ${JSON.stringify(resposta.mensagens)}}`;
          if (dados.andamentoId) {
            return this.listarProvidencias(dados);
          }

          this.buscarEventos(dados.tipoEvento);
          mensagemUtil.adicionarMensagens({
            "response": dados.mensagem
          }).mostrar("#mensagem-evento");

        }).catch(req => {
          mensagemUtil.adicionarMensagens(req).mostrar(`#mensagem-${dados.eventoPotencial.evento.id}`);
        });
    }
  }

  excluirEvento(dados) {
    dados["processoId"] = this.processo.id;
    this.servico.excluirEvento(dados)
      .then(resposta => {
        dados["mensagem"] = `{"mensagens": ${JSON.stringify(resposta.mensagens)}}`;
        if (dados.andamentoId) {
          return this.listarProvidencias(dados);
        }

        this.buscarEventos(dados.tipoEvento);
        mensagemUtil.adicionarMensagens({
          "response": dados.mensagem
        }).mostrar("#mensagem-evento");

      })
      .catch(req => {
        mensagemUtil.adicionarMensagens(req).mostrar("#mensagem-evento");
      });
  }

  exibirAndamentos() {
    mensagemUtil.ocultar();
  }

  listarProvidencias(dados) {
    mensagemUtil.apagar("#mensagem-evento");
    let andamentoId = parseInt(dados.andamentoId ? dados.andamentoId : dados.eventoId);
    if (this.processo.andamentos) {
      this.andamentoAtual = Object.assign({}, this.processo.andamentos.find(item => item.andamento.id === andamentoId).andamento);
      let opcoes = {
        andamento: this.andamentoAtual,
        exibirProvidenciasDoAndamento: true
      };
      this.servico.buscarProvidencias(this.processo.id, this.andamentoAtual.id)
        .then(resposta => {
          this.andamentoAtual["providencias"] = resposta.dados.providencias;
          this.andamentoAtual["exibirProvidencias"] = true;
          opcoes["andamento"] = this.andamentoAtual;
          this.visao.listarProvidencias(opcoes);
          this.visao.atacharEvento("pesquisarProvidencia", () => this.abrirModal("#modalprovidencias", this.andamentoAtual));
          this.visao.atacharEvento("excluirProvidenciaAndamento", e => this.excluirEvento(e));
          if (dados.mensagem) {
            mensagemUtil.adicionarMensagens({
              "response": dados.mensagem
            }).mostrar("#mensagem-providencia");
          }
        }).catch(req => {
          this.visao.listarProvidencias(opcoes);
          this.visao.atacharEvento("pesquisarProvidencia", () => this.abrirModal("#modalprovidencias", this.andamentoAtual));
          if (dados.mensagem) {
            mensagemUtil.adicionarMensagens({
              "response": dados.mensagem
            }).mostrar("#mensagem-providencia");
            mensagemUtil.adicionarMensagens(req, false).mostrar("#mensagem-providencia");
          } else {
            mensagemUtil.adicionarMensagens(req).mostrar("#mensagem-providencia");
          }
        });
    }
  }

  buscarEventos(tipoEvento) {
    let opcoes = {
      tipoEvento: tipoEvento
    };
    this.servico.buscarEventos(this.processo.id, tipoEvento)
      .then(resposta => {
        if (tipoEvento === "andamentos") {
          this.processo.andamentos = resposta.dados.andamentos;
          opcoes["exibirAndamentos"] = this.processo.andamentos.length > 0;
        }
        if (tipoEvento === "providencias") {
          this.processo.providencias = resposta.dados.providencias;
          opcoes["exibirProvidencias"] = this.processo.providencias.length > 0;
        }
        opcoes["processo"] = this.processo;
        this.visao.listarEventos(opcoes);
      }).catch(req => {
        mensagemUtil.adicionarMensagens(req).mostrar("#mensagem-evento");
        this.visao.listarEventos(opcoes);
      });
  }

  buscarEventosPor(opcoes) {
    this.servico.buscarEventosPor(opcoes)
      .then(resposta => {
        let dados = {
          tipoEvento: opcoes.tipoEvento,
          eventosPotencial: resposta.dados.eventos
        };
        this.visao.listarEventosPotencial(dados);
        this.visao.atacharEvento("associarEvento", evento => this.associarEvento(evento));
        // mensagemUtil.ocultar("#mensagem-modal");
      }).catch(req => {
        mensagemUtil.adicionarMensagens(req).mostrar("#mensagem-modal");
        this.visao.listarEventosPotencial();
      });
  }
}
