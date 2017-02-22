import usuarioCard from "./usuarioCard.html";
import foto from "comum/imagens/justice.gif";
import {
  formatarData,
  qs
} from "comum/comum";

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
