document.getElementById('location-form').addEventListener('submit', getWeather);
const apiKey = "72ca5f311c0ee47c4570bde86d630af4";

let pCity = document.getElementById("City");
let pTemp = document.getElementById("temp");
let pweather = document.getElementById("weather");

function getWeather(e) {
  e.preventDefault();
  let city = document.getElementById("location-input").value;
  document.getElementById('location-input').value = '';
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json()) 
  .then(data => {
    pCity.textContent = city;
    pTemp.textContent = `${data.main.temp} Â°C`;
    pweather.textContent = data.weather[0].main;
  })
  .catch(error => {
    pweather.textContent = 'Error: City not found';
    pCity.textContent = "";
    pTemp.textContent = "";
  });

}
