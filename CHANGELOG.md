# Registro de Cambios

## Primer Parcial: Entregas 1 y 2

### Entrega Actividad Obligatoria 1 - [Fecha: 2024-09-13]
- **HTML:**
  - Se creó la maqueta **HTML** con etiquetas basicas.
  - Se añadieron imagenes para los productos así como para el logo de la página.
  - Se añadió información de la empresa, y un formulario para dejar FeedBack.
  
  - **Pull Request:** [#1](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/1)

- **README.md:**
  - Se creó el archivo **README.md**

  - **Pull Request:** [#1](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/1)

### Entrega Actividad Obligatoria 2 - [Fecha: 2024-10-02]
- **CSS:**
  - Se agregaron los estilos básicos a los elementos principales de la página.
  - Se agregaron media-querys para un diseño mas responisvo.

  - **Pull Request:** [#2](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/2)

- **HTML:**
  - Se agregaron marquadores unicos a las etiquetas **HTML** (clases, ids, etc).

  - **Pull Request:** [#2](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/2)

### Primer Parcial - [Fecha: 2024-10-20]
- **Bootstrap:**
  - Se agregó un **Carrousel** con imagenes nuevas.
  - Se agregó un **IFrame** con la localización de la empresa.

   - **Pull Request:** [#3](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/3)

- **CSS:**
  - Se agregaron estilos para el Carrousel.

  - **Pull Request:** [#3](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/3)

## Segundo Parcial: Entregas 3 y 4

### Entrega Actividad Obligatoria 3 - [Fecha: 2024-10-22]
- **JavaScript:**
  - Se crearon 2 nuevas clases **"Producto"** y **"InventarioProducto"**.
  - Se agregaron métodos en la clase **"InventarioProducto"**. 
    - agregarProducto
    - buscarProducto
    - mostrarProducto
  - Se utilizó el archivo **"script.js"** para agregar funciones.
    - validarFormulario

  - **Pull Request:** [#5](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/5)

- **CSS:**
  - Se mejoró el Carrousel haciendolo más responsive.

  - **Pull Request:** [#5](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/5)


### Entrega Actividad Obligatoria 4 - [Fecha: 2024-11-19]
- **JavaScript:**
  - Se creó la clase **"Carrito"**, sus métodos son:
    - guardarCarrito: Lo guarda en el localStorage
    - validarProducto
    - agregarAlCarrito: Agrega un producto al carrito
    - eliminarDelCarrito: Elimina un producto del carrito
    - incrementarCantidad: Incrementa la cantidad de productos de un tipo en el carrito
    - decrementarCantidad: Decrementa la cantidad de productos de un tipo en el carrito
    - calcularTotal: Calcula el precio total dentro del carrito
    - actualizarCarrito
    - InicializarBotones
  - Se creó la clase **"Notificaciones"**, sus métodos son:
    - mostrarResumenCompra
    - mostrarNotificacion: mustra una notificación cuando se produce un evento (agregarAlCarrito, eliminarDelCarrito, incrementarCantidad, etc)
  - Ahora el archivo **script.js** solo se utiliza para funcionalidades importante, se liberó de responsabilidades.
  - Se **eliminaron** clases inecesarias.

  - **Pull Request:** [#8](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/8) 

- **Bootstrap:**
  - Cuando se finaliza la compra, muestra un mensaje de exito con un modal.

  - **Pull Request:** [#8](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/8)

- **CSS:**
  - Se agregaron diseños para las notificaciones.

  - **Pull Request:** [#8](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/8)

### Segundo Parcial - [Fecha: 2024-11-28]
- **JavaScript:**
  - **Carrito:** 
    - Se le dió formato al documento.
    - Se aregaron métodos para la cargas de productos de la API ([FakeStore API](https://fakestoreapi.com/)) y para mostrarlos en el HTML.
    - Ahora se comprueba si la respuesta del fecth es existosa antes de procesar el JSON.
    - Se añaden nuevos elementos al DOM usando createElement y appendChild.
    - El resultado del filtro de productos ahora se guarda en una nueva variable para asegurar que las notificaciones se muestren correctamente.
  - **Notificaciones:**
    - Se le dió formato al documento.
  - **script.js:**
    - Los botones se inicializan desde el método *"cargarProductosAPI"*.

  - **Pull Request:** [#10](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/10)

- **CHANGELOG:**
  - Se completó con información de las actualizaciones del proyecto completo.

  - **Pull Request:** [#10](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/10)

- **CSS:**
  - Se le dió formato al documento.
  - Cambios de diseño en los productos **Nota:** Aún faltan mejoras.

  - **Pull Request:** [#10](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/10)

- **Reglas:**
  - Se agregaron reglas para que las Pull-Request necesiten comfirmación de un reviewer.

  - **Pull Request:** [#10](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/10)

- **Pull-Request Template:**
  - se creó una template para las PRs.

  - **Pull Request:** [#11](https://github.com/Lucaaaa05/Programacion-Web-LucaE/pull/11 )