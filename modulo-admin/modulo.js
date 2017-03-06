import comumCss from "comum/css/comum.css";
import Painel from "./painel/controle";
import Rodada from "./rodada/controle";

import {
    qs,
    $on,
    queryStringParaJson
} from "comum/comum";
import Roteador from "comum/rotas";

const roteador = new Roteador();

class ModuloAdministrativo {
    constructor(modulo) {
        this.titulo = "Módulo Administrativo";
        this.seletor = "a[href^='processo']";
        this.paginaPadrao = "#usuarios";
    }

    iniciar() {
        const painel = new Painel("#classificacao-conteiner");
        const rodada = new Rodada("#rodada-conteiner");
        roteador
            .rota("classificacao", opcoes => painel.abrirTelaPrincipal(opcoes))
            // .rota("rodada", opcoes => alert("outra rota"));
            .rota("rodada", opcoes => rodada.abrirTelaPrincipal(opcoes));
    }
}

const moduloAdmin = new ModuloAdministrativo("admin");
moduloAdmin.iniciar();

$on(window, "hashchange", e => roteador.atualizarPagina(e));
$on(window, "load", e => roteador.atualizarPagina(e));
// $on(document, "DOMContentLoaded", e => paginaPronta(e, moduloAdmin.paginaPadrao));
