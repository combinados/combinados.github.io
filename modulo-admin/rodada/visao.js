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
import Mensagem from "comum/mensagem/mensagem";
import telaListaJogos from "./telas/lista.html";
import telaPrincipal from "./telas/principal.html";

export default class Visao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    atacharEvento(comando, controle, elemento) {
        const self = this;
        switch (comando) {
            case "salvarPalpites":
                $delegate(this.$conteiner, ".salvar-palpites-js", "click", e => controle(self.pegarRodada(e)));
                break;
            case "proximoFoco":
                // $on("keyup", e => this.proximoFoco(e));
                $delegate(this.$conteiner, "input", "keyup", e => this.proximoFoco(e));
                break;
        }
    }

    proximoFoco = evento => {
        evento.preventDefault();
        let $input = evento.target,
            gols = parseInt($input.value);
        if (/^[\d]+$/.test(gols)) {
            let $inputs = [...document.querySelectorAll("input")],
                $proximoInput;
            $inputs.forEach((input, indice) => {
                if (input === $input) {
                    $proximoInput = $inputs[indice + 1];
                    return false;
                }
            });
            $proximoInput.focus() || null;

            // $inputs.find((input, indice) => {
            //     if (input === $input) return $inputs[indice + 1];
            // }).value;

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
        this.atacharEvento("proximoFoco");
    }

    abrirTelaPrincipal(opcoes) {
        this.$conteiner.innerHTML = telaPrincipal(opcoes);
    }
}
