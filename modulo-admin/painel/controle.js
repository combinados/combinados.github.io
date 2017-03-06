import Visao from "./visao";
import Usuario from "modulo-admin/usuarios/controle";

import {
    mensagemUtil
} from "comum/mensagem/mensagem";

export default class Painel {

    constructor(conteiner) {
        this.visao = new Visao(conteiner);
    }
    abrirTelaPrincipal(opcoes = {}) {
        this.visao.abrirTelaPrincipal(opcoes);
        const usuario = new Usuario("#usuarios-cartao");
        usuario.exibirEmFormaDeCartao();
    }
}
