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
  // FB.Event.subscribe('auth.login', login_event);
  // FB.Event.subscribe('auth.logout', deslogarFacebook);
};

function criarOuAtualizarUsuario(credential) {
  return new Promise((ok, erro) => {
    firebase.auth().signInWithCredential(credential)
      .then(usuario => {
        return firebase.database().ref("usuarios/" + usuario.uid).update({
          nome: usuario.providerData[0].displayName,
          email: usuario.providerData[0].email,
          foto: usuario.providerData[0].photoURL
        });
      })
      .then(confimacao => {
        const evento = {
          nome: "usuario.novoOuAtualizacao",
          corpo: confimacao
        };
        dispararEvento(evento);
        ok(evento);
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
        erro(error);
      });
  });
}

function verificarLoginFacebook(event) {
  if (event.authResponse) {
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!ehUsuarioFacebookIgualFirebase(event.authResponse, firebaseUser)) {
        var credential = firebase.auth.FacebookAuthProvider.credential(event.authResponse.accessToken);
        criarOuAtualizarUsuario(credential)
          .then(t => {
            console.log(t);
          });
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
  if (googleUser) {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      // unsubscribe();
      // firebase.auth().signOut();
      // firebaseUser = null
      // Check if we are already signed-in Firebase with the correct user.
      if (!ehUsuarioGoogleIgualFirebase(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
        criarOuAtualizarUsuario(credential)
          .then(t => {
            console.log(t);
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  } else {
    // User is signed-out of Google.
    firebase.auth().signOut();
  }
}

function deslogarGoogle() {
  var googleAuth = gapi.auth2.getAuthInstance();
  googleAuth.signOut().then(function() {
    firebase.auth().signOut();
  });
}

function deslogarFacebook() {
  FB.logout();

  firebase.auth().signOut();
}

function deslogar() {
  var googleAuth = gapi.auth2.getAuthInstance();
  googleAuth.signOut().then(function() {
    firebase.auth().signOut();
  });

  FB.logout();
  firebase.auth().signOut();
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
export function autenticacao() {
  window.verificarLoginGoogle = verificarLoginGoogle;
  firebase.auth().onAuthStateChanged(function(usuario) {
    usuario = usuario || {
      photoURL: imagemPadrao,
      displayName: "Deslogado"
    };
    if (usuario) {
      const $usuarioDiv = document.querySelector("#usuario-corrente");
      $usuarioDiv.style.backgroundImage = `url("${usuario.photoURL}")`;
      const primeiroNome = usuario.displayName.split(" ")[0];
      $usuarioDiv.innerHTML = `
            <h1 class="mdc-card__title">${primeiroNome}</h1>
            <div id="sair" class="mdc-card__subtitle"><i class="material-icons">exit_to_app</i></div>`;
      if (usuario.providerData) {
        let sair = usuario.providerData[0].providerId === "google.com" ? deslogarGoogle : deslogarFacebook;
        document.getElementById("sair").addEventListener("click", deslogar, false);
      }
    } else {}
  });
}
// initApp();
