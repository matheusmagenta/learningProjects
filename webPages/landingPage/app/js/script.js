const btnHamburguer = document.querySelector("#btnHamburger");
const header = document.querySelector(".header");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const fadeElems = document.querySelectorAll(".has-fade");

btnHamburguer.addEventListener("click", function () {
  console.log("click hamburger");

  if (header.classList.contains("open")) {
    body.classList.remove("noscroll");
    // close hamburger
    header.classList.remove("open");
    fadeElems.forEach(function (element) {
      element.classList.remove("fade-in");
      element.classList.add("fade-out");
    });
  } else {
    //open hamburger
    body.classList.add("noscroll");
    header.classList.add("open");
    fadeElems.forEach(function (element) {
      element.classList.add("fade-in");
      element.classList.remove("fade-out");
    });
  }
});
