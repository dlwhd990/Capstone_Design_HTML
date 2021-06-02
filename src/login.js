let id, pw;

function Ready() {
  id = document.querySelector(".id").value;
  pw = document.querySelector(".pw").value;
  console.log(id, pw);
}

document.querySelector(".login_submit").onclick = function () {
  Ready();
  firebase
    .auth()
    .signInWithEmailAndPassword(id, pw)
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      window.history.back();
    }
  });
};
