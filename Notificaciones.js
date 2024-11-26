import Carrito from "./Carrito.js";

class Notificaciones {
    constructor(carrito) {
        if (!(carrito instanceof Carrito)) {
            throw new Error("Se requiere una instancia válida de Carrito.");
        }
        this.carrito = carrito;
        this.formateador = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
    }


    mostrarResumenCompra() { 
        const detalleCompra = document.getElementById("detalleCompra");
        detalleCompra.innerHTML = "";
    
        if (!this.carrito || !Array.isArray(this.carrito.productos)) {
            console.error("El carrito o su lista de productos no están definidos correctamente.");
            detalleCompra.innerHTML = "<li class='list-group-item'>Error al cargar el carrito.</li>";
            return;
        }
    
        if (this.carrito.productos.length === 0) {
            detalleCompra.innerHTML = "<li class='list-group-item'>El carrito está vacío.</li>";
            return;
        }
    
        this.carrito.productos.forEach((producto) => {
            const item = document.createElement("li");
            item.classList.add("list-group-item");
            item.innerHTML = `
    ${producto.nombre} - ${producto.cantidad} x ${this.formateador.format(producto.precio)} = ${this.formateador.format(producto.precio * producto.cantidad)}
`;
            detalleCompra.appendChild(item);
        });
    
        const totalItem = document.createElement("li");
        totalItem.classList.add("list-group-item", "list-group-item-primary", "fw-bold");
        totalItem.textContent = `Total: ${this.carrito.calcularTotal()}`;
        detalleCompra.appendChild(totalItem);
    }
    

    mostrarNotificacion(mensaje, tipo = "info") {
    const contenedor = document.getElementById("notificaciones");

    if (!contenedor) {
        console.error("No se encontró el contenedor de notificaciones.");
        return;
    }

    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion", tipo);
    notificacion.textContent = mensaje;

    contenedor.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 4000);
}
}


export default Notificaciones;