import PainelVisao from "./painel-visao";
import PainelServico from "./painel-servico";
import {
  mensagemUtil
} from "../../../componentes/mensagem/mensagem";

export default class Painel {

  constructor() {
    this.servico = new PainelServico();
    this.visao = new PainelVisao("#principal");
  }
  abrirTelaPrincipal(opcoes = {}) {
    opcoes = Object.assign({
      "andamentos": false,
      "providencias": false,
      "exibir": true,
      "processo": this.processo
    }, opcoes);

    this.visao.abrirTelaPrincipal(opcoes);
  }
}
