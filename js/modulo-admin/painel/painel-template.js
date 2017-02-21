import painelTemplate from "../../../html/principal.html";
import listaUsuarios from "../../../html/listaUsuarios";
import imagens from "../../../imagens/justice.gif";
import {
  formatarData,
  qs
} from "../../comum";

export default class PainelTemplate {

  constructor() {
  }
  exibirTelaPrincipal(elemento, dados) {
    elemento.innerHTML = listaUsuarios(dados);
  }
}
