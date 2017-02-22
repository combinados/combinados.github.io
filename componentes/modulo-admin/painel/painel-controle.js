import PainelVisao from "./painel-visao";
import PainelServico from "./painel-servico";
import {
  mensagemUtil
} from "componentes/mensagem/mensagem";

export default class Painel {

  constructor(conteiner) {
    this.servico = new PainelServico();
    this.visao = new PainelVisao(conteiner);
  }
  abrirTelaPrincipal(opcoes = {}) {
    opcoes = Object.assign({
      "andamentos": false,
      "providencias": false,
      "exibir": true,
      "processo": this.processo
    }, opcoes);

    this.servico.buscarUsuarios()
    .then(resposta => {
      const opcoes = resposta;
      this.visao.abrirTelaPrincipal(opcoes);
    });


  }
}
