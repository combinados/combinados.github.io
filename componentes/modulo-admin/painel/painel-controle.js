import PainelVisao from "./painel-visao";
import Usuario from "componentes/modulo-admin/usuarios/usuario-controle";

import {
    mensagemUtil
} from "componentes/comum/mensagem/mensagem";

export default class Painel {

    constructor(conteiner) {
        this.visao = new PainelVisao(conteiner);
    }
    abrirTelaPrincipal(opcoes = {}) {
        this.visao.abrirTelaPrincipal(opcoes);
        const usuario = new Usuario("#usuarios-cartao");
        usuario.exibirEmFormaDeCartao();
    }
}
