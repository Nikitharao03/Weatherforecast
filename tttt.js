let weather = {
    apiKey: "8fa23948b5ec171a5a4e67936002ce76",
    fetchWeather: function (city) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
         + city
         + "&units=metric&appid="
         + this.apiKey
        )
         .then((response) => response.json())
         .then((data) => this.displayWeather(data));
        },
        displayWeather: function(data) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.querySelector(".city").innerText = "Weather in " + name
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = Math.round(temp) + "°C";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + "Km/h"
			
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920×1080/? " + name + "')"
        },
        search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value);
        },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("india");