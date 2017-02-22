import material from "componentes/comum/css/externo/material.scss";

import comumCss from "componentes/comum/css/comum.css";
// import processoCss from "../../css/processo.css";
// import Cabecalho from "../../componentes/cabecalho/cabecalho";
import Painel from "./painel/painel-controle";
// import RepositorioLocal from "../armazenamento";
import {
  qs,
  $on,
  queryStringParaJson
} from "componentes/comum/comum";
import {
  atualizarPagina,
  paginaPronta
} from "componentes/comum/rotas";

class ModuloAdministrativo {
  constructor(modulo) {
    this.titulo = "Módulo Administrativo";
    this.seletor = "a[href^='processo']";
    this.paginaPadrao = "#usuarios";
  }

  inicio() {
    // this.cabecalho.desenhar(".navbar-brand", this.titulo);
  }

  atacharEvento(hash) {
    switch (true) {
      case /^#usuarios(.*)$/.test(hash):
        hash = hash.replace(/^#listarUsuarios([\?]?(.*))$/, "$2");
        new Painel("#principal").abrirTelaPrincipal();
        break;
      case /^#judicial(.*)$/.test(hash):
        hash = hash.replace(/^#judicial([\?]?(.*))$/, "$2");
        if (hash) {
          let opcoes = queryStringParaJson(hash);
          opcoes["tipoProcesso"] = "judicial";
          if (opcoes.editar) {
            opcoes["processoId"] = opcoes.editar;
            // this.processoJudicial.abirTelaEditar(opcoes);
          } else {
            // this.processoJudicial.abrirTelaDetalhe(opcoes);
          }
        } else {
          // this.processoJudicial.abrirTelaJudicial();
        }
        break;
      default:
        // TODO: Criar página 404 interna
        console.log("Página 404 interna");
        break;
    }
  }
}

const moduloAdmin = new ModuloAdministrativo("admin");
moduloAdmin.inicio();

$on(window, "hashchange", e => atualizarPagina(e, moduloAdmin));
$on(window, "load", e => atualizarPagina(e, moduloAdmin));
$on(document, "DOMContentLoaded", e => paginaPronta(e, moduloAdmin.paginaPadrao));
