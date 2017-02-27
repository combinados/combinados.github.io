import UsuarioVisao from "./usuario-visao";
import UsuarioServico from "./usuario-servico";
import {
    mensagemUtil
} from "componentes/comum/mensagem/mensagem";

export default class Usuario {

    constructor(conteiner) {
        this.servico = new UsuarioServico();
        this.visao = new UsuarioVisao(conteiner);
    }
    exibirEmFormaDeCartao(opcoes = {}) {
        opcoes = Object.assign({
            "classificacao": false,
            "exibir": true
        }, opcoes);

        this.servico.buscarTodos()
            .then(resposta => this.visao.emFormaDeCartao(resposta));
    }
}
