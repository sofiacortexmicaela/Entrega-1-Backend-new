const express = require('express');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

const app = express();
const port = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Usar los routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});