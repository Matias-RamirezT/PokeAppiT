let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const toggleFavorito = (id, nombre) => {
    id = Number(id);
    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

    if (esFavorito) {
        favoritos = favoritos.filter(p => Number(p.id) !== id);
        document.getElementById(`corazon-${id}`).textContent = '🤍';
    } else {
        favoritos.push({ 
            id, 
            nombre, 
            url: `https://pokeapi.co/api/v2/pokemon/${id}/` 
        });
        document.getElementById(`corazon-${id}`).textContent = '❤️';
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

const actualizarIconoFavorito = (id) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (!corazonIcono) return;

    if (favoritos.some(pokemon => Number(pokemon.id) === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await res.json();

    let tipoPoke = "";
    for (let i = 0; i < data.types.length; i++) {
        tipoPoke += `<span>${data.types[i].type.name}</span>`;
    }

    const app = document.getElementById("app");
    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

    const detalle = `
    <section class="c-detalle">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" height="120" width="auto">
        <p>${data.name}</p>
        <p>${data.id}</p>
        <p>${tipoPoke}</p>
        <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} km</p>
        <p>hp: ${data.stats[0].base_stat}</p>
        <p>Velocidad: ${data.stats[5].base_stat}</p>
        <p>Ataque: ${data.stats[1].base_stat} Defensa: ${data.stats[2].base_stat}</p>
        <p>Ataque Especial: ${data.stats[3].base_stat} Defensa Especial: ${data.stats[4].base_stat}</p>

        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;

    app.innerHTML = detalle;
    actualizarIconoFavorito(id);
}
function mostrarFavoritos() {
    console.log("Ejecutando mostrarFavoritos()");
    const app = document.getElementById("app");
    if (!favoritos.length) {
        app.innerHTML = `<p>No tienes pokémones favoritos aún.</p>`;
        return;
    }

    let html = `<section class="c-lista">`;
    favoritos.forEach(fav => {
        html += `
        <div class="c-lista-pokemon" onclick="mostrarDetalle(${fav.id})">
            <p>#${fav.id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fav.id}.png" width="60" height="60">
            <p>${fav.nombre}</p>
        </div>`;
    });
    html += `</section>`;
    app.innerHTML = html;
    console.log("mostrarFavoritos(): renderizados", favoritos.length, "pokémones");
}
