// Razas que quieres mostrar
const breeds = ["labrador", "pug", "husky", "akita", "bulldog"];

// Contenedores del HTML
const menu = document.getElementById("menu");
const breedName = document.getElementById("breed-name");
const breedImg = document.getElementById("breed-img");
const breedInfo = document.getElementById("breed-info");

// Crear botones dinámicos
breeds.forEach(breed => {
    const btn = document.createElement("button");
    btn.textContent = breed.toUpperCase();
    btn.addEventListener("click", () => loadBreed(breed));
    menu.appendChild(btn);
});

// Función para obtener info de la API
async function loadBreed(breed) {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
        const data = await response.json();

        if (!data.length) {
            breedName.textContent = "No encontrado";
            return;
        }

        const dog = data[0];
        breedName.textContent = dog.name;

        // Obtener imagen
        const imgResponse = await fetch(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`);
        const imgData = await imgResponse.json();

        breedImg.src = imgData.url;

        // Características
        breedInfo.innerHTML = `
            <li><strong>Temperamento:</strong> ${dog.temperament || "No disponible"}</li>
            <li><strong>Peso:</strong> ${dog.weight.metric} kg</li>
            <li><strong>Altura:</strong> ${dog.height.metric} cm</li>
            <li><strong>Esperanza de vida:</strong> ${dog.life_span}</li>
        `;
    } catch (error) {
        console.error(error);
        breedName.textContent = "Error al cargar datos";
    }
}
