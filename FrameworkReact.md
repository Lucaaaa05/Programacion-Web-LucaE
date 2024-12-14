# Framework - React

---


**React** es una biblioteca de *JavaScript* desarrollada por Facebook para construir interfaces de usuario, especialmente las que requieren actualizaciones dinámicas. Su **propósito** es crear componentes reutilizables y mejorar la experiencia del usuario con una interfaz rápida y eficiente.

- ##### Características destacadas:
    - Desarrollo basado en componentes reutilizables.
    - Virtual DOM que optimiza el rendimiento.
    - Gran comunidad y soporte constante.

---

## Motivación y justificación
**React** es una buena elección ya que permite crear una interfaz dinámica y eficiente para el catálogo de productos de *Practicasa*. Además facilita la actualización de la información (imágenes, precios, ofertas) sin recargar la página por completo, lo que mejora la experiencia del usuario.

---

## Nivel de dificultad de adaptación
La curva de aprendizaje de **React** es *moderada*, ya que requiere entender conceptos como JSX, componentes, y el estado. Pero, gracias a la documentación y su popularidad, la incorporación en el proyecto es factible.

- ##### Cambios requeridos:
    - Organizar la interfaz en **componentes reutilizables**.
    - Integrar **React** con el backend (*Express*).

---

## Ejemplo de código - "Antes y después"
- **Antes (JavaScript puro):**

```
<div id="product-container"></div>
<script>
  const products = ['Producto 1', 'Producto 2'];
  const container = document.getElementById('product-container');
  products.forEach(product => {
    const div = document.createElement('div');
    div.textContent = product;
    container.appendChild(div);
  });
</script>
```

- **Después (React):**

```
import React from 'react';
import ReactDOM from 'react-dom';

const ProductList = ({ products }) => (
  <div>
    {products.map((product, index) => (
      <div key={index}>{product}</div>
    ))}
  </div>
);

const products = ['Producto 1', 'Producto 2'];
ReactDOM.render(<ProductList products={products} />, document.getElementById('root'));
```