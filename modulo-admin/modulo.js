import comumCss from "comum/css/comum.css";
import Painel from "./painel/controle";
import Rodada from "./rodada/controle";
import Usuario from "./usuarios/controle";
import Roteador from "comum/rotas";

const roteador = new Roteador();

class ModuloAdministrativo {
    constructor(modulo) {
        this.titulo = "Módulo Administrativo";
        this.seletor = "a[href^='processo']";
        this.paginaPadrao = "#usuarios";
    }

    iniciar() {
        const usuario = new Usuario("#principal");

        const painel = new Painel("#classificacao-conteiner");
        const rodada = new Rodada("#rodada-conteiner");
        roteador
            .rota("classificacao", opcoes => painel.iniciar(opcoes))
            .rota("rodada", opcoes => rodada.iniciar(opcoes));
    }
}

const moduloAdmin = new ModuloAdministrativo("admin");
moduloAdmin.iniciar();
