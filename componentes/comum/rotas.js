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
        this.exibirPagina(cabeca);
        const queryString = hash.replace(/#([^&?]+)[?]?(.*)$/, "$2");
        if (queryString) {
            this.rotas[cabeca](queryStringParaJson(queryString));
        } else {
            this.rotas[cabeca]();
        }
    }
    exibirPagina(cabeca) {
        Object.keys(this.rotas).map(rota => {
            let $pagina = document.querySelector(`#${rota}-conteiner`);
            rota === cabeca ? $pagina.classList.remove("ocultar") : $pagina.classList.add("ocultar");
        });
    }
}
