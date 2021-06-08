let email = document.querySelector(".email");
let pw = document.querySelector(".pw");
let nickname = document.querySelector(".nickname");
let submitButton = document.querySelector(".signup_submit");
let age = document.querySelector(".age");
let gender = document.querySelector(".gender");
let purpose = document.querySelector(".purpose");
let option;
let data;

function errorMessageChange(message) {
  if (message === "The email address is badly formatted.") {
    return "이메일 형식이 잘못되었습니다. (이메일 형태로만 가입이 가능합니다.)";
  } else if (message === "Password should be at least 6 characters") {
    return "비밀번호는 최소 6자리 이상이어야 합니다.";
  } else if (
    message === "The email address is already in use by another account."
  ) {
    return "이미 사용중인 이메일입니다.";
  }
}

submitButton.addEventListener("click", () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, pw.value)
    .then((userCredential) => {
      let user = userCredential.user;
      data = {
        email: `${email.value}`,
        nickname: `${nickname.value}`,
        age: `${age.value}`,
        gender: `${gender.value}`,
        purpose: `${purpose.value}`,
      };
      console.log(data);
      firebase.database().ref(`userData/${user.uid}`).set(data);
      setTimeout(() => {
        window.alert(`회원가입에 성공했습니다! 아이디: ${email.value}`);
        window.location.href = "/";
      }, [1000]);
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
      window.alert(errorMessageChange(errorMessage));
    });
});
