import comumCss from "componentes/comum/css/comum.css";
import Painel from "./painel/painel-controle";
import {
    qs,
    $on,
    queryStringParaJson
} from "componentes/comum/comum";
import Roteador from "componentes/comum/rotas";

const roteador = new Roteador();

class ModuloAdministrativo {
    constructor(modulo) {
        this.titulo = "Módulo Administrativo";
        this.seletor = "a[href^='processo']";
        this.paginaPadrao = "#usuarios";
    }

    inicio() {
        const painel = new Painel("#principal");
        roteador
            .rota("usuarios", opcoes => painel.abrirTelaPrincipal(opcoes))
            .rota("outra_rota", opcoes => alert("outra rota"));
    }
}

const moduloAdmin = new ModuloAdministrativo("admin");
moduloAdmin.inicio();

$on(window, "hashchange", e => roteador.atualizarPagina(e));
$on(window, "load", e => roteador.atualizarPagina(e));
// $on(document, "DOMContentLoaded", e => paginaPronta(e, moduloAdmin.paginaPadrao));
