// js/ui.js — Pantalla de bienvenida con logo clásico
(function () {
  console.log("UI: Cargando pantalla inicial...");

  const overlay = document.createElement("div");
  overlay.id = "ui-bienvenida";
  overlay.innerHTML = `
    <div class="ui-fondo"></div>
    <div class="ui-contenido">
      <img src="icons/icon-512.png" alt="Logo Pokémon" class="ui-logo">
      <p>Explora, busca y guarda tus pokémon favoritos</p>
      <span class="ui-tocar">Toca para comenzar</span>
    </div>
  `;

  document.body.appendChild(overlay);

  const style = document.createElement("style");
  style.textContent = `
    #ui-bienvenida {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      z-index: 9999;
      cursor: pointer;
      transition: opacity 0.6s ease;
      overflow: hidden;
    }

    /* Fondo con imagen local */
    #ui-bienvenida .ui-fondo {
      position: absolute;
      inset: 0;
      background: url('icons/pokemon.jpg') no-repeat center center / cover;
      z-index: 1;
      filter: brightness(0.6);
      transition: transform 8s ease-in-out;
    }

    #ui-bienvenida:hover .ui-fondo {
      transform: scale(1.05);
    }

    #ui-bienvenida .ui-contenido {
      position: relative;
      z-index: 2;
      color: white;
      padding: 24px;
      text-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
      animation: aparecer 1s ease forwards;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Logo clásico */
    .ui-logo {
      width: 280px;
      max-width: 80%;
      height: auto;
      margin-bottom: 12px;
      filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.6));
      animation: zoomIn 1s ease forwards;
    }

    #ui-bienvenida p {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .ui-tocar {
      display: inline-block;
      font-size: 14px;
      color: #ffcb05;
      font-weight: 600;
      animation: parpadeo 1.2s infinite ease-in-out alternate;
    }

    @keyframes parpadeo {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0.5; transform: scale(1.03); }
    }

    @keyframes aparecer {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes zoomIn {
      0% { opacity: 0; transform: scale(0.85); }
      100% { opacity: 1; transform: scale(1); }
    }

    @media (max-width: 768px) {
      .ui-logo { width: 200px; }
      #ui-bienvenida p { font-size: 16px; }
    }
  `;
  document.head.appendChild(style);

  // Clic → cerrar bienvenida
  overlay.addEventListener("click", () => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      console.log("UI: Entrando a la lista de pokemones...");
      if (typeof mostrarLista === "function" && window.pokemones) {
        mostrarLista(pokemones);
      } else {
        console.warn("mostrarLista o pokemones no disponibles todavía");
      }
    }, 600);
  });
})();

