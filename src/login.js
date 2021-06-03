let id, pw;

function Ready() {
  id = document.querySelector(".id").value;
  pw = document.querySelector(".pw").value;
  console.log(id, pw);
}

function errorIdentifier(message) {
  if (
    message ===
    "There is no user record corresponding to this identifier. The user may have been deleted."
  ) {
    return "존재하지 않는 아이디입니다.";
  } else if (
    message === "The password is invalid or the user does not have a password."
  ) {
    return "비밀번호가 틀렸습니다.";
  } else if (message === "The email address is badly formatted.") {
    return "이메일 주소가 형식에 맞지 않습니다.";
  } else if (
    message ===
    "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
  ) {
    return "짧은 시간 안에 로그인 시도가 여러번 일어났기 때문에 해당 아이디로 로그인이 제한되었습니다. 나중에 다시 시도해주세요.";
  }
}

document.querySelector(".login_submit").onclick = function () {
  Ready();
  firebase
    .auth()
    .signInWithEmailAndPassword(id, pw)
    .catch(function (error) {
      let errorMessage = error.message;
      window.alert(errorIdentifier(errorMessage));
    });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      window.history.back();
    }
  });
};

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log(e.key);
    Ready();
    firebase
      .auth()
      .signInWithEmailAndPassword(id, pw)
      .catch(function (error) {
        let errorMessage = error.message;
        window.alert(errorIdentifier(errorMessage));
      });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        window.history.back();
      }
    });
  } else {
    return;
  }
});
