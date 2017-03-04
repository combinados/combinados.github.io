import UsuarioVisao from "./usuario-visao";
import UsuarioServico from "./usuario-servico";
import {
    mensagemUtil
} from "componentes/comum/mensagem/mensagem";

export default class Usuario {

    constructor(conteiner) {
        this.servico = new UsuarioServico();
        this.visao = new UsuarioVisao(conteiner);
        this.visao.atacharEvento("novoOuAtualizacao", e => this.novoOuAtualizacao(e));
    }
    exibirEmFormaDeCartao(opcoes = {}) {
        opcoes = Object.assign({
            "classificacao": false,
            "exibir": true
        }, opcoes);

        this.servico.buscarTodos()
            .then(resposta => {
                this.visao.emFormaDeCartao(resposta)
                this.visao.atacharEvento("alternarRodadas", e => this.alternarRodadas(e))
            });
    }

    alternarRodadas($rodada) {
        if (this.visao.criarRodadas($rodada)) {
            this.visao.atacharEvento("abrirJogos", e => this.buscarJogos(e), $rodada);
        }
    }

    buscarJogos(rodada) {
        console.log(JSON.stringify(rodada));
        this.servico.buscarJogos(rodada.rodadaId)
            .then(resposta => this.visao.emFormaDeLista(resposta));
    }

    novoOuAtualizacao(credential) {
        this.servico.criarOuAtualizar(credential)
            .then(usuario => this.servico.buscarTodos())
            .then(resposta => this.visao.emFormaDeCartao(resposta));
    }
}
