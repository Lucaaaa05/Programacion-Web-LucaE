import Notificaciones from "./Notificaciones.js";

class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
        this.notis = new Notificaciones(this);
    }

guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(this.productos));
}

validarProducto(nombreProducto, precioProducto) {
    if (!nombreProducto || typeof nombreProducto !== "string" || nombreProducto.trim() === "") {
        console.error("Nombre de producto inválido:", nombreProducto);
        return false;
    }

    if (isNaN(precioProducto) || precioProducto <= 0) {
        console.error("Precio de producto inválido:", precioProducto);
        return false;
    }

    return true;
}

agregarAlCarrito(nombreProducto, precioProducto) {
    if (!this.validarProducto(nombreProducto, precioProducto)) {
        notis.mostrarNotificacion("Datos inválidos al intentar agregar un producto.", "error");
        return;
    }

    const productoExistente = this.productos.find((producto) => producto.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        notis.mostrarNotificacion(`Cantidad aumentada para el producto: ${nombreProducto}`, "info");
    } else {
        this.productos.push({ nombre: nombreProducto, precio: Number(precioProducto), cantidad: 1 });
        this.notis.mostrarNotificacion(`Producto agregado: ${nombreProducto}`, "success");
    }

    this.guardarCarrito();
    this.actualizarCarrito();
}

eliminarDelCarrito(nombreProducto) {
    const productoExistente = this.productos.find((producto) => producto.nombre === nombreProducto);

    if (productoExistente) {
        this.productos = this.productos.filter((producto) => producto.nombre !== nombreProducto);
        this.notis.mostrarNotificacion(`Producto eliminado: ${nombreProducto}`, "error");
    }

    this.guardarCarrito();
    this.actualizarCarrito();
}


incrementarCantidad(nombreProducto) {
    const producto = this.productos.find((producto) => producto.nombre === nombreProducto);
    if (producto) {
        producto.cantidad += 1;
        this.notis.mostrarNotificacion(`Cantidad incrementada para: ${nombreProducto}`, "info");
        this.guardarCarrito();
        this.actualizarCarrito();
    }
}

decrementarCantidad(nombreProducto) {
    const producto = this.productos.find((producto) => producto.nombre === nombreProducto);
    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
        this.notis.mostrarNotificacion(`Cantidad decrementada para: ${nombreProducto}`, "info");
    } else if (producto && producto.cantidad === 1) {
        this.eliminarDelCarrito(nombreProducto);
        return;
    }
    this.guardarCarrito();
    this.actualizarCarrito();
}

 calcularTotal() {
    return this.productos.reduce((total, producto) => {
        if (!producto.nombre || isNaN(producto.precio) || isNaN(producto.cantidad)) {
            console.error("Producto con datos inválidos en carrito: ", producto);
            return total;
        }
        return total + producto.precio * producto.cantidad;
    }, 0).toFixed(2);
}

 actualizarCarrito() {
    const carritoContainer = document.querySelector("#carrito .cart-items");

    if (!carritoContainer) {
        console.error("Contenedor del carrito no encontrado.");
        return;
    }

    carritoContainer.innerHTML = "";

    if (this.productos.length === 0) {
        carritoContainer.innerHTML = "<li>El carrito está vacío.</li>";
    } else {
        this.productos.forEach((producto) => {
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
        button.addEventListener("click", () => this.decrementarCantidad(button.dataset.nombre));
    });

    document.querySelectorAll(".btn-incrementar").forEach((button) => {
        button.addEventListener("click", () => this.incrementarCantidad(button.dataset.nombre));
    });

    document.querySelectorAll(".btn-eliminar").forEach((button) => {
        button.addEventListener("click", () => this.eliminarDelCarrito(button.dataset.nombre));
    });

    const totalContainer = document.querySelector("#carrito-total span");
    if (totalContainer) {
        const total = this.calcularTotal();
        totalContainer.textContent = `$${total}`;
    }
}

inicializarBotones() {
    const botonesAgregar = document.querySelectorAll(".add-to-cart-button");

    if (botonesAgregar.length === 0) {
        console.warn("No se encontraron botones para agregar productos.");
        return;
    }

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreProducto = boton.dataset.nombre;
            const precioProducto = parseFloat(boton.dataset.precio);

            if (!this.validarProducto(nombreProducto, precioProducto)) {
                console.error("Datos inválidos detectados al intentar agregar producto desde un botón.");
                return;
            }

            this.agregarAlCarrito(nombreProducto, precioProducto);
        });
    });
}
}

export default Carrito;