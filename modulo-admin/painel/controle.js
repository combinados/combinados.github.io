import Visao from "./visao";
import Usuario from "modulo-admin/usuario/controle";

import {
    mensagemUtil
} from "comum/mensagem/mensagem";

export default class Painel {

    constructor(conteiner) {
        this.visao = new Visao(conteiner);
    }
    iniciar(opcoes = {}) {
        this.visao.abrirTelaPrincipal(opcoes);
        const usuario = new Usuario("#usuarios-cartao");
        usuario.exibirEmFormaDeCartao();
    }
}
