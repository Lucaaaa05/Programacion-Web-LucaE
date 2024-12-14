# Framework - Express

---


**Express** es un framework minimalista para *Node.js* que facilita la creación de aplicaciones web y APIs. Su propósito es ofrecer herramientas para el manejo de rutas, solicitudes *HTTP* y *middleware* de forma eficiente.

- ##### Características destacadas:
    - Framework ligero y rápido para servidores Node.js.
    - Manejo sencillo de rutas y peticiones.
    - Compatible con otras bibliotecas y bases de datos.

---

## Motivación y justificación
**Express** facilita la implementación de un servidor *backend* eficiente para *Practicasa*. Permite gestionar las solicitudes de datos del catálogo de productos, manejar formularios de contacto y realizar operaciones *CRUD*.

---

## Nivel de dificultad de adaptación
La curva de aprendizaje de **Express** es *baja*, ya que su sintaxis es simple y amigable. Además, se integra con bases de datos como *MongoDB* y bibliotecas como *CORS* y *body-parser*.

- ##### Cambios requeridos:
    - Crear rutas *RESTful* para gestionar las operaciones del catálogo *(GET, POST, PUT, DELETE)*.
    - Implementar conexión con una base de datos para almacenar productos

---

## Ejemplo de código - "Antes y después"
- **Antes (JavaScript puro):**

```
const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ name: 'Producto 1' }, { name: 'Producto 2' }]));
  }
}).listen(3000);
```

- **Después (React):**

```
const express = require('express');
const app = express();

app.get('/products', (req, res) => {
  res.json([{ name: 'Producto 1' }, { name: 'Producto 2' }]);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```