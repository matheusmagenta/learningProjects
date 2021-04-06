window.addEventListener("load", () => {
  // getting geolocation
  let long;
  let lat;

  // selecting elements
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const apiKey = "78afda9384a67b825b39c29a9197ecac";
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
      console.log("api: ", api);
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { name } = data;
          const { description } = data.weather[0];
          // set DOM elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = name;
          // set icon
          setIcons(description, document.querySelector(".icon"));
        });
    });
  } else {
    h1.textContent = "please enable your location";
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/\s/g, "_").toUpperCase();
    console.log("currentIcon: ", currentIcon);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
