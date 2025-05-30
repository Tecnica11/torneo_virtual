const texto = "Torneo Virtual de Juegos!";
const titulo = document.getElementById("matrix");

// Crear spans por cada letra
titulo.innerHTML = texto.split("").map(letra =>
  `<span>${letra === " " ? "&nbsp;" : letra}</span>`
).join("");

const letras = titulo.querySelectorAll("span");

function parpadearLetrasAleatorias(cantidad = 10) {
  const indices = new Set();
  while (indices.size < cantidad) {
    indices.add(Math.floor(Math.random() * letras.length));
  }

  // Ocultar las letras
  indices.forEach(i => letras[i].style.opacity = 0);

  // Volver a mostrarlas después de 200ms
  setTimeout(() => {
    indices.forEach(i => letras[i].style.opacity = 1);
    setTimeout(() => {
        indices.forEach(i => letras[i].style.opacity = 0);
      }, 50);
      setTimeout(() => {
        indices.forEach(i => letras[i].style.opacity = 1);
      }, 100);
  }, 200);

}

// Ejecutar cada segundo
setInterval(() => {
  parpadearLetrasAleatorias(10);
}, 1000);

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('matrixBox');

// Adaptar tamaño al contenedor
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array.from({ length: columns }).map(() => Math.random() * -canvas.height);

const letters = "アァカサタナハマヤャラワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0cb7f2";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = letters[Math.floor(Math.random() * letters.length)];
    const x = i * fontSize;
    const y = drops[i];

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i] += fontSize;
    }
  }
}

setInterval(draw, 50);

function medirTextoConEstilo(texto, referenciaDOM) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const estilo = getComputedStyle(referenciaDOM);
  const fontSize = estilo.fontSize;      // e.g. "42px"
  const fontFamily = estilo.fontFamily;  // e.g. "Orbitron, sans-serif"

  ctx.font = `${fontSize} ${fontFamily}`;
  return ctx.measureText(texto).width;
}


const frases = ["Cómo es la movida?", "Y qué onda el premio?", "Cómo participo??"];

frases.forEach((frase, index) => {
  const palabras = frase.split(" ");
  const contenedor = document.getElementById(`frase${index + 1}`);
  contenedor.style.position = "relative";

  generarFraseAnimada(palabras, contenedor);
});

async function generarFraseAnimada(palabras, contenedor) {
  let acumulado = 0;

  for (const palabra of palabras) {
    const glitchContainer = document.createElement("div");
    glitchContainer.className = "glitch-container";
    glitchContainer.style.position = "absolute";
    glitchContainer.style.left = `${acumulado}px`;

    const sliceCount = 50;
    for (let i = 0; i < sliceCount; i++) {
      const slice = document.createElement("div");
      slice.className = "slice";
      const span = document.createElement("span");
      span.textContent = palabra;

      const top = (i * 2) + "%";
      const height = "2%";
      slice.style.clipPath = `inset(${top} 0 calc(100% - ${top} - ${height}) 0)`;

      slice.appendChild(span);
      glitchContainer.appendChild(slice);
    }

    contenedor.appendChild(glitchContainer);

    const ancho = medirTextoConEstilo(palabra, contenedor); // medir según el h2
    // acumulado += ancho + 10;

    const anchoContenedor = contenedor.offsetWidth;
    // console.log(anchoContenedor)
    const separacion = anchoContenedor * 0.05;
    // console.log(ancho)
    acumulado += ancho + separacion ; // separación entre palabras
  }
}


// Animación glitch
setInterval(() => {
  document.querySelectorAll(".glitch-container").forEach(container => {
    container.querySelectorAll(".slice").forEach(slice => {
      if (Math.random() < 0.2) {
        const offset = (Math.random() - 0.5) * 20;
        slice.style.transform = `translateX(${offset}px)`;
        slice.style.opacity = Math.random() < 0.1 ? 0.3 : 1;
      } else {
        slice.style.transform = `translateX(0)`;
        slice.style.opacity = 1;
      }
    });
  });
}, 100);

window.addEventListener("resize", () => {
  // Borra todo lo anterior
  document.querySelectorAll(".glitch-container").forEach(el => el.remove());

  // Y volvés a generarlo
  frases.forEach((frase, index) => {
    const palabras = frase.split(" ");
    const contenedor = document.getElementById(`frase${index + 1}`);
    generarFraseAnimada(palabras, contenedor);
  });
});
