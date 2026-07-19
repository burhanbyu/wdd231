// ===============================
// HOME.JS
// ===============================

// Replace with your own OpenWeatherMap API key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Nairobi coordinates
const latitude = -1.286389;
const longitude = 36.817223;

// ===============================
// WEATHER
// ===============================

async function getWeather() {

    const currentURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {

        // Current Weather
        const currentResponse = await fetch(currentURL);

        if (!currentResponse.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const currentData = await currentResponse.json();

        document.querySelector("#temperature").textContent =
            `Temperature: ${Math.round(currentData.main.temp)}°C`;

        document.querySelector("#description").textContent =
            currentData.weather[0].description;

        // Forecast
        const forecastResponse = await fetch(forecastURL);

        if (!forecastResponse.ok) {
            throw new Error("Unable to retrieve forecast.");
        }

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (error) {

        console.error("Weather error:", error);

        document.querySelector("#temperature").textContent =
            "Weather information unavailable.";

        document.querySelector("#description").textContent = "";

        document.querySelector("#forecast").innerHTML = "";

    }

}

function displayForecast(data) {

    const forecast = document.querySelector("#forecast");

    forecast.innerHTML = "";

    // Select one forecast every 24 hours at noon
    const days = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    days.forEach(day => {

        const date = new Date(day.dt_txt);

        const card = document.createElement("div");
        card.className = "forecast-card";

        card.innerHTML = `
            <h4>${date.toLocaleDateString("en-US", { weekday: "long" })}</h4>
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].description}</p>
        `;

        forecast.appendChild(card);

    });

}

// ===============================
// MEMBER SPOTLIGHTS
// ===============================

async function getSpotlights() {

    try {

        // Change the path if your members.json is elsewhere
        const response = await fetch("scripts/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const members = await response.json();

        const qualifiedMembers = members.filter(member =>
            member.membership === "Gold" ||
            member.membership === "Silver"
        );

        // Randomize the order
        qualifiedMembers.sort(() => Math.random() - 0.5);

        // Select up to three members
        const selected = qualifiedMembers.slice(0, 3);

        displaySpotlights(selected);

    } catch (error) {

        console.error("Spotlight error:", error);

        document.querySelector("#spotlights").innerHTML =
            "<p>Unable to load member spotlights.</p>";

    }

}

function displaySpotlights(members) {

    const container = document.querySelector("#spotlights");

    container.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.className = "spotlight-card";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <strong>${member.membership} Member</strong>
        `;

        container.appendChild(card);

    });

}

// ===============================
// FOOTER
// ===============================

document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;

// ===============================
// INITIALIZE PAGE
// ===============================

getWeather();
getSpotlights();