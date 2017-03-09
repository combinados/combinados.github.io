import comumCss from "comum/css/comum.css";
import Painel from "./painel/controle";
import Rodada from "./rodada/controle";
import Usuario from "./usuario/controle";
import Roteador from "comum/rotas";

const roteador = new Roteador();

class ModuloAdministrativo {
    constructor(modulo) {
        this.titulo = "Módulo Administrativo";
        this.seletor = "a[href^='processo']";
        this.paginaPadrao = "#usuarios";
    }

    iniciar() {
        const usuario = new Usuario("#usuario-conteiner");
        const painel = new Painel("#classificacao-conteiner");
        const rodada = new Rodada("#rodada-conteiner");
        roteador
            .rota("classificacao", opcoes => painel.iniciar(opcoes))
            .rota("usuario", opcoes => usuario.iniciar(opcoes))
            .rota("rodada", opcoes => rodada.iniciar(opcoes));
    }
}

const moduloAdmin = new ModuloAdministrativo("admin");
moduloAdmin.iniciar();
