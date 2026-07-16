const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    // console.table(data.prophets);

    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        // Create elements
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const birthDate = document.createElement("p");
        const birthPlace = document.createElement("p");
        const portrait = document.createElement("img");

        // Build content
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;
        birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;

        // Build image
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        // Append elements
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Add card to the page
        cards.appendChild(card);
    });
};

getProphetData();

console.log("JavaScript loaded");

async function getProphetData() {
    console.log("Fetching data...");

    const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log(data);

    displayProphets(data.prophets);
}