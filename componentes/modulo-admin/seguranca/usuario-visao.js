import {
    qs,
    $on,
    $parent,
    $delegate
} from "componentes/comum/comum";
import Mensagem from "componentes/comum/mensagem/mensagem";
import usuarioCard from "./usuario-cartao.html";
import foto from "componentes/comum/imagens/justice.gif";

export default class UsuarioVisao {

    constructor(conteiner) {
        this.$conteiner = qs(conteiner);
    }

    // emFormaDeCartao(opcoes = {}) {
    //     this.$conteiner.innerHTML = opcoes.usuarios.map(usuario => {
    //         usuario.foto = foto;
    //         usuario.botoes = ["Direito", "Esquedo"];
    //         return usuarioCard({
    //             usuario
    //         })
    //     }).join("");
    // }
    //
    emFormaDeCartao(opcoes = {}) {
        opcoes["foto"] = foto;
        this.$conteiner.innerHTML = usuarioCard(opcoes);
    }
}
