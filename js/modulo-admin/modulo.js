import material from "../../css/externo/material.scss";
import bulma from "../../css/externo/bulma.scss";

import comumCss from "../../css/comum.css";
import processoCss from "../../css/processo.css";
import Cabecalho from "../../componentes/cabecalho/cabecalho";
import Evento from "./evento/evento-controle";
import RepositorioLocal from "../armazenamento";
import {
  qs,
  $on,
  queryStringParaJson
} from "../comum";
import {
  atualizarPagina,
  paginaPronta
} from "../barra-lateral";

class ModuloAdministrativo {
  constructor(modulo) {
    this.titulo = "Módulo Administrativo";
    this.seletor = "a[href^='processo']";
    this.repositorio = new RepositorioLocal(modulo);
    this.paginaPadrao = "#pesquisar";
    this.cabecalho = new Cabecalho();
    // this.evento = new Evento(this.repositorio);
  }

  inicio() {
    this.cabecalho.desenhar(".navbar-brand", this.titulo);
  }

  atacharEvento(hash) {
    switch (true) {
      case /^#pesquisar(.*)$/.test(hash):
        hash = hash.replace(/^#pesquisar([\?]?(.*))$/, "$2");
        new Evento({}).abrirTelaPrincipal({
          "andamentos": true,
          "providencias": true
        });
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
