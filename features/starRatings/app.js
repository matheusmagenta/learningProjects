// initial ratings
const ratings = {
  sony: 4.7,
  samsung: 3.4,
  vizio: 2.3,
  panasonic: 3.6,
  phillips: 4.1,
};

// total stars
const starsTotal = 5;

// run getRatings when DOM loads
document.addEventListener("DOMContentLoaded", getRatings);

// form elements
const productSelect = document.getElementById("product-select");
const ratingControl = document.getElementById("rating-control");

// init product
let product;

// product select change
productSelect.addEventListener("change", (e) => {
  product = e.target.value;
  console.log("product: ", product);

  // enable rating control
  ratingControl.disabled = false;

  // get element value by key in ratings object
  ratingControl.value = ratings[product];
});

// rating control change
ratingControl.addEventListener("blur", (e) => {
  // get rating
  const rating = e.target.value;

  // make sure 5 or under
  if (rating > 5) {
    alert("please rate 1 to 5");
    return;
  }

  // change rating
  ratings[product] = rating;

  // re-run getRatings function to update
  getRatings();
});

// get ratings
function getRatings() {
  for (let rating in ratings) {
    console.log(rating);
    // get percentage
    const starPercentage = (ratings[rating] / starsTotal) * 100;
    console.log(starPercentage);

    // round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    console.log(starPercentageRounded);

    // set width of stars inner to percentage
    document.querySelector(
      `.${rating} .stars-inner`
    ).style.width = starPercentageRounded;

    // add number rating
    document.querySelector(`.${rating} .number-rating`).innerHTML =
      ratings[rating];
  }
}
