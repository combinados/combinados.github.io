import modalExcluirTemplate from "./dialogo-exclusao.html";
import {
  qs,
  $on
} from "comum/comum";

export default class Dialogo {
  constructor(opcoes) {
    this.opcoes = opcoes;
    this.conteinerModal = qs("#modalConfirmacao");
    this.conteinerModal.setAttribute("tabindex", "-1");
    this.conteinerModal.setAttribute("role", "dialog");
    this.conteinerModal.classList.add("modal", "fade");
  }
  fecharModal() {
    $(this.conteinerModal).modal("hide");
  }

  exibirModal() {
    this.exibirModalExcluir(this.conteinerModal, this.opcoes);
    $on(qs("#btnExclusaoProcessoConfirmada"), "click", e => {
      this.fecharModal();
      this.opcoes.callback(this.opcoes.dados);
    });
    $(this.conteinerModal).modal();
  }

  exibirModalExcluir(elemento, dados) {
    elemento.innerHTML = modalExcluirTemplate;
  }
}
// export let dialogo = new Dialogo();
