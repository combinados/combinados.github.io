import {
  qs,
  $on,
  $parent,
  $delegate
} from "componentes/comum/comum";
import Mensagem from "componentes/comum/mensagem/mensagem";
import PainelTemplate from "./painel-template";

export default class PainelVisao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
    this.$parcial = qs("#principal");
    this.template = new PainelTemplate();
  }

  abrirTelaPrincipal(opcoes = {}) {
    this.template.exibirTelaPrincipal(this.$conteiner, opcoes);
  }
}
