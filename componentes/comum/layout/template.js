import barraLateral from "./parcial/navegacao-barra-lateral.html";
import navegacaoCabecalho from "./parcial/navegacao-cabecalho.html";
import base from "./base.html";
import cabecalho from "./cabecalho.html";
import rodape from "./rodape.html";
import logo from "componentes/comum/imagens/logo.png";
import logoAnimado from "componentes/comum/imagens/comb-animado.gif";
import gmail from "componentes/comum/imagens/gmail.png";
import twitter from "componentes/comum/imagens/twitter.png";
import github from "componentes/comum/imagens/github.png";

export default (plugin) => {
    const opcoes = {
        titulo: plugin.htmlWebpackPlugin.options.title,
        producao: plugin.htmlWebpackPlugin.options.producao,
        cabecalho,
        barraLateral,
        navegacaoCabecalho,
        rodape,
        logo,
        logoAnimado,
        gmail,
        twitter,
        github
    };

    return `${base(opcoes)}`;
}
