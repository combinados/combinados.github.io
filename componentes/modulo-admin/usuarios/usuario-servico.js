import Servico from "componentes/comum/servico"
import firebase from "componentes/comum/seguranca";
export default class UsuarioServico extends Servico {
    constructor() {
        super();
    }
    // buscarTodos() {
    //     return new Promise((resolve, reject) => {
    //         resolve({
    //             usuarios: [{
    //                 nome: "Reinaldo Vale",
    //                 classificacao: "1º",
    //                 foto: "../../../imagens/logo.png"
    //             }, {
    //                 nome: "Patriolino",
    //                 classificacao: "2º",
    //                 foto: "../../../imagens/justice.gif"
    //             }]
    //         });
    //     });
    // }

    buscarTodos() {
        let usuarios = firebase.database().ref("usuarios").orderByKey();
        return usuarios.once("value");
    }
}
