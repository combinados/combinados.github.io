import comumCss from "comum/css/comum.css";
import Painel from "./painel/controle";
import Rodada from "./rodada/controle";
import Usuario from "./usuario/controle";
import Roteador from "comum/rotas";

import {initApp} from "comum/seguranca";

const roteador = new Roteador();

class ModuloAdministrativo {
    constructor(opcoes) {
        this.opcoes = opcoes;
    }

    iniciar() {
        initApp();
        const usuario = new Usuario("#usuario-conteiner");
        const painel = new Painel("#classificacao-conteiner");
        const rodada = new Rodada("#rodada-conteiner");
        roteador
            .rota("classificacao", opcoes => painel.iniciar(opcoes))
            .rota("usuario", opcoes => usuario.iniciar(opcoes))
            .rota("rodada", opcoes => rodada.iniciar(opcoes));
    }
}

const moduloAdmin = new ModuloAdministrativo({
    titulo: "Módulo Administrativo",
    "paginaPadrao": "#usuario"
});
moduloAdmin.iniciar();
