import painelTemplate from "../../../html/principal.html";
import {
  formatarData,
  qs
} from "../../comum";

export default class PainelTemplate {

  constructor() {
  }
  exibirTelaPrincipal(elemento, dados) {
    elemento.innerHTML = painelTemplate;
  }
}
