import {
  qs,
  imagens
} from "comum/util";
import telaPrincipal from "./telas/tela-principal.html";
import {
  MDCSnackbar
} from "@material/snackbar";

export default class Visao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
  }

  abrirTelaPrincipal(opcoes = {}) {
    opcoes["contador"] = -1;
    opcoes["escudos"] = imagens;
    this.$conteiner.innerHTML = telaPrincipal(opcoes);
  }

  exibirMensagem = (msg) => {
    const snackbar = new MDCSnackbar(qs(".mdc-snackbar"));

    let data = {
      message: msg
    };
    snackbar.show(data);
  }
}
