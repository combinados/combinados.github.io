import * as firebase from "firebase";
// Firebase
const CONFIG_FIREBASE = {
    apiKey: "AIzaSyBb46_Qu1bo3QR8x47LnKdYt9BheD2P0pc",
    authDomain: "combinados.firebaseapp.com",
    databaseURL: "https://combinados.firebaseio.com",
    storageBucket: "firebase-combinados.appspot.com",
    messagingSenderId: "607735444379"
};

export default firebase.initializeApp(CONFIG_FIREBASE);

// Google
const CONFIG_GOOGLE = {
    client_id: "607735444379-7i6fbl9qoqgbiihrp5mpakom5lv5nrq6.apps.googleusercontent.com"
};

// (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "//apis.google.com/js/platform.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, "script", "google-id"));
//
// window.glAsyncInit = function() {
//     gapi.auth2.init(CONFIG_GOOGLE);
// }

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
        // User is signed-in Facebook.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(event.authResponse, firebaseUser)) {
                // Build Firebase credential with the Facebook auth token.
                // [START facebookcredential]
                var credential = firebase.auth.FacebookAuthProvider.credential(
                    event.authResponse.accessToken);
                // [END facebookcredential]
                // Sign in with the credential from the Facebook user.
                // [START authwithcred]
                firebase.auth().signInWithCredential(credential)
                    .then(usuario =>
                        firebase.database().ref("usuarios/" + usuario.uid).set({
                            nome: usuario.displayName,
                            email: usuario.email,
                            foto: usuario.photoURL
                        })
                    )
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
                        // [END_EXCLUDE]
                    });
                // [END authwithcred]
            } else {
                // User is already signed-in Firebase with the correct user.
            }
        });
    } else {
        // User is signed-out of Facebook.
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
}
// [END facebookcallback]

/**
 * Check that the given Facebook or Google user is equals to the  given Firebase user
 */
// [START checksameuser]
function isUserEqual(usuarioGoogleOuFacebook, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === usuarioGoogleOuFacebook.getBasicProfile().getId()) {
                // We don"t need to reauth the Firebase connection.
                return true;
            }
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                providerData[i].uid === usuarioGoogleOuFacebook.userID) {
                // We don"t need to re-auth the Firebase connection.
                return true;
            }
        }
    }
    return false;
}
// [END checksameuser]

function verificarLoginGoogle(googleUser) {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            // [START googlecredential]
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.getAuthResponse().id_token);
            // [END googlecredential]
            // Sign in with credential from the Google user.
            // [START authwithcred]
            firebase.auth().signInWithCredential(credential)
                .then(function(usuario) {
                    firebase.database().ref("usuarios/" + usuario.uid).set({
                        nome: usuario.displayName,
                        email: usuario.email,
                        foto: usuario.photoURL
                    });
                })
                .catch(function(error) {
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
                    // [END_EXCLUDE]
                });
            // [END authwithcred]
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
function initApp() {
  window.verificarLoginGoogle = verificarLoginGoogle;
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            alert(JSON.stringify(user, null, "  "));
            // [END_EXCLUDE]
        } else {}
    });
    // [END authstatelistener]
}
initApp();
