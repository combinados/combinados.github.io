import Visao from "./visao";
import Servico from "./servico";
import {
    mensagemUtil
} from "componentes/comum/mensagem/mensagem";

export default class Rodada {

    constructor(conteiner) {
        this.servico = new Servico();
        this.visao = new Visao(conteiner);
        this.opcoes = {
            "fotoUsuario": false,
            "exibir": true
        };
        this.visao.atacharEvento("novoOuAtualizacao", e => this.novoOuAtualizacao(e));
    }
    abrirTelaPrincipal(opcoes = {}) {
        this.opcoes = Object.assign(this.opcoes, opcoes);
        opcoes.id ? this.buscarJogos(opcoes.id) : this.visao.abrirTelaPrincipal(opcoes);

        // this.visao.atacharEvento("abrirJogos", e => this.buscarJogos(e));
    }

    buscarJogos(rodadaId) {
        this.opcoes.rodadaId = rodadaId;
        this.servico.buscarJogos(this.opcoes)
            .then(jogos => this.visao.emFormaDeLista(jogos));
    }
}
