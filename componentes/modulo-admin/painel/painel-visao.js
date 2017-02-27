import {
    qs
} from "componentes/comum/comum";
import painelTemplate from "./painel-template.html";

export default class PainelVisao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    abrirTelaPrincipal(opcoes = {}) {
        this.$conteiner.innerHTML = painelTemplate();
    }
}
