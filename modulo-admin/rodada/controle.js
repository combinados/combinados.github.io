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
        return this.buscarJogos(this.opcoes.id)
      })
      .catch(error => {
        this.visao.exibirMensagem(error)
      });
  }

  salvarGabarito = gabarito => {
    let atualizacoes = {};
    Object.keys(gabarito).map(jogoId => {
      atualizacoes[`/gabarito/${jogoId}/mandante/gol`] = gabarito[jogoId].mandante.gol;
      atualizacoes[`/gabarito/${jogoId}/visitante/gol`] = gabarito[jogoId].visitante.gol;
    });
    this.servico.salvar(atualizacoes)
      .then(resposta => {
        return this.buscarJogos(this.opcoes.id)
      })
      .catch(error => {
        this.visao.exibirMensagem(error)
      });
  }

  calcularPontos = (jogo) => {
    let gm = parseInt(jogo.mandante.gol),
      gv = parseInt(jogo.visitante.gol);
    Object.keys(jogo.palpites).map(usuarioId => {
      let pm = jogo.palpites[usuarioId].mandante.gol,
        pv = jogo.palpites[usuarioId].visitante.gol;
      if (gm === pm && gv === pv) return 3;
    });
  }
  simularPontos = (palpite, palpiteSimulado) => {
    let pm = palpite.placar_mandante,
      pv = palpite.placar_visitante;
    if (palpiteSimulado.placar_mandante === "" || palpiteSimulado.placar_visitante === "" || palpite.placar_mandante === "" || palpite.placar_visitante === "") {
      return 0;
    } else if (palpiteSimulado.placar_mandante === palpite.placar_mandante && palpiteSimulado.placar_visitante === palpite.placar_visitante) {
      return 3;
    } else if (
      (palpiteSimulado.placar_mandante === palpiteSimulado.placar_visitante && palpite.placar_mandante === palpite.placar_visitante) ||
      (palpiteSimulado.placar_mandante < palpiteSimulado.placar_visitante && palpite.placar_mandante < palpite.placar_visitante) ||
      (palpiteSimulado.placar_mandante > palpiteSimulado.placar_visitante && palpite.placar_mandante > palpite.placar_visitante)) {
      return 1;
    } else {
      return 0;
    }
  }
}
