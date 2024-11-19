import InventarioProducto from "./InventarioProducto.js";
import Producto from "./Producto.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    if (!nombreProducto || isNaN(precioProducto)) {
        console.error("Intento de agregar producto inválido: ", { nombreProducto, precioProducto });
        return;
    }

    const productoExistente = carrito.find((producto) => producto.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre: nombreProducto, precio: Number(precioProducto), cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
}

function eliminarDelCarrito(nombreProducto) {
    carrito = carrito.filter((producto) => producto.nombre !== nombreProducto);
    guardarCarrito();
    actualizarCarrito();
}

function incrementarCantidad(nombreProducto) {
    const producto = carrito.find((producto) => producto.nombre === nombreProducto);
    if (producto) {
        producto.cantidad += 1;
        guardarCarrito();
        actualizarCarrito();
    }
}

function decrementarCantidad(nombreProducto) {
    const producto = carrito.find((producto) => producto.nombre === nombreProducto);
    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else if (producto && producto.cantidad === 1) {
        eliminarDelCarrito(nombreProducto);
        return;
    }
    guardarCarrito();
    actualizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, producto) => {
        if (!producto.nombre || isNaN(producto.precio) || isNaN(producto.cantidad)) {
            console.error("Producto con datos inválidos en carrito: ", producto);
            return total;
        }
        return total + producto.precio * producto.cantidad;
    }, 0).toFixed(2);
}

function actualizarCarrito() {
    const carritoContainer = document.querySelector("#carrito .cart-items");

    if (!carritoContainer) {
        console.error("Contenedor del carrito no encontrado.");
        return;
    }

    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<li>El carrito está vacío.</li>";
    } else {
        carrito.forEach((producto) => {
            if (!producto.nombre || isNaN(producto.precio) || isNaN(producto.cantidad)) {
                console.error("Producto inválido detectado en carrito: ", producto);
                return;
            }

            const productoDiv = document.createElement("li");
            productoDiv.classList.add("carrito-item");
            productoDiv.innerHTML = `
                <span class="carrito-nombre">${producto.nombre}</span>
                <span class="carrito-precio">$${producto.precio.toFixed(2)}</span>
                <span class="carrito-cantidad">
                    <button class="btn-decrementar" data-nombre="${producto.nombre}">-</button>
                    ${producto.cantidad}
                    <button class="btn-incrementar" data-nombre="${producto.nombre}">+</button>
                </span>
                <button class="btn-eliminar" data-nombre="${producto.nombre}">Eliminar</button>
            `;
            carritoContainer.appendChild(productoDiv);
        });
    }

    document.querySelectorAll(".btn-decrementar").forEach((button) => {
        button.addEventListener("click", () => decrementarCantidad(button.dataset.nombre));
    });

    document.querySelectorAll(".btn-incrementar").forEach((button) => {
        button.addEventListener("click", () => incrementarCantidad(button.dataset.nombre));
    });

    document.querySelectorAll(".btn-eliminar").forEach((button) => {
        button.addEventListener("click", () => eliminarDelCarrito(button.dataset.nombre));
    });

    const totalContainer = document.querySelector("#carrito-total span");
    if (totalContainer) {
        const total = calcularTotal();
        totalContainer.textContent = `$${total}`;
    }
}

function inicializarBotones() {
    const botonesAgregar = document.querySelectorAll(".add-to-cart-button");

    if (botonesAgregar.length === 0) {
        console.warn("No se encontraron botones para agregar productos.");
        return;
    }

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreProducto = boton.dataset.nombre;
            const precioProducto = parseFloat(boton.dataset.precio);

            if (!nombreProducto || isNaN(precioProducto)) {
                console.error("Datos inválidos en el botón de agregar: ", {
                    nombre: nombreProducto,
                    precio: precioProducto,
                });
                return;
            }
            agregarAlCarrito(nombreProducto, precioProducto);
        });
    });
}



document.getElementById("cart").addEventListener("click", () => {
    const carrito = document.getElementById("carrito");
    carrito.style.display = carrito.style.display === "none" ? "block" : "none";
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    inicializarBotones();
});
