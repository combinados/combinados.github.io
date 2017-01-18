import mensagemTemplate from "./mensagem.html";
import {
  qs
} from "../../js/comum";

const botaoEntrar = "<a class=\\\"sd btn icon left warning\\\" onclick=\\\"history.go(0)\\\"><span class=\\\"fa fa-sign-in\\\" aria-hidden=\\\"true\\\"></span><span class=\\\"sr-only\\\">Entrar</span>Aqui</a>";
const statusCode = {
  "_204": "Nenhum registro encontrado",
  "_500": "Inesperado",
  "_0": `Sessão expirada! Clique ${botaoEntrar} para autenticar-se novamente`
}

const mensagens = {
  "sucessos": [],
  "atencoes": [],
  "erros": []
};

class Mensagem {
  constructor(seletor) {
    this.seletorMsgPadrao = seletor;
  }
  mostrar(seletorMsg) {
    let $elementoMsg = qs(seletorMsg || this.seletorMsgPadrao);
    if ($elementoMsg && (mensagens.sucessos.length > 0 || mensagens.erros.length > 0 || mensagens.atencoes.length > 0)) {
      $elementoMsg.classList.remove("hidden");
      $elementoMsg.innerHTML = mensagemTemplate;
    }
  }

  ocultar(seletorMsg) {
    let $elementoMsg = qs(seletorMsg || this.seletorMsgPadrao);
    if ($elementoMsg) {
      $elementoMsg.classList.add("hidden");
    }
  }

  apagar(seletorMsg) {
    let $elementoMsg = qs(seletorMsg || this.seletorMsgPadrao);
    if ($elementoMsg) {
      mensagens.sucessos = [];
      mensagens.atencoes = [];
      mensagens.erros = [];
      $elementoMsg.innerHTML = mensagemTemplate;
    }
  }

  adicionar(msg, substituir = true) {
    try {
      msg.mensagem = JSON.parse(msg.mensagem);
    } catch (e) {
      msg.mensagem = JSON.parse(`{"property": "", "mensagem": "Erro Inesperado, ${msg.mensagem}"}`);
    }
    if (substituir) {
      for (let [key, value] of Object.entries(mensagens)) {
        key !== msg.tipo ? mensagens[key] = [] : mensagens[msg.tipo] = [msg.mensagem];
      }
    } else {
      mensagens[msg.tipo].push(msg.mensagem);
    }
    return this;
  }

  adicionarMensagens(requisicao, substituir = true) {
    if (requisicao.response) {
      try {
        let resposta = JSON.parse(requisicao.response);
        // tratar erros do sgp
        if (resposta.appMessageError) {
          resposta = JSON.parse(`{"property": "${requisicao.responseURL.replace(/^.*\/(.*)$/, "$1")}", "mensagem": "${resposta.appMessageError}"}`);
          mensagens.erros = [resposta];
          return this;
        }

        if (substituir) {
          // gambiarra até padronizar o back-end
          if (Array.isArray(resposta)) {
            mensagens.atencoes = resposta
            mensagens.sucessos = [];
            mensagens.erros = [];
          } else {
            mensagens.sucessos = resposta.mensagens.sucessos ? resposta.mensagens.sucessos : [];
            mensagens.atencoes = resposta.mensagens.atencoes ? resposta.mensagens.atencoes : [];
            mensagens.erros = resposta.mensagens.erros ? resposta.mensagens.erros : [];
          }
        } else {
          Object.assign(mensagens, resposta);
        }
      } catch (e) {
        this.adicionar({
          "mensagem": `{"property": "${requisicao.responseURL.replace(/^.*\/(.*)$/, "$1")}", "mensagem": "${statusCode._500}, ${requisicao.response}"}`,
          "tipo": "erros"
        }, substituir);
      }
    } else {
      let msg = "",
        tipo = "erros",
        contexto = requisicao.responseURL ? requisicao.responseURL.replace(/^.*\/(.*)$/, "$1") : "";
      if (requisicao.status === 204) {
        msg = statusCode._204;
        tipo = "atencoes";
      } else if (requisicao.status === 0) {
        msg = statusCode._0;
      } else if (requisicao.statusText) {
        msg = requisicao.statusText;
      } else {
        msg = `${statusCode._500}. Detalhes: ${requisicao}`;
      }
      msg = `{"property": "${contexto}", "mensagem": "${msg}"}`;
      this.adicionar({
        "mensagem": msg,
        "tipo": tipo
      }, substituir);
    }
    return this;
  }

  enquadrarMensagem() {
    $("html, body").animate({
      scrollTop: 0
    }, "fast");
  }
}
export let mensagemUtil = new Mensagem("#mensagem-generico");
