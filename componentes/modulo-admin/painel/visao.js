import {
    qs
} from "componentes/comum/comum";
import painelTemplate from "./tela-principal.html";

export default class PainelVisao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    abrirTelaPrincipal(opcoes = {}) {
        this.$conteiner.innerHTML = painelTemplate();
    }
}
