import express from 'express'; // Importación de express
import productsRouter from './routers/products.router.js'; // Importación de routers
import cartsRouter from './routers/carts.router.js';
 
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
