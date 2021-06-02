import firebase from "./firebase";

firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    let user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
  });
