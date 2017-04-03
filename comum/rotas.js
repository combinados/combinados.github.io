import {
  queryStringParaJson,
  $on,
  qs
} from "comum/util";
export default class Roteador {
  static instance;
  constructor(rotaPadrao) {
    if (this.instance) {
      return this.instance;
    }
    this.rotas = {};
    this.rotaPadrao = rotaPadrao;
    this.instance = this;

    $on(window, "hashchange", e => this.atualizarPagina(e));
    $on(window, "load", e => this.atualizarPagina(e));
  }
  rota = (url, ancora) => {
    this.rotas[url] = ancora;
    return this;
  }
  atualizarPagina = (evento) => {
    let hash = window.location.hash;
    if (evento && /^load|hashchange$/.test(evento.type)) {
      evento.preventDefault();
      hash = hash ? hash : "/";
      this.navegar(hash);
    }
  }
  navegar = (hash) => {
    // Separa a cabeça e queryString do fragmento da url
    const regex = /#([^&?]+)[?]?(.*)$/,
      queryString = hash.replace(regex, "$2");

    let cabeca = hash.replace(regex, "$1");

    if(!this.rotas[cabeca]) {
      cabeca = this.rotaPadrao;
      window.location.href = `#${cabeca}`;
    }

    this.exibirPagina(cabeca);
    if (queryString) {
      this.rotas[cabeca](queryStringParaJson(queryString));
    } else {
      this.rotas[cabeca]();
    }
  }
  exibirPagina = (cabeca) => {
    Object.keys(this.rotas).map(rota => {
      let $pagina = qs(`#${rota}-conteiner`);
      rota === cabeca ? $pagina.classList.remove("ocultar") : $pagina.classList.add("ocultar");
    });
  }
}
