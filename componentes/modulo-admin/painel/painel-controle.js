import PainelVisao from "./painel-visao";
import PainelServico from "./painel-servico";
import {
    mensagemUtil
} from "componentes/comum/mensagem/mensagem";

export default class Painel {

    constructor(conteiner) {
        this.servico = new PainelServico();
        this.visao = new PainelVisao(conteiner);
    }
    abrirTelaPrincipal(opcoes = {}) {
        opcoes = Object.assign({
            "andamentos": false,
            "providencias": false,
            "exibir": true
        }, opcoes);
        alert(
            Object.entries(opcoes).map(([key, value]) => {
                return (`${key} : ${value}\n`);
            }).join(""));
        this.servico.buscarUsuarios()
            .then(resposta => {
                const opcoes = resposta;
                this.visao.abrirTelaPrincipal(opcoes);
            });


    }
}
