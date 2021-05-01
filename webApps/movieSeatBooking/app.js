// selecting elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied"); // nodelist
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value; // converting string to number

// functions
// populate UI

// saving selected movie index and price to LocalStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// updating total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); // nodelist

  // copy selected seats into arr // converting nodelist to array
  // map through array
  // return a new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);

  //saving to localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// getting data from localStorage and populating UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  // check if it is not null
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// event listeners
// seat click event
container.addEventListener("click", (e) => {
  // adding selected class to the clicked seat that is not occupied
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  // getting index of selected movie
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// initial count and total set
updateSelectedCount();
