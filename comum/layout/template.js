import barraLateral from "./parcial/navegacao-barra-lateral.html";
import navegacaoCabecalho from "./parcial/navegacao-cabecalho.html";
import paginas from "./parcial/paginas.html";
import base from "./base.html";
import cabecalho from "./cabecalho.html";
import rodape from "./rodape.html";
import logo from "comum/imagens/logo.png";
import logoAnimado from "comum/imagens/comb-animado.gif";
import gmail from "comum/imagens/gmail.png";
import twitter from "comum/imagens/twitter.png";
import github from "comum/imagens/github.png";

export default (plugin) => {
    const opcoes = {
        titulo: plugin.htmlWebpackPlugin.options.title,
        producao: plugin.htmlWebpackPlugin.options.producao,
        cabecalho,
        barraLateral,
        navegacaoCabecalho,
        paginas,
        rodape,
        logo,
        logoAnimado,
        gmail,
        twitter,
        github
    };

    return `${base(opcoes)}`;
}
