var firebaseConfig = {
  apiKey: "AIzaSyBV1KyVkhClhmZybbekHGGjdtonJLuk6XU",
  authDomain: "imager-100ac.firebaseapp.com",
  projectId: "imager-100ac",
  storageBucket: "imager-100ac.appspot.com",
  databaseURL:
    " https://imager-100ac-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "122160491177",
  appId: "1:122160491177:web:9638843852e737732f17b8",
  measurementId: "G-W2ENG0KQPH",
};

firebase.initializeApp(firebaseConfig);

let loginButton = document.querySelector(".loginButton");
let logoutButton = document.querySelector(".logoutButton");

function checkUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("로그인 성공");
      console.log(user);
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
    } else {
      console.log("로그인 실패");
      logoutButton.style.display = "none";
      loginButton.style.display = "block";
    }
  });
}

checkUser();

document.querySelector(".logoutButton").onclick = function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("logout success");
      window.alert("성공적으로 로그아웃 되었습니다.");
    })
    .catch(function (error) {
      console.log("error on logout");
    });
  checkUser();
};
