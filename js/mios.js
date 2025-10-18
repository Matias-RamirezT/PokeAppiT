// js/mios.js - versión corregida
function mostrarMios() {
    console.log("Ejecutando mostrarMios()");
    const app = document.getElementById("app");

    const misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

    if (!misNumeros.length) {
        app.innerHTML = `<p>No tienes pokémones guardados en tus búsquedas aleatorias.</p>`;
        return;
    }

    let html = `<section class="c-lista">`;

    misNumeros.forEach(id => {
        html += `
        <div class="c-lista-pokemon" onclick="mostrarDetalle(${id})">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="60" height="60">
            <p>${pokemones[id - 1]?.name || 'Desconocido'}</p>
        </div>`;
    });

    html += `</section>`;
    app.innerHTML = html;
    console.log("mostrarMios(): renderizados", misNumeros.length, "pokémones");
}
