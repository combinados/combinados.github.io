import {
  qs,
  imagens
} from "comum/util";
import telaPrincipal from "./telas/tela-principal.html";

export default class Visao {

  constructor(conteiner) {
    this.$conteiner = qs(conteiner);
  }

  abrirTelaPrincipal(opcoes = {}) {
    opcoes["contador"] = -1;
    opcoes["escudos"] = imagens;
      this.$conteiner.innerHTML = telaPrincipal(opcoes);
  }
}
