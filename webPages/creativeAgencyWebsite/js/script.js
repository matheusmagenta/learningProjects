// selecting elements
const toggleDiv = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");

// event listeners
toggleDiv.addEventListener("click", () => {
  toggleDiv.classList.toggle("active");
  navigation.classList.toggle("active");
});
