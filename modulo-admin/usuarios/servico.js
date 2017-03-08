import ServicoGenerico from "comum/servico"
import firebase from "comum/seguranca";
export default class Servico extends ServicoGenerico {
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

    criarOuAtualizar(credential) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithCredential(credential)
                .then(usuario => {
                    resolve(
                        firebase.database().ref("usuarios/" + usuario.uid).set({
                            nome: usuario.displayName,
                            email: usuario.email,
                            foto: usuario.photoURL
                        })
                    )
                })
                .catch(error => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user"s account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // [START_EXCLUDE]
                    if (errorCode === "auth/account-exists-with-different-credential") {
                        alert("You have already signed up with a different auth provider for that email.");
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user"s accounts here.
                    } else {
                        console.error(error);
                    }
                    reject(error);
                });
        });
    }

    buscarTodos() {
        return firebase.database().ref("usuarios").orderByKey().once("value");
    }
    buscarJogos(rodadaId) {
        return firebase.database().ref("gabarito").orderByChild("rodada").equalTo(rodadaId).once("value");
    }
}
