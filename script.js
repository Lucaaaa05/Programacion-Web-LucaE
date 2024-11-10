import InventarioProducto from "./InventarioProducto.js";

const miInventario = new InventarioProducto();
miInventario.agregarProducto() // agrega un producto
miInventario.buscarProducto() // busca un producto
miInventario.mostrarProducto(); // muestra los productos


// validar el formulario
function validarFormulario() {
    let nombreUsuario, apellidoUsuario, emailUsuario, mensajeUsuario;

    // validar nombre
    do {
        nombreUsuario = prompt("Introduce tu nombre:");
        if (!nombreUsuario) {
            alert("El nombre es obligatorio");
        }
    } while (!nombreUsuario);

    // validar apellido
    do {
        apellidoUsuario = prompt("Introduce tu apellido:");
        if (!apellidoUsuario) {
            alert("El apellido es obligatorio");
        }
    } while (!apellidoUsuario);

    // validar email
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    do {
        emailUsuario = prompt("Introduce tu email:");
        if (!emailUsuario) {
            alert("El email es obligatorio");
        } else if (!validEmail.test(emailUsuario)) {
            alert("El email no tiene un formato válido");
            emailUsuario = null; // reiniciar la entrada para el siguiente intento
        }
    } while (!emailUsuario);

    // Validar mensaje
    do {
        mensajeUsuario = prompt("Introduce el mensaje:");
        if (!mensajeUsuario) {
            alert("El mensaje es obligatorio");
        }
    } while (!mensajeUsuario);

    // retornar un objeto 
    return {
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        email: emailUsuario,
        mensaje: mensajeUsuario,
        mensajeExito: "Formulario enviado con éxito."
    };
}

const datosFormulario = validarFormulario();

// Mostrar mensaje con datos del usuario
alert(`Se llama: ${datosFormulario.nombre} ${datosFormulario.apellido}, su mensaje es: ${datosFormulario.mensaje}`);
