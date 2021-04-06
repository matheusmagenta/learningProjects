window.addEventListener("load", () => {
  // getting geolocation
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
    });
  } else {
    h1.textContent = "please enable your location";
  }
});
