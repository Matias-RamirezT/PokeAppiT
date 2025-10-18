// js/datos.js
function mostrarDatos() {
    console.log("Ejecutando mostrarDatos()");
    const app = document.getElementById("app");

    const usuario = {
        nombre: "Entrenador",
        region: "Kanto",
        pokemonesFavoritos: (JSON.parse(localStorage.getItem("favoritos")) || []).length,
        fecha: new Date().toLocaleDateString(),
    };

    app.innerHTML = `
      <section class="c-lista">
        <h2>Datos del usuario</h2>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Región:</strong> ${usuario.region}</p>
        <p><strong>Favoritos:</strong> ${usuario.pokemonesFavoritos}</p>
        <p><strong>Última visita:</strong> ${usuario.fecha}</p>
      </section>
    `;
}
