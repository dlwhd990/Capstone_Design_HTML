let userData;
let userAge;
let userGender;
let userPur;
let firebaseConfig = {
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
let recommandImageContainer = document.querySelector(".source_image_container");

function settingUser(user, callback) {
  const ref = firebase.database().ref(`userData/${user}`);
  ref.on("value", (item) => {
    const value = item.val();
    value && callback(value);
  });

  return () => ref.off();
}

function getBigData(reference, callback) {
  const ref = firebase.database().ref(`bigData/${reference}`);
  ref.on("value", (item) => {
    const value = item.val();
    value && callback(value);
  });

  return () => ref.off();
}

function saveBigData(value) {
  bigDataObj = value;
  console.log(bigDataObj);
}

function distinguishUser(userData) {
  userAge = userData.age;
  userGender = userData.gender;
  userPur = userData.purpose;
  console.log(userAge, userGender, userPur);
  getBigData(`${userAge}/${userGender}/${userPur}`, saveBigData);
}

function updateBigData(image) {}

function getUserData(value) {
  userData = value;
  distinguishUser(userData);
}

function checkUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("로그인 성공");
      console.log(user);
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
      console.log(user.uid);
      settingUser(user.uid, getUserData);
    } else {
      console.log("로그인 실패");
      logoutButton.style.display = "none";
      loginButton.style.display = "block";
      recommandImageContainer.innerHTML = `
      <div class="source_image_title_box">
          <span class="source_image_title">추천 이미지</span>
          <p>로그인 후에 사용가능합니다.</p>
        </div>
      `;
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
