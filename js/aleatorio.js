// js/aleatorio.js - Versión corregida
var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

function generarNumerosUnicos(count, max){
  const set = new Set();
  const maxAttempts = 200;
  let attempts = 0;
  while(set.size < count && attempts < maxAttempts){
    const n = Math.floor(Math.random() * max) + 1;
    set.add(n);
    attempts++;
  }
  return Array.from(set);
}

function mostrarAleatorio(pokemones) {
    const app = document.getElementById("app");
    if(!pokemones || pokemones.length === 0){
      app.innerHTML = `<p>No hay pokemones cargados aún.</p>`;
      console.warn('mostrarAleatorio: pokemones vacíos');
      return;
    }

    // Obtener 4 únicos
    const numeros = generarNumerosUnicos(4, totalPokes);
    // Guardar sólo nuevos en misNumeros y persistir
    let nuevos = 0;
    numeros.forEach(num => {
      if(!misNumeros.includes(num)){
        misNumeros.push(num);
        nuevos++;
      }
    });
    if(nuevos > 0) localStorage.setItem("misNumeros", JSON.stringify(misNumeros));

    let pokesAleatorios = '<section class="c-aleatorio c-lista">';
    numeros.forEach(num => {
        const info = pokemones[num - 1] || { name: `#${num}` };
        pokesAleatorios += `
        <div class="c-lista-pokemon c-un_aleatorio" onclick="mostrarDetalle('${num}')">
            <p>#${num}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${info.name}" width="60" height="60">
            <p>${info.name || ''}</p>
        </div>`;
    });

    pokesAleatorios += "</section>";
    app.innerHTML = pokesAleatorios;
    console.log('Aleatorio mostrado:', numeros, 'MisNumeros guardados:', misNumeros);
}
