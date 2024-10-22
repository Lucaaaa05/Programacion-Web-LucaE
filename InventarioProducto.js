import Producto from "./Producto.js";

class InventarioProducto {
    constructor() {
        this.productos = []; // array para almacenar los productos
    }

    agregarProducto() {
        let nombreProducto = prompt("Ingresa el nombre del producto:");
        let precioProducto = parseInt(prompt("Ingresa el precio del producto:"));
        let nuevoProducto = new Producto(nombreProducto, precioProducto);
        this.productos.push(nuevoProducto); // agrega el producto al array
        console.log(`Producto agregado: ${nombreProducto}, Precio: ${precioProducto}`);
    }

    buscarProducto() {
        let barraBusqueda;
    
        do {
            barraBusqueda = prompt("Ingrese el producto a buscar (escriba 'ESC' para terminar)").toUpperCase();
    
            if (barraBusqueda === "ESC") {
                console.log("Saliendo..."); // por si el usuario no quiere buscar nada
                break;
            }
    
            let resultados = this.productos.filter(producto =>
                producto.nombreProducto.includes(barraBusqueda) // busca dentro del array
            );
    
            if (resultados.length > 0) {
                console.log("Productos encontrados:");
                resultados.forEach(producto => {
                    console.log(`- ${producto.nombreProducto} - Precio: $${producto.precioProducto}`);
                });
            } else {
                console.log("Producto no encontrado.");
            }
        } while (true);
    }
    
    mostrarProducto() {
        if (this.productos.length > 0) {
            console.log("Lista de productos:");
            this.productos.forEach((Producto, index) => {
                console.log(`${index + 1}. ${Producto.nombreProducto} - Precio: $${Producto.precioProducto}`);
            });
        } else {
            console.log("No hay productos en el inventario.");
        }
}

}

export default InventarioProducto;