function save(id, image) {
  firebase.database().ref(`source/${id}`).set(image);
}

let image = {
  id: 33,
  tag: "building",
  name: "sakura",
  uri: "https://res.cloudinary.com/dcx3u0sp8/image/upload/v1623042695/source/japan-tait%C5%8D-ku-sens%C5%8D-ji-blossoms_whbglk.jpg",
  usage: "background",
};
