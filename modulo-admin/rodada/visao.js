import {
    qs,
    qsa,
    $on,
    $parent,
    $delegate
} from "comum/comum";
import {
    MDCTextfield,
    MDCTextfieldFoundation
} from "@material/textfield";
import {
    MDCSnackbar
} from "@material/snackbar";
import Mensagem from "comum/mensagem/mensagem";
import telaListaJogos from "./telas/lista.html";
import telaPrincipal from "./telas/principal.html";

export default class Visao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
        this.atacharEvento("proximoFoco");
    }

    atacharEvento(comando, controle) {
        switch (comando) {
            case "salvarPalpites":
                $on(qs("#palpites"), "submit", e => controle(this.fomularioParaJson(e)));
                break;
            case "proximoFoco":
                // $on("keyup", e => this.proximoFoco(e));
                $delegate(this.$conteiner, "input", "keyup", e => this.proximoFoco(e));
                break;
        }
    }
    exibirMensagem = (msg) => {
        const snackbar = new MDCSnackbar(qs(".mdc-snackbar"));

        let data = {
            message: msg.code === "PERMISSION_DENIED" ? "Permissão Negada" : msg.code
        };
        snackbar.show(data);
    }

    mapearElementoParaJson(elemento) {
        let json = "";
        switch (elemento.name) {
            case "mandante-gol":
            case "visitante-gol":
                json = `{"${elemento.name}" : "${elemento.value}"}`;
                break;
        }
        return json;
    }

    validarElemento(elemento) {
        if (!/^fieldset|button|submit$/.test(elemento.type) && !elemento.disabled) {
            let jsonString = this.mapearElementoParaJson(elemento);
            if (jsonString) {
                return JSON.parse(jsonString);
            }
        }
    }

    fomularioParaJson = evento => {
        evento.preventDefault();
        let $formulario = evento.target,
            formularioJson = {};

        [...$formulario.elements].map(elemento => {
            let jogoId = $parent(elemento, "DIV").id;
            if (jogoId) {
                formularioJson[jogoId] ?
                    Object.assign(formularioJson[jogoId], this.validarElemento(elemento)) :
                    formularioJson[jogoId] = this.validarElemento(elemento);
            }
        });

        if ($formulario.checkValidity()) {
            return formularioJson;
        }
    }

    proximoFoco = evento => {
        evento.preventDefault();
        let $input = evento.target,
            gols = parseInt($input.value);
        if (/^[\d]+$/.test(gols)) {
            let $inputs = [...document.querySelectorAll("input")],
                indice;

            $inputs.find((input, i) => {
                if (input === $input) {
                    indice = i + 1;
                    return $inputs[indice + 1];
                }
            });
            if ($inputs[indice]) $inputs[indice].focus();
        }
    }

    pegarRodada(evento) {
        evento.preventDefault();
        let rodadaId = evento.target.textContent;
        return rodadaId;
    }

    emFormaDeLista(palpites) {
        this.$conteiner.innerHTML = telaListaJogos(palpites);
        [...qsa(".mdc-textfield")].map(textfield => new MDCTextfield(textfield));
        // [...qsa("input")].map(input => $on(input, "keyup", e => this.proximoFoco(e)));
    }

    abrirTelaPrincipal(opcoes) {
        this.$conteiner.innerHTML = telaPrincipal(opcoes);
    }
}
