const apiKey = 'dab6b154d307014a9c105fdcd5dd8d46';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const FahrenheitElement = document.getElementById('Fahrenheit');
const iconElement = document.getElementById("weather-icon");

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

/**
 * Fetches the weather data for a given location and displays it in the UI.
 * @param {string} location - The location to fetch weather data for.
 */
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // log the API response
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            const fahrenheit = Math.round(data.main.temp * 9 / 5 + 32);
            FahrenheitElement.textContent = `${fahrenheit}°F`;
            const iconCode = data.weather[0].icon;
            console.log(`Icon code: ${iconCode}`); // log the icon code
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            if (data.cod === 200) { // check if search was successful
                iconElement.src = iconUrl;
                iconElement.style.display = "block"; // show the img element
            }
            console.log(iconUrl);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

// Add dark mode toggle

const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Toggle Dark Mode';
darkModeToggle.style.position = 'absolute';
darkModeToggle.style.top = '10px';
darkModeToggle.style.right = '10px';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Add dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode {
        background-color: #121212;
        color: #ffffff;
    }
    
    .dark-mode input[type="text"] {
        background-color: #333;
        color: #fff;
    }
    .dark-mode button {
        background-color: #444;
    }
    .glassmorphism{
        background: rgba(255, 255, 255, 0.17);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5.7px);
        -webkit-backdrop-filter: blur(5.7px);
        border: 1px solid rgba(255, 255, 255, 0.22);
    }
`;
document.head.appendChild(darkModeStyles);
}
