import painelTemplate from "html/principal.html";
import usuarioCard from "html/usuarioCard.html";
import foto from "imagens/justice.gif";
import {
  formatarData,
  qs
} from "../../comum";

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
