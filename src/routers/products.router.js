const express = require('express');
const ProductManager = require('../managers/ProductManager'); // Importa ProductManager

const router = express.Router(); // Crear una instancia del router
const productManager = new ProductManager('./products.json'); // Instancia del ProductManager

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts(); // Usa await para métodos asíncronos
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

// Ruta para obtener un producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        const product = await productManager.getProductById(pid); // Usa await
        if (!product) {
            return res.status(404).json({ error: `Producto con ID ${pid} no encontrado.` });
        }
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        // Agregamos un log para verificar qué datos llegan en el cuerpo de la solicitud.
        console.log('Cuerpo recibido en POST /api/products:', req.body);

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos requeridos deben estar completos.' });
        }

        const newProduct = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status: status !== undefined ? status : true, // Valor por defecto: true
            stock,
            category,
            thumbnails: thumbnails || [] // Por defecto, un arreglo vacío
        });

        console.log('Producto creado:', newProduct); // Log para confirmar que el producto fue creado
        res.status(201).json(newProduct); // Devolver el producto creado
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(400).json({ error: error.message });
    }
});

// Ruta para actualizar un producto existente
router.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        const updateFields = req.body;

        // Evitar la actualización del ID
        if (updateFields.id) {
            return res.status(400).json({ error: 'No se puede modificar el ID del producto.' });
        }

        const updatedProduct = await productManager.updateProduct(pid, updateFields); // Usa await
        res.json({ updatedProduct });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        await productManager.deleteProduct(pid); // Usa await
        res.status(204).send(); // Sin contenido
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Exportar el router
module.exports = router;