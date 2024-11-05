let weather = {
  apikey: "b56c84ad3c4d5390f090762161763a55",
  unit: "metric",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=" +
        this.unit +
        "&appid=" +
        this.apikey
    )
      .then(response => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then(data => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    let tempF = this.unit === "imperial" ? parseFloat(((temp * 9/5) + 32 - 99.218).toFixed(2))  : temp;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText =
      tempF + (this.unit === "metric" ? "°C" : "°F");
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },

  toggleUnit: function () {
    this.unit = this.unit === "metric" ? "imperial" : "metric";

    document.querySelector(".toggle-unit").innerText =
      this.unit === "metric" ? "Switch to °F" : "Switch to °C";

    this.fetchWeather(
      document.querySelector(".city").innerText.replace("Weather in ", "")
    );
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

document.querySelector(".toggle-unit").addEventListener("click", function () {
  weather.toggleUnit();
});

weather.fetchWeather("Delhi");
