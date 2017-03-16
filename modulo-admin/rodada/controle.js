import Visao from "./visao";
import Servico from "./servico";
import {
  mensagemUtil
} from "comum/mensagem/mensagem";

export default class Rodada {

  constructor(conteiner) {
    this.servico = new Servico();
    this.visao = new Visao(conteiner);
    this.opcoes = {};
  }
  iniciar(opcoes = {}) {
    this.opcoes = opcoes;
    this.opcoes.id ? this.buscarJogos(this.opcoes.id) : this.visao.abrirTelaPrincipal(this.opcoes);
  }

  buscarJogos(rodadaId) {
    this.servico.buscarJogosDoGabaritoPela(rodadaId)
      .then(jogosGabaritoDeUmaRodadaSnap => {
        this.opcoes.jogosGabaritoDeUmaRodada = Object.assign({}, jogosGabaritoDeUmaRodadaSnap.val());
        this.visao.emFormaDeLista(this.opcoes);
        this.visao.atacharEvento("salvarPalpites", e => this.salvarPalpites(e));
        this.visao.atacharEvento("salvarGabarito", e => this.salvarGabarito(e));
      });
  }

  salvarPalpites = palpites => {
    let atualizacoes = {};

    Object.keys(palpites).map(jogoId => {
      atualizacoes[`/gabarito/${jogoId}/palpites/${this.opcoes.usuario}`] = palpites[jogoId];
    });
    this.servico.salvar(atualizacoes)
      .then(resposta => {
        this.buscarJogos(this.opcoes.id);
        this.visao.exibirMensagem("Atualização Realizada com sucesso");
      })
      .catch(error => {
        message = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
        this.visao.exibirMensagem(error)
      });
  }

  salvarGabarito = gabaritos => {
    let atualizacoes = {};
    Object.keys(gabaritos).map(jogoId => {
      atualizacoes[`/gabarito/${jogoId}/mandante/gol`] = gabaritos[jogoId].mandante.gol;
      atualizacoes[`/gabarito/${jogoId}/visitante/gol`] = gabaritos[jogoId].visitante.gol;

      Object.keys(this.opcoes.jogosGabaritoDeUmaRodada[jogoId].palpites).map(usuarioId => {
        let palpite = this.opcoes.jogosGabaritoDeUmaRodada[jogoId].palpites[usuarioId],
          gabarito = gabaritos[jogoId];
          // pontos = palpite.pontos ? palpite.pontos : 0;
        atualizacoes[`/gabarito/${jogoId}/palpites/${usuarioId}/pontos`] = this.calcularPontos(gabarito, palpite);
        atualizacoes[`/usuarios/${usuarioId}/classificacao`] = this.calcularPontos(gabarito, palpite);
      });
    });
    this.servico.salvar(atualizacoes)
      .then(resposta => {
        this.buscarJogos(this.opcoes.id)
        this.visao.exibirMensagem("Atualização Realizada com sucesso");
      })
      .catch(error => {
        message = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
        this.visao.exibirMensagem(error)
      });
  }

  calcularPontos = (gabarito, palpite) => {
    let gm = gabarito.mandante.gol,
      gv = gabarito.mandante.gol,
      pm = palpite.mandante.gol,
      pv = palpite.mandante.gol,
      gEmpate = gm === gv,
      pEmpate = pm === pv,
      tresPontos = gm === pm && gv === pv,
      umPonto = (gm > gv && pm > pv) || (gm < gv && pm < pv) || (gEmpate && pEmpate);

    if (tresPontos) return 3;
    if (umPonto) return 1;
    return 0;
  }
}
