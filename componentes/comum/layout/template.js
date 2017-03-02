import barraLateral from "./parcial/navegacao-barra-lateral.html";
import navegacaoCabecalho from "./parcial/navegacao-cabecalho.html";
import base from "./base.html";
import cabecalho from "./cabecalho.html";
import rodape from "./rodape.html";
import logo from "componentes/comum/imagens/logo-reinaldo-footer.png";
import logoAnimado from "componentes/comum/imagens/comb-animado.gif";

export default (plugin) => {
    const opcoes = {
        titulo: plugin.htmlWebpackPlugin.options.title,
        producao: plugin.htmlWebpackPlugin.options.producao,
        cabecalho,
        barraLateral,
        navegacaoCabecalho,
        rodape,
        logo,
        logoAnimado
    };

    return `${base(opcoes)}`;
}
