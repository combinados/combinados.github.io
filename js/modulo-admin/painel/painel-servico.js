import Servico from "../../servico"
export default class EventoServico extends Servico {
    constructor() {
        super();
    }
    buscarUsuarios() {
        return new Promise((resolve, reject) => {
            resolve({
                usuarios: [{
                    nome: "Reinaldo Vale",
                    classificacao: "1º",
                    foto: "../../../imagens/logo.png"
                }, {
                    nome: "Patriolino",
                    classificacao: "2º",
                    foto: "../../../imagens/justice.gif"
                }]
            });
        });
    }
    buscarEventos(processoId, tipoEvento) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("GET", `${this.baseUrl}/processos/${processoId}/${tipoEvento}`);
            req.onload = function() {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(req);
                }
            };
            req.onerror = function() {
                reject("Problemas na Rede, durante buscarEventos");
            };
            req.send();
        });
    }

    buscarProvidencias(processoId, andamentoId) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            // req.open("GET", `${this.baseUrl}/processos/${processoId}/andamentos/${andamentoId}/providencias`);
            req.open("GET", `${this.baseUrl}/processos/${processoId}/andamentos/${andamentoId}/providencias`);
            req.onload = function() {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(req);
                }
            };
            req.onerror = function() {
                reject("Problemas na Rede, durante buscarProvidencias");
            };
            req.send();
        });
    }

    buscarEventosPor(opcoes) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("GET", `${this.baseUrl}/eventos${opcoes.tipoEvento === "andamentos" ? "" : "/providencias"}?${opcoes.filtro}`);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.onload = function() {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(req);
                }
            };
            req.onerror = function() {
                reject("Problemas na Rede, durante buscarEventosPor");
            };
            req.send();
        });
    }

    associarEvento(dados) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("POST", `${this.baseUrl}/processos/${dados.processoId}/${dados.andamentoId ? `andamentos/${dados.andamentoId}/providencias` : dados.tipoEvento}`);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.onload = function() {
                if (/200|201/.test(req.status)) {
                    resolve(JSON.parse(req.response));
                    // resolve(req);
                } else {
                    reject(req);
                }
            };
            req.onerror = function() {
                reject("Problemas na Rede, durante associarEvento");
            };
            req.send(JSON.stringify(dados.eventoPotencial));
        });
    }

    excluirEvento(dados) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest(),
                url = `${this.baseUrl}/processos/${dados.processoId}`;
            if (dados.andamentoId) {
                url = `${url}/andamentos/${dados.andamentoId}/providencias/${dados.eventoId}`;
            } else {
                url = `${url}/${dados.tipoEvento}/${dados.eventoId}`;
            }
            req.open("DELETE", url);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.onload = function() {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                    // resolve(req);
                } else {
                    reject(req);
                }
            };
            req.onerror = function() {
                reject("Problemas na Rede, durante excluirEvento");
            };
            req.send();
        });
    }
}
