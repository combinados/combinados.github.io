import barraLateral from "./parcial/navegacao-barra-lateral.html";
import navegacaoCabecalho from "./parcial/navegacao-cabecalho.html";
import base from "./base.html";
import cabecalho from "./cabecalho.html";
import principal from "./principal.html";
import rodape from "./rodape.html";
import logo from "../imagens/logo-reinaldo-footer.png";
import logoAnimado from "../imagens/comb-animado.gif";


export default (plugin) => {
    const opcoes = {
        titulo: plugin.htmlWebpackPlugin.options.title,
        cabecalho,
        barraLateral,
        navegacaoCabecalho,
        principal,
        rodape,
        logo,
        logoAnimado,
        producao: true
    };

    return `${base(opcoes)}`;
}
