import comumCss from "comum/css/comum.css";
import telaRegras from "modulo-admin/regras.html";
import {qs} from "comum/util";
import Rodada from "./rodada/controle";
import Usuario from "./usuario/controle";
import Roteador from "comum/rotas";

import {autenticacao} from "comum/seguranca";

class ModuloAdministrativo {
    constructor(opcoes) {
        this.opcoes = opcoes;
        this.roteador = new Roteador(opcoes.paginaPadrao);
    }

    iniciar() {
        autenticacao();
        const usuario = new Usuario("#usuario-conteiner");
        // const painel = new Painel("#classificacao-conteiner");
        const rodada = new Rodada("#rodada-conteiner");
        this.roteador
            .rota("usuario", opcoes => usuario.iniciar(opcoes))
            .rota("rodada", opcoes => rodada.iniciar(opcoes))
            .rota("regras", opcoes => qs("#regras-conteiner").innerHTML = telaRegras({}));
    }
}

const moduloAdmin = new ModuloAdministrativo({
    titulo: "Módulo Administrativo",
    "paginaPadrao": "usuario"
});
moduloAdmin.iniciar();
