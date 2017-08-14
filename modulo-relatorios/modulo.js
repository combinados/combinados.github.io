import comumCss from "comum/css/comum.css";
import {qs} from "comum/util";
import PrimeiroTurno from "./primeiro-turno/controle";
import Roteador from "comum/rotas";

import {autenticacao} from "comum/seguranca";

class ModuloRelatorio {
    constructor(opcoes) {
        this.opcoes = opcoes;
        this.roteador = new Roteador(opcoes.paginaPadrao);
    }

    iniciar() {
        autenticacao();
        const primeiroTurno = new PrimeiroTurno("#primeiro-turno-conteiner");
        this.roteador
            .rota("primeiro-turno", opcoes => primeiroTurno.iniciar(opcoes));
    }
}

const moduloRelatorio = new ModuloRelatorio({
    titulo: "Módulo Relatorio",
    "paginaPadrao": "primeiroTurno"
});
moduloRelatorio.iniciar();
