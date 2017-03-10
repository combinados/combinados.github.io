import {
    queryStringParaJson,
    $on
} from "comum/comum";
export default class Roteador {
    static instance;
    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.rotas = {};
        this.instance = this;

        $on(window, "hashchange", e => this.atualizarPagina(e));
        $on(window, "load", e => this.atualizarPagina(e));
        // $on(document, "DOMContentLoaded", e => paginaPronta(e, moduloAdmin.paginaPadrao));
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
            cabeca = hash.replace(regex, "$1"),
            queryString = hash.replace(regex, "$2");

        this.exibirPagina(cabeca);
        if (queryString) {
            this.rotas[cabeca](queryStringParaJson(queryString));
        } else {
            this.rotas[cabeca]();
        }
    }
    exibirPagina = (cabeca) => {
        Object.keys(this.rotas).map(rota => {
            let $pagina = document.querySelector(`#${rota}-conteiner`);
            rota === cabeca ? $pagina.classList.remove("ocultar") : $pagina.classList.add("ocultar");
        });
    }
}
