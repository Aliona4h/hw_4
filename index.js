const charactersList = document.querySelector("#characters");
const characterModal = document.getElementById("characterModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

let currentPage = 1;
let isLoading = false;

async function showCharacters(page) {
  try {
    charactersList.innerHTML = "<p>Loading...</p>";

    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    if (!res.ok) {
      throw new Error("Request Failed");
    }
    const data = await res.json();

    charactersList.innerHTML = "";

    data.results.forEach((character) => {
      const div = document.createElement("div");
      div.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
            <p>${character.status}</p>`;

      div.addEventListener("click", () => openModal(character));
      charactersList.appendChild(div);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

function openModal(character) {
  modalDetails.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <p>${character.name}</p>
    <p>${character.status}</p>
  `;

  characterModal.style.display = "block";
}
closeModal.addEventListener("click", () => {
  characterModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === characterModal) {
    characterModal.style.display = "none";
  }
});

window.addEventListener("scroll", async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isLoading
  ) {
    isLoading = true;
    currentPage++;
    await showCharacters(currentPage);
    isLoading = false;
  }
});

showCharacters(currentPage);
