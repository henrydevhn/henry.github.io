const titulo = document.querySelector('h1');
const texto = titulo.innerText;
titulo.innerText = '';

let i = 0;
function escribir() {
    if (i < texto.length) {
        titulo.innerHTML += texto.charAt(i);
        i++;
        setTimeout(escribir, 100); // Velocidad de escritura
    }
}
window.onload = escribir;

const botones = document.querySelectorAll('.a');
const sonido = document.getElementById('sonidoHover');

botones.forEach(boton => {
    boton.addEventListener('mouseenter', () => {
        sonido.currentTime = 0; // Reinicia el sonido si pasas rápido
        sonido.play();
    });
});



const canvas = document.getElementById('canvasFondo');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const caracteres = "01".split(""); // Solo binario para un toque más tech
const fontSize = 16;
const columnas = canvas.width / fontSize;
const gotas = Array(Math.floor(columnas)).fill(1);

function dibujar() {
    ctx.fillStyle = "rgba(15, 23, 42, 0.05)"; // Color de tu fondo actual con transparencia
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffff"; // Color cian que usas en tus botones
    ctx.font = fontSize + "px monospace";

    gotas.forEach((y, i) => {
        const texto = caracteres[Math.floor(Math.random() * caracteres.length)];
        ctx.fillText(texto, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }
        gotas[i]++;
    });
}

setInterval(dibujar, 30);

// Seleccionamos todas las tarjetas y los elementos del modal
const tarjetas = document.querySelectorAll('.asignatura-card');
const modal = document.getElementById('modal-info');
const modalTitulo = document.getElementById('modal-titulo');
const modalDesc = document.getElementById('modal-descripcion');
const btnCerrar = document.querySelector('.close-btn');

// Agregamos el evento de clic a cada tarjeta
tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        // Obtenemos el nombre (quitando el icono del span) y la info del atributo data-info
        const nombre = tarjeta.innerText.replace(tarjeta.querySelector('span')?.innerText || '', '');
        const info = tarjeta.getAttribute('data-info') || "Información detallada de la asignatura de Undécimo BTP.";

        modalTitulo.innerText = nombre;
        modalDesc.innerText = info;
        modal.style.display = 'flex'; // Muestra el modal
    });
});

// Cerrar el modal al darle a la X
btnCerrar.onclick = () => modal.style.display = 'none';

// Cerrar al hacer clic fuera del cuadro
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};

// Efecto sutil de inclinación (Tilt) al pasar el mouse
const buttons = document.querySelectorAll('.social-btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 5;
        const rotateY = (centerX - x) / 5;
        
        btn.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.social-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Añade un brillo extra al entrar
            btn.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
});