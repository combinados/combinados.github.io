import * as firebase from "firebase";
import imagemPadrao from "comum/imagens/defaultprofile-300px.png"
import {
    qs,
    dispararEvento
} from "comum/comum";
// Firebase
const CONFIG_FIREBASE = {
    apiKey: "AIzaSyBb46_Qu1bo3QR8x47LnKdYt9BheD2P0pc",
    authDomain: "combinados.firebaseapp.com",
    databaseURL: "https://combinados.firebaseio.com",
    storageBucket: "firebase-combinados.appspot.com",
    messagingSenderId: "607735444379"
};

export default firebase.initializeApp(CONFIG_FIREBASE);

// Facebook
const CONFIG_FACEBOOK = {
    appId: "420607971611753",
    xfbml: true,
    version: "v2.8"
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);

}(document, "script", "facebook-jssdk"));

window.fbAsyncInit = function() {
    FB.init(CONFIG_FACEBOOK);
    FB.Event.subscribe("auth.authResponseChange", verificarLoginFacebook);
};

function verificarLoginFacebook(event) {
    if (event.authResponse) {
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!ehUsuarioFacebookIgualFirebase(event.authResponse, firebaseUser)) {
                var credential = firebase.auth.FacebookAuthProvider.credential(event.authResponse.accessToken);
                const evento = {
                    nome: "usuario.novoOuAtualizacao",
                    corpo: credential
                };
                dispararEvento(evento);
            } else {
                // User is already signed-in Firebase with the correct user.
            }
        });
    } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
    }
}

function ehUsuarioFacebookIgualFirebase(usuarioFacebook, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                providerData[i].uid === usuarioFacebook.userID) {
                // We don"t need to re-auth the Firebase connection.
                return true;
            }
        }
    }
    return false;
}

function ehUsuarioGoogleIgualFirebase(usuarioGoogle, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === usuarioGoogle.getBasicProfile().getId()) {
                // We don"t need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
}

function verificarLoginGoogle(googleUser) {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!ehUsuarioGoogleIgualFirebase(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
            const evento = {
                nome: "usuario.novoOuAtualizacao",
                corpo: credential
            };
            dispararEvento(evento);
        } else {
            console.log("User already signed-in Firebase.");
        }
    });
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
export function initApp() {
    window.verificarLoginGoogle = verificarLoginGoogle;
    const $usuarioDiv = document.querySelector("#usuario-corrente");
    firebase.auth().onAuthStateChanged(function(user) {
        user = user || {
            photoURL: imagemPadrao,
            displayName: "Deslogado"
        };
        if (user) {
            $usuarioDiv.style.backgroundImage = `url("${user.photoURL}")`;
            const primeiroNome = user.displayName.split(" ")[0]

            $usuarioDiv.innerHTML = `
                <h1 class="mdc-card__title login-card__title">${primeiroNome}</h1>`;
            // <h2 class="mdc-card__subtitle">${restoNome}</h2>`;
        } else {}
    });
}
initApp();
