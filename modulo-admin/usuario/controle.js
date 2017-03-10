import Visao from "./visao";
import Servico from "./servico";
import painelTemplate from "./tela-principal.html";
import {
    mensagemUtil
} from "comum/mensagem/mensagem";

export default class Usuario {

    constructor(conteiner) {
        this.servico = new Servico();
        this.visao = new Visao(conteiner);
        // this.visao.atacharEvento("novoOuAtualizacao", e => this.novoOuAtualizacao(e));
    }
    iniciar(opcoes = {}) {
        this.visao.abrirTelaPrincipal(opcoes);
        this.exibirEmFormaDeCartao();
    }
    exibirEmFormaDeCartao(opcoes = {}) {

        this.servico.buscarTodos()
            .then(resposta => {
                this.visao.emFormaDeCartao(resposta)
            });
    }

    novoOuAtualizacao(credential) {
        // this.servico.criarOuAtualizar(credential)
        //     .then(usuario => {
        //         usuario = usuario || {
        //             foto: imagemPadrao,
        //             nome: "Deslogado"
        //         };
        //         this.visao.exibirLogado(usuario);
        //         return this.servico.buscarTodos();
        //     })
        //     .then(resposta => this.visao.emFormaDeCartao(resposta));
    }
}
