let goEdit = document.querySelector(".go_edit");
if (window.innerWidth <= 780) {
  goEdit.href = "./editor_mobile.html";
}

let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu_list");
let toggleOn = false;

toggle.addEventListener("click", () => {
  toggleOn = !toggleOn;
  console.log(toggleOn);
  if (toggleOn) {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});
