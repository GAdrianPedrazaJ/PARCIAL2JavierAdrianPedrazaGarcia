

const express = require('express');
const client = require('./db'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//APIS PARA CRUD DE RESTARUANTE
app.post('/api/guardarrestaurantes', async (req, res) => {
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const result = await client.query(query, [nombre, ciudad, direccion, fecha_apertura]);
        res.status(201).json({ message: "Restaurante creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando restaurante', error: error.message });
    }
});


app.get('/api/obtenerrestaurantes', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM restaurante');
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener restaurantes', error: error.message });
    }
});


app.put('/api/actualizarrestaurantes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = `
        UPDATE restaurante 
        SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4
        WHERE id_rest = $5
    `;

    try {
        const result = await client.query(query, [nombre, ciudad, direccion, fecha_apertura, id]);
        res.status(200).json({ message: "Restaurante actualizado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando restaurante', error: error.message });
    }
});


app.delete('/api/eliminarrestaurantes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM restaurante WHERE id_rest = $1', [id]);
        res.status(200).json({ message: "Restaurante eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando restaurante', error: error.message });
    }
});

//APIS PARA CRUD DE EMPLEADO

app.post('/api/guardarempleados', async (req, res) => {
    const { nombre, rol, id_rest } = req.body;
    const query = 'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *';

    try {
        const result = await client.query(query, [nombre, rol, id_rest]);
        res.status(201).json({ message: "Empleado creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando empleado', error: error.message });
    }
});

app.get('/api/obtenerempleados', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM empleado');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
    }
});

app.put('/api/actualizarempleados/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    const query = `
        UPDATE empleado 
        SET nombre = $1, rol = $2, id_rest = $3 
        WHERE id_empleado = $4
    `;

    try {
        const result = await client.query(query, [nombre, rol, id_rest, id]);
        res.status(200).json({ message: "Empleado actualizado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando empleado', error: error.message });
    }
});

app.delete('/api/eliminarempleados/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
        res.status(200).json({ message: "Empleado eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando empleado', error: error.message });
    }
});

//API PARA CRUD DE PRODUCTOS

app.post('/api/guardarproductos', async (req, res) => {
    const { nombre, precio } = req.body;
    const query = 'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *';

    try {
        const result = await client.query(query, [nombre, precio]);
        res.status(201).json({ message: "Producto creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando producto', error: error.message });
    }
});

app.get('/api/obtenerproductos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM producto');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});

app.put('/api/actualizarproductos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const query = `
        UPDATE producto 
        SET nombre = $1, precio = $2 
        WHERE id_prod = $3
    `;

    try {
        const result = await client.query(query, [nombre, precio, id]);
        res.status(200).json({ message: "Producto actualizado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando producto', error: error.message });
    }
});

app.delete('/api/eliminarproductos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM producto WHERE id_prod = $1', [id]);
        res.status(200).json({ message: "Producto eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando producto', error: error.message });
    }
});

//APIS PARA CRUD DE PEDIDOS
pp.post('/api/GUARDARpedidos', async (req, res) => {
    const { fecha, id_rest, total } = req.body;
    const query = 'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *';

    try {
        const result = await client.query(query, [fecha, id_rest, total]);
        res.status(201).json({ message: "Pedido creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando pedido', error: error.message });
    }
});

app.get('/api/OBTENERpedidos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM pedido');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
});

app.put('/api/ACTUALIZARpedidos/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    const query = 'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4';

    try {
        const result = await client.query(query, [fecha, id_rest, total, id]);
        res.status(200).json({ message: "Pedido actualizado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando pedido', error: error.message });
    }
});

app.delete('/api/ELIMINARpedidos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM pedido WHERE id_pedido = $1', [id]);
        res.status(200).json({ message: "Pedido eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando pedido', error: error.message });
    }
});

//API DETALLES PEDIDO
app.post('/api/GUARDARdetallepedido', async (req, res) => {
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'INSERT INTO detalle_pedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const result = await client.query(query, [id_pedido, id_prod, cantidad, subtotal]);
        res.status(201).json({ message: "DetallePedido creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando detalle de pedido', error: error.message });
    }
});

app.get('/api/Obtenerdetallepedido', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM detalle_pedido');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedidos', error: error.message });
    }
});

app.put('/api/actualizardetallepedido/:id', async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'UPDATE detalle_pedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5';

    try {
        const result = await client.query(query, [id_pedido, id_prod, cantidad, subtotal, id]);
        res.status(200).json({ message: "DetallePedido actualizado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando detalle de pedido', error: error.message });
    }
});

app.delete('/api/eliminardetallepedido/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM detalle_pedido WHERE id_detalle = $1', [id]);
        res.status(200).json({ message: "DetallePedido eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando detalle de pedido', error: error.message });
    }
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


//PARA INICIAR Y QUE SE AUTO ACTUALICE ES node --watch index.js