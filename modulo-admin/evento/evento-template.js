import eventoTemplate from "../../../html/processo/evento/evento.html";
import eventoAndamentosTemplate from "../../../html/processo/evento/evento-andamentos.html";
import eventoProvidenciasTemplate from "../../../html/processo/evento/evento-providencias.html";
import eventosAndamentoPotencialTemplate from "../../../html/processo/evento/eventos-andamento-potencial.html";
import eventosProvidenciaPotencialTemplate from "../../../html/processo/evento/eventos-providencia-potencial.html";
import modalTemplate from "../../../html/processo/evento/modal.html";
import {
  formatarData,
  qs
} from "../../comum";

export default class EventoTemplate {

  constructor() {
  }
  exibirTelaPrincipal(elemento, dados) {
    elemento.innerHTML = eventoTemplate;
  }
  exibirEventos(opcoes) {
    if (opcoes.processo) {
      opcoes.processo["dataFormatada"] = () => (data, render) => formatarData(data, render);
    }

    if (opcoes.tipoEvento === "andamentos") {
      qs("#andamentos").innerHTML = eventoAndamentosTemplate;
    }
    if (opcoes.tipoEvento === "providencias") {
      qs("#providencias").innerHTML = eventoProvidenciasTemplate;
    }
  }
  exibirProvidencias(elemento) {
    if (opcoes.processo) {
      opcoes.processo["dataFormatada"] = () => (data, render) => formatarData(data, render);
    }
    if (opcoes.andamento) {
      opcoes.andamento["dataFormatada"] = () => (data, render) => formatarData(data, render);
    }
    elemento.innerHTML = eventoProvidenciasTemplate;
  }

  exibirEventosPotencial(elemento, dados) {
    if (dados.tipoEvento === "andamentos") {
      elemento.innerHTML = eventosAndamentoPotencialTemplate;
    }
    if (dados.tipoEvento === "providencias") {
      elemento.innerHTML = eventosProvidenciaPotencialTemplate;
    }
  }

  prepararModal(elemento, dados) {
    elemento.innerHTML = modalTemplate;
  }
}
