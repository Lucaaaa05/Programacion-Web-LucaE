import InventarioProducto from "./InventarioProducto.js";
import Producto from "./Producto.js";
import Carrito from "./Carrito.js";

const carrito = new Carrito();

function mostrarResumenCompra() {
    const detalleCompra = document.getElementById("detalleCompra");
    detalleCompra.innerHTML = "";

    if (!Carrito || !Array.isArray(carrito.productos)) {
        console.error("El carrito o su lista de productos no están definidos correctamente.");
        detalleCompra.innerHTML = "<li class='list-group-item'>Error al cargar el carrito.</li>";
        return;
    }

    if (carrito.productos.length === 0) {
        detalleCompra.innerHTML = "<li class='list-group-item'>El carrito está vacío.</li>";
        return;
    }

    carrito.productos.forEach((producto) => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `
            ${producto.nombre} - ${producto.cantidad} x $${producto.precio.toFixed(2)} = $${(producto.precio * producto.cantidad).toFixed(2)}
        `;
        detalleCompra.appendChild(item);
    });

    const totalItem = document.createElement("li");
    totalItem.classList.add("list-group-item", "list-group-item-primary", "fw-bold");
    totalItem.textContent = `Total: $${carrito.calcularTotal()}`;
    detalleCompra.appendChild(totalItem);
}

const btnFinalizarCompra = document.querySelector(".checkout-button");
btnFinalizarCompra.addEventListener("click", () => {
    mostrarResumenCompra();
    const modal = new bootstrap.Modal(document.getElementById("modalCompra"));
    modal.show();
});

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

document.getElementById("cart").addEventListener("click", () => {
    const carrito = document.getElementById("carrito");
    carrito.classList.toggle("visible");
});
