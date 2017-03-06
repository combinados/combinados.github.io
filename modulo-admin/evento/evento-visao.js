import {
  qs,
  $on,
  $parent,
  $delegate
} from "../../comum";
import Mensagem from "../../../mensagem/mensagem";
import EventoTemplate from "./evento-template";
import Dialogo from "../../../dialogo/dialogo-exclusao"

export default class EventoVisao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
    this.$parcial = qs("#parcial");
    this.template = new EventoTemplate();
  }

  atacharEvento(comando, controle) {
    const self = this;
    switch (comando) {
      case "listarProvidencias":
        $delegate(qs("#andamentos"), ".andamento-providencias-js", "click", e => controle(self.pegarEvento(e, "andamento")));
        break;
      case "associarEvento":
        $delegate(qs("#eventoPotencial"), "form", "submit", e => controle(self.eventoSelecionado(e)));
        break;
      case "selecionarTipoEvento":
        $delegate(qs("#cmbTipoEvento"), "a", "click", e => controle(this.selecionarTipoEvento(e)));
        break;
      case "buscarEventosPor":
        $on(qs("#frmEvento"), "submit", e => controle(self.buscarEventosPor(e)));
        break;
      case "excluirAndamento":
        $delegate(qs("#andamentos"), ".excluir-andamento-js", "click", e => self.questionarExclusao(e, controle, "andamento"));
        break;
      case "excluirProvidencia":
        $delegate(qs("#providencias"), ".excluir-providencia-js", "click", e => self.questionarExclusao(e, controle, "providencia"));
        break;
      case "excluirProvidenciaAndamento":
        $delegate(qs("#andamento-providencias"), ".excluir-providencia-js", "click", e => self.questionarExclusao(e, controle, "providencia"));
        break;
      case "exibirAndamentos":
        $on(qs("#btnExibirAndamentos"), "click", e => controle(self.exibirAndamentos(e)));
        break;
      case "pesquisarProvidencia":
        $on(qs("#btnPesquisarProvidencia"), "click", e => controle());
        break;
      case "aplicarMascaraHora":
        $delegate(qs("#eventosPotencial"), ".mascara-hora-js", "click", e => self.aplicarMascaraHora(e));
        break;
    }
  }
  abrirTelaPrincipal(opcoes = {}) {
    this.template.exibirTelaPrincipal(this.$conteiner, opcoes);
  }

  pegarEvento(e, tipoEvento) {
    e.preventDefault();
    let $btnEvento = e.target;
    return {
      eventoId: $btnEvento.getAttribute(`data-${tipoEvento}-id`),
      andamentoId: $btnEvento.getAttribute("data-id-andamento")
    };
  }
  questionarExclusao(e, controle, tipoEvento) {
    let dados = this.pegarEvento(e, tipoEvento);
    dados["tipoEvento"] = `${tipoEvento}s`;

    let opcoes = {
      callback: controle,
      dados: dados,
      titulo: `Excluir ${tipoEvento === "andamento" ? "Andamento" : "Providência"}?`
    }
    const dialogo = new Dialogo(opcoes);
    dialogo.exibirModal();
  }

  selecionarTipoEvento(e) {
    e.preventDefault();
    return e.target.getAttribute(["href"]);
  }

  abrirModal(modalId, andamento) {
      let $modal = qs("#modalEvento"),
        dados = {
          "modalId": modalId
        };
      switch (modalId) {
        case "#modalandamentos":
          dados["titulo"] = "Associar Andamento ao Processo";
          dados["ajuda"] = "Digite a descrciao do andamento que deseja buscar";
          dados["id"] = "andamentos";
          break;
        case "#modalprovidencias":
          dados["titulo"] = `Associar Providência ao ${andamento ? `Andamento: ${andamento.evento}` : "Processo"}`;
        dados["ajuda"] = "Digite a descrciao da providência que deseja buscar";
        dados["id"] = "providencias";
        if(andamento) {
          dados["andamentoId"] = andamento.id;
        }
        break;
      }
      if (modalId) {
        this.template.prepararModal($modal, dados);
        $(modalId).modal();
      }
  }

  fecharModal(modalId) {
    $(modalId).modal("hide");
  }

  eventoSelecionado(e) {
    e.preventDefault();
    let $formEvento = e.target,
    dados = {
      andamentoId: qs("#eventosPotencial").getAttribute("data-andamento-id"),
      tipoEvento: $formEvento.getAttribute("data-evento-tipo"),
      eventoPotencial: this.validarFormulario($formEvento)
    }
    return dados;
  }

  exibirErro(elemento, id) {
    let $grupoPai = $parent(elemento, "div", "form-group")
    $grupoPai.classList.add("has-error");
    $grupoPai.classList.remove("has-success");
    let erro = qs(`#${elemento.name}-erro-${id}`);
    if (erro) {
      erro.classList.remove("invisible")
    }
  }

  exibirSucesso(elemento, id) {
    let $grupoPai = $parent(elemento, "div", "form-group")
    $grupoPai.classList.add("has-success");
    $grupoPai.classList.remove("has-error");

    let erro = qs(`#${elemento.name}-erro-${id}`);
    if (erro) {
      erro.classList.add("invisible")
    }
  }

  mapearElementoParaJson(elemento) {
    let json = "";
    switch (elemento.name) {
      case "instancia_extraordinaria":
        if (elemento.checked) {
          json = `{"${elemento.name}" : ${elemento.checked}}`;
        }
        break;
      case "data":
      case "data_prazo_fatal":
        // Browser sem suporte ao tipo date
        if (elemento.type === "text") {
          json = `{"${elemento.name}" : "${elemento.value.replace(/^(\d{2})[-/](\d{2})[-/](\d{4})$/, "$3-$2-$1")}"}`;
        } else {
          json = `{"${elemento.name}" : "${elemento.value}"}`;
        }
        break;
      case "fase":
      case "observacao":
      case "hora_prazo_fatal":
        json = `{"${elemento.name}" : "${elemento.value}"}`;
        break;
      case "evento":
      case "tipo_providencia":
        json = `{"${elemento.name}" : {"id" : "${elemento.value}"}}`;
        break;
    }
    return json;
  }

  validarElemento(elemento, id) {
    if (!/^fieldset|button|submit$/.test(elemento.type) && !elemento.disabled) {
      if (!elemento.checkValidity()) {
        this.exibirErro(elemento, id);
      } else {
        this.exibirSucesso(elemento, id);
        let jsonString = this.mapearElementoParaJson(elemento);
        if (jsonString) {
          return JSON.parse(jsonString);
        }
      }
    }
  }

  validarFormulario($formulario) {
    let formularioJson = {},
      id = $formulario.getAttribute("data-evento-id");

    [...$formulario.elements].map(elemento => {
      Object.assign(formularioJson, this.validarElemento(elemento, id));
    });
    if ($formulario.checkValidity()) {
      return formularioJson;
    }
  }

  buscarEventosPor(e) {
    e.preventDefault();
    let form = e.target,
      elemento = form.elements[0];
    return {
      filtro: `${elemento.name}=${elemento.value}`,
      tipoEvento: form.getAttribute("data-tipo-evento")
    };
  }

  listarEventos(opcoes = {
    "processo": {}
  }) {
    this.template.exibirEventos(opcoes);
  }

  listarEventosPotencial(dados = {}) {
    dados["exibir"] = dados.eventosPotencial ? dados.eventosPotencial.length > 0 : false;
    this.template.exibirEventosPotencial(qs("#eventosPotencial"), dados);
    this.atacharEvento("aplicarMascaraHora");
  }
  listarProvidencias(opcoes = {}) {
    // opcoes["exibirProvidenciasDoAndamento"] = opcoes.andamento.providencias ? opcoes.andamento.providencias.length > 0 : false;
    if (opcoes.exibirProvidenciasDoAndamento) {
      qs("#andamentos").classList.add("hidden");
      qs("#andamento-providencias").classList.remove("hidden");
      qs("#btnExibirAndamentos").classList.remove("hidden");
      this.template.exibirProvidencias(qs("#andamento-providencias"), opcoes);
    }
  }
  exibirAndamentos() {
    qs("#andamento-providencias").classList.add("hidden");
    qs("#btnExibirAndamentos").classList.add("hidden");
    qs("#andamentos").classList.remove("hidden");
  }

  aplicarMascaraHora(e) {
    let $campoHora = e.target;
    if ($campoHora.type === "text") {
      new Inputmask("99:99", {
        "placeholder": "HH:MM"
      }).mask($campoHora);
    }
  }
}
