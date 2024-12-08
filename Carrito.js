import Notificaciones from "./Notificaciones.js";

class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
        this.notis = new Notificaciones(this);
        this.formateador = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
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
            this.notis.mostrarNotificacion("Datos inválidos al intentar agregar un producto.", "error");
            return;
        }

        const productoExistente = this.productos.find((producto) => producto.nombre === nombreProducto);

        if (productoExistente) {
            productoExistente.cantidad += 1;
            this.notis.mostrarNotificacion(`Cantidad aumentada para el producto: ${nombreProducto}`, "info");
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
            const nuevoListado = this.productos.filter((producto) => producto.nombre !== nombreProducto);
            this.notis.mostrarNotificacion(`Producto eliminado: ${nombreProducto}`, "error");
            this.productos = nuevoListado;
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
        const total = this.productos.reduce(
            (acum, producto) => acum + producto.precio * producto.cantidad,
            0
        );
        return this.formateador.format(total);
    }


    actualizarCarrito() {
        const carritoContainer = document.querySelector("#carrito .cart-items");

        carritoContainer.innerHTML = this.productos
            .map(
                (producto) => `
                    <li class="carrito-item">
                        <span class="carrito-nombre">${producto.nombre}</span>
                        <span class="carrito-precio">$${this.formateador.format(producto.precio)}</span>
                        <span class="carrito-cantidad">
                            <button class="btn-decrementar" data-nombre="${producto.nombre}">-</button>
                            ${producto.cantidad}
                            <button class="btn-incrementar" data-nombre="${producto.nombre}">+</button>
                        </span>
                        <button class="btn-eliminar" data-nombre="${producto.nombre}">Eliminar</button>
                    </li>
                `
            )
            .join("");

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
            totalContainer.textContent = this.calcularTotal();
        }
    }

    inicializarBotones() {
        const botonesAgregar = document.querySelectorAll(".add-to-cart-button");

        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const nombreProducto = boton.dataset.nombre;
                const precioProducto = parseFloat(boton.dataset.precio);

                if (!this.validarProducto(nombreProducto, precioProducto)) {
                    console.error("Datos inválidos al agregar producto");
                    return;
                }

                this.agregarAlCarrito(nombreProducto, precioProducto);
            });
        });
    }

    async cargarProductosAPI() {
        try {
            const respuesta = await fetch("https://fakestoreapi.com/products");

            if (!respuesta.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            const productos = await respuesta.json();

            this.productos = productos.map((producto) => ({
                nombre: producto.title,
                precio: producto.price,
                cantidad: 1,
                imagen: producto.image,
            }));

            this.guardarCarrito();
            this.actualizarCarrito();
            this.mostrarProductosEnHTML();
        } catch (error) {
            console.error("Error al cargar productos desde la API:", error);
        }
    }

    mostrarProductosEnHTML() {
        const contenedorProductos = document.getElementById("productos");
        contenedorProductos.innerHTML = "";

        this.productos.forEach((producto) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto', 'card');
            productoDiv.innerHTML = `
            <div class="producto card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: ${this.formateador.format(producto.precio)}</p>
                    <button class="add-to-cart-button btn btn-primary" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
            contenedorProductos.appendChild(productoDiv);
        });

        this.inicializarBotones();
    }
}

export default Carrito;