

const express = require('express');
const client = require('./db'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//APIS PARA CRUD DE RESTARUANTE
app.post('/api/guardarRestaurantes', async (req, res) => {
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const result = await client.query(query, [nombre, ciudad, direccion, fecha_apertura]);
        res.status(201).json({ message: "Restaurante creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando restaurante', error: error.message });
    }
});


app.get('/api/obtenerRestaurantes', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM restaurante');
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener restaurantes', error: error.message });
    }
});


app.put('/api/actualizarRestaurantes/:id', async (req, res) => {
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


app.delete('/api/eliminarRestaurantes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM restaurante WHERE id_rest = $1', [id]);
        res.status(200).json({ message: "Restaurante eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando restaurante', error: error.message });
    }
});

//APIS PARA CRUD DE EMPLEADO

app.post('/api/guardarEmpleados', async (req, res) => {
    const { nombre, rol, id_rest } = req.body;
    const query = 'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *';

    try {
        const result = await client.query(query, [nombre, rol, id_rest]);
        res.status(201).json({ message: "Empleado creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando empleado', error: error.message });
    }
});

app.get('/api/obtenerEmpleados', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM empleado');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
    }
});

app.put('/api/actualizarEmpleados/:id', async (req, res) => {
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

app.delete('/api/eliminarEmpleados/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
        res.status(200).json({ message: "Empleado eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando empleado', error: error.message });
    }
});

//API PARA CRUD DE PRODUCTOS

app.post('/api/guardarProductos', async (req, res) => {
    const { nombre, precio } = req.body;
    const query = 'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *';

    try {
        const result = await client.query(query, [nombre, precio]);
        res.status(201).json({ message: "Producto creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando producto', error: error.message });
    }
});

app.get('/api/obtenerProductos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM producto');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});

app.put('/api/actualizarProductos/:id', async (req, res) => {
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

app.delete('/api/eliminarProductos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM producto WHERE id_prod = $1', [id]);
        res.status(200).json({ message: "Producto eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando producto', error: error.message });
    }
});

//APIS PARA CRUD DE PEDIDOS
app.post('/api/guardarPedidos', async (req, res) => {
    const { fecha, id_rest, total } = req.body;
    const query = 'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *';

    try {
        const result = await client.query(query, [fecha, id_rest, total]);
        res.status(201).json({ message: "Pedido creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando pedido', error: error.message });
    }
});

app.get('/api/obtenerPedidos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM pedido');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
});

app.put('/api/actualizarPedidos/:id', async (req, res) => {
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

app.delete('/api/eliminarPedidos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM pedido WHERE id_pedido = $1', [id]);
        res.status(200).json({ message: "Pedido eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando pedido', error: error.message });
    }
});

//API DETALLES PEDIDO
app.post('/api/guardarDetallesPedidos', async (req, res) => {
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'INSERT INTO detalle_pedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const result = await client.query(query, [id_pedido, id_prod, cantidad, subtotal]);
        res.status(201).json({ message: "DetallePedido creado", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error creando detalle de pedido', error: error.message });
    }
});

app.get('/api/obtenerDetallesPedidos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM detalle_pedido');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedidos', error: error.message });
    }
});

app.put('/api/actualizarDetallesPedidos/:id', async (req, res) => {
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

app.delete('/api/eliminarDetalleProducto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM detalle_pedido WHERE id_detalle = $1', [id]);
        res.status(200).json({ message: "DetallePedido eliminado", data: result.rowCount });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando detalle de pedido', error: error.message });
    }
});


//APIS DE CONSULTAS NATIVAS

app.get('/api/productosPorPedido/:id_pedido', async (req, res) => {
    const { id_pedido } = req.params;
    const query = `
        SELECT p.nombre, p.precio, dp.cantidad, dp.subtotal
        FROM detalle_pedido dp
        JOIN producto p ON dp.id_prod = p.id_prod
        WHERE dp.id_pedido = $1
    `;

    try {
        const result = await client.query(query, [id_pedido]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo productos del pedido', error: error.message });
    }
});

app.get('/api/productosMasVendidos', async (req, res) => {
    const { limite } = req.query;
    let query = `
        SELECT p.nombre, SUM(dp.cantidad) AS total_vendido
        FROM detalle_pedido dp
        JOIN producto p ON dp.id_prod = p.id_prod
        GROUP BY p.nombre
        ORDER BY total_vendido DESC
    `;
    if (limite && !isNaN(limite)) {
        query += ` LIMIT ${parseInt(limite)}`;
    }
    try {
        const result = await client.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo productos más vendidos', error: error.message });
    }
});


app.get('/api/ventasPorRestaurantes', async (req, res) => {
    const query = `
        SELECT r.nombre AS restaurante, SUM(p.total) AS total_ventas
        FROM pedido p
        JOIN restaurante r ON p.id_rest = r.id_rest
        GROUP BY r.nombre
        ORDER BY total_ventas DESC
    `;

    try {
        const result = await client.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo ventas por restaurante', error: error.message });
    }
});

app.get('/api/pedidosPorFecha/:fecha', async (req, res) => {
    const { fecha } = req.params;
    const query = `
        SELECT pedido.id_pedido, pedido.fecha, pedido.total, restaurante.nombre AS nombre_restaurante
        FROM pedido
        JOIN restaurante ON pedido.id_rest = restaurante.id_rest
        WHERE pedido.fecha = $1
    `;

    try {
        const result = await client.query(query, [fecha]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo pedidos por fecha', error: error.message });
    }
});


app.get('/api/empleadosPorRol/:id_rest/:rol', async (req, res) => {
    const { id_rest, rol } = req.params;
    const query = `
        SELECT empleado.id_empleado, empleado.nombre, empleado.rol, restaurante.nombre AS nombre_restaurante
        FROM empleado
        JOIN restaurante ON empleado.id_rest = restaurante.id_rest
        WHERE empleado.id_rest = $1 AND empleado.rol = $2
    `;

    try {
        const result = await client.query(query, [id_rest, rol]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error obteniendo empleados por rol', error: error.message });
    }
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


//PARA INICIAR Y QUE SE AUTO ACTUALICE ES node --watch index.js