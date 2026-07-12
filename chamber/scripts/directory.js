const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#members");

const url = "data/members.json";


async function getMembers() {

    try {

        const response = await fetch(url);

        const data = await response.json();

        displayMembers(data);

    } catch (error) {

        console.error("Error loading members:", error);

    }

}



function displayMembers(members) {

    display.innerHTML = "";


    members.forEach((member) => {


        let level;


        if (member.membership === 3) {

            level = "Gold";

        } else if (member.membership === 2) {

            level = "Silver";

        } else {

            level = "Member";

        }



        const card = document.createElement("article");


        card.classList.add("card");



        card.innerHTML = `

            <img src="images/${member.image}" 
                 alt="${member.name} logo" 
                 loading="lazy">


            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p>${member.address}</p>

            <p>${member.phone}</p>


            <a href="${member.website}" target="_blank">
                Visit Website
            </a>


            <p>
                Membership: ${level}
            </p>

        `;



        display.appendChild(card);


    });


}




gridButton.addEventListener("click", () => {

    display.classList.add("grid");

    display.classList.remove("list");

});




listButton.addEventListener("click", () => {

    display.classList.add("list");

    display.classList.remove("grid");

});




getMembers();

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = document.lastModified;

