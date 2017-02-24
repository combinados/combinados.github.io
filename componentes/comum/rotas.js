import {
    queryStringParaJson
} from "./comum";
export default class Roteador {
    static instance;
    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.rotas = {};
        this.instance = this;
    }
    rota = (url, ancora) => {
        this.rotas[url] = ancora;
        return this;
    }
    atualizarPagina = (evento) => {
        let hash = window.location.hash;
        if (evento && /^load|hashchange$/.test(evento.type)) {
            hash = hash ? hash : "/";
            this.navegar(hash);
        }
    }
    navegar(hash) {
        const cabeca = hash.replace(/#([^&?]+)[?]?(.*)$/, "$1");
        const queryString = hash.replace(/#([^&?]+)[?]?(.*)$/, "$2");
        if (queryString) {
            this.rotas[cabeca](queryStringParaJson(queryString));
        } else {
            this.rotas[cabeca]();
        }
    }
}
