import usuarioCard from "./usuarioCard.html";
import foto from "componentes/comum/imagens/justice.gif";
import {
  formatarData,
  qs
} from "componentes/comum/comum";

export default class PainelTemplate {

  constructor() {
  }
  exibirTelaPrincipal(elemento, dados) {
    elemento.innerHTML = dados.usuarios.map(usuario => {
      usuario.foto = foto;
      usuario.botoes = ["Direito", "Esquedo"];
      return usuarioCard({usuario})
    }).join("");
  }
}
