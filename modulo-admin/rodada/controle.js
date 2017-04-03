import Visao from "./visao";
import Servico from "./servico";
import usuarioServico from "modulo-admin/usuario/servico";
import {
  mensagemUtil
} from "comum/mensagem/mensagem";
import {
  qs,
  dispararEvento
} from "comum/util";

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

  buscarJogos = (rodadaId, tipoTabela = {
    ehPalpite: true
  }) => {
    return new Promise((resolve, reject) => {
      this.servico.buscarJogosDoGabaritoPela(rodadaId)
        .then(jogosDeUmaRodadaSnap => {
          this.opcoes.jogosDeUmaRodada = jogosDeUmaRodadaSnap.val();
          this.visao.emFormaDeLista(this.opcoes, tipoTabela);
          this.visao.atacharEvento("salvarPalpitesOuGabaritoOuSimulador", e => this.salvarPalpitesOuGabaritoOuSimulador(e));
          resolve();
        });
    });
  }
  salvarPalpitesOuGabaritoOuSimulador = (palpites) => {
    if (palpites.tipoTabela.ehSimulador) {
      this.salvarSimulador(palpites);
    } else if (palpites.tipoTabela.ehGabarito) {
      this.salvarGabarito(palpites);
    } else {
      this.salvarPalpites(palpites);
    }
  }
  salvarPalpites = palpites => {
    let atualizacoes = {},
      tipoTabela = Object.assign({}, palpites.tipoTabela);
    delete palpites["tipoTabela"];

    Object.keys(palpites).map(jogoId => {
      atualizacoes[`/gabarito/${jogoId}/palpites/${this.opcoes.usuario}`] = palpites[jogoId];
    });
    this.servico.salvar(atualizacoes)
      .then(resposta => {
        this.buscarJogos(this.opcoes.id, tipoTabela);
        this.visao.exibirMensagem("Atualização Realizada com sucesso");
      })
      .catch(error => {
        let mensagem = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
        this.visao.exibirMensagem(mensagem)
      });
  }

  salvarSimulador = palpites => {
    let atualizacoes = {},
      simulacao = {},
      tipoTabela = Object.assign({}, palpites.tipoTabela);
    delete palpites["tipoTabela"];
    Object.keys(palpites).map(jogoId => {
      atualizacoes[`/gabarito/${jogoId}/mandante/simulacao`] = palpites[jogoId].mandante.gol;
      atualizacoes[`/gabarito/${jogoId}/visitante/simulacao`] = palpites[jogoId].visitante.gol;

      Object.keys(this.opcoes.jogosDeUmaRodada[jogoId].palpites).map(usuarioId => {
        let palpite = this.opcoes.jogosDeUmaRodada[jogoId].palpites[usuarioId],
          simulador = palpites[jogoId],
          ponto = this.calcularPontos(simulador, palpite);

        if (!simulacao[usuarioId]) {
          simulacao[usuarioId] = {};
        }

        simulacao[usuarioId].pontos = simulacao[usuarioId].pontos ? simulacao[usuarioId].pontos + ponto : ponto;
      });
    });

    Object.keys(simulacao).map(usuarioId => {
      atualizacoes[`/usuarios/${usuarioId}/simulacao`] = simulacao[usuarioId].pontos;
    });

    this.servico.salvar(atualizacoes)
      .then(resposta => this.buscarJogos(this.opcoes.id, tipoTabela))
      .then(nada => {
        const evento = {
          nome: "usuario.novoOuAtualizacao",
          corpo: {
            simulacao: true,
            $conteiner: qs("#simulacao-usuarios-conteiner")
          }
        };
        dispararEvento(evento);
        this.visao.exibirMensagem("Atualização Realizada com sucesso");
      })
      .catch(error => {
        let mensagem = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
        this.visao.exibirMensagem(mensagem)
      });
  }

  salvarGabarito = palpites => {
    let atualizacoes = {},
      classificacao = {},
      tipoTabela = Object.assign({}, palpites.tipoTabela);
    delete palpites["tipoTabela"];
    Object.keys(palpites).map(jogoId => {
      atualizacoes[`/gabarito/${jogoId}/mandante/gol`] = palpites[jogoId].mandante.gol;
      atualizacoes[`/gabarito/${jogoId}/visitante/gol`] = palpites[jogoId].visitante.gol;

      Object.keys(this.opcoes.jogosDeUmaRodada[jogoId].palpites).map(usuarioId => {
        let palpite = this.opcoes.jogosDeUmaRodada[jogoId].palpites[usuarioId],
          gabarito = palpites[jogoId],
          ponto = this.calcularPontos(gabarito, palpite);

        if (!classificacao[usuarioId]) {
          classificacao[usuarioId] = {};
        }

        classificacao[usuarioId].pontos = classificacao[usuarioId].pontos ? classificacao[usuarioId].pontos + ponto : ponto;

        atualizacoes[`/gabarito/${jogoId}/palpites/${usuarioId}/pontos`] = ponto;
      });
    });

    Object.keys(classificacao).map(usuarioId => {
      atualizacoes[`/usuarios/${usuarioId}/classificacao`] = classificacao[usuarioId].pontos;
    });

    this.servico.salvar(atualizacoes)
      .then(resposta => {
        this.buscarJogos(this.opcoes.id, tipoTabela)
        this.visao.exibirMensagem("Atualização Realizada com sucesso");
      })
      .catch(error => {
        let mensagem = error.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
        this.visao.exibirMensagem(mensagem)
      });
  }

  calcularPontos = (gabarito, palpite) => {
    let gm = gabarito.mandante.gol,
      gv = gabarito.visitante.gol,
      pm = palpite.mandante.gol,
      pv = palpite.visitante.gol,
      gEmpate = gm === gv,
      pEmpate = pm === pv,
      tresPontos = gm === pm && gv === pv,
      umPonto = (gm > gv && pm > pv) || (gm < gv && pm < pv) || (gEmpate && pEmpate);

    if (tresPontos) return 3;
    if (umPonto) return 1;
    return 0;
  }
}
