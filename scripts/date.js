const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Display current year
currentYear.textContent = new Date().getFullYear();

// Display last modified date
lastModified.textContent = `Last Modified: ${document.lastModified}`;

