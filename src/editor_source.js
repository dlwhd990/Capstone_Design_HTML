function save(id, image) {
  firebase.database().ref(`source/${id}`).set(image);
}
