import Carrito from "./Carrito.js";
import Notificaciones from "./Notificaciones.js";

const carrito = new Carrito();
const notis = new Notificaciones(carrito);

document.addEventListener("DOMContentLoaded", () => {
    carrito.actualizarCarrito();
    carrito.inicializarBotones();
    const botonCarrito = document.getElementById("cart");
    if (botonCarrito) {
        botonCarrito.addEventListener("click", () => {
            const carritoElemento = document.getElementById("carrito");
            if (carritoElemento) {
                carritoElemento.style.display = carritoElemento.style.display === "none" ? "block" : "none";
            } else {
                console.error("No se encontró el contenedor del carrito en el DOM.");
            }
        });
    }
});

const btnFinalizarCompra = document.querySelector(".checkout-button");
btnFinalizarCompra.addEventListener("click", () => {
    notis.mostrarResumenCompra();
    const modal = new bootstrap.Modal(document.getElementById("modalCompra"));
    modal.show();
});

document.getElementById("cart").addEventListener("click", () => {
    const carrito = document.getElementById("carrito");
    carrito.classList.toggle("visible");
});
