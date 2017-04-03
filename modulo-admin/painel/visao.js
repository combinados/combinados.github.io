import {
    qs
} from "comum/util";
import painelTemplate from "./tela-principal.html";

export default class PainelVisao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    abrirTelaPrincipal(opcoes = {}) {
        this.$conteiner.innerHTML = painelTemplate();
    }
}
