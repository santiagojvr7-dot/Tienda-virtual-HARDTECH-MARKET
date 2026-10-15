
const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./database");

const app = express();
const PORT = 3000;

// Configuración del servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Página principal y archivos públicos
app.use(express.static(path.join(__dirname, "public")));


 // Consultar productos desde PostgreSQL
app.get("/api/productos", async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                id,
                nombre,
                categoria,
                precio::float8 AS precio,
                existencias,
                icono
            FROM productos
            WHERE activo = TRUE
            ORDER BY id
        `);

        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al consultar productos:", error.message);
        res.status(500).json({
            error: "No se pudieron obtener los productos"
        });
    }
});


// Ruta de prueba
app.get("/api", (req, res) => {
    res.json({
        proyecto: "HardTech Market",
        mensaje: "¡Nuestra API funciona correctamente!"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`HardTech Market funcionando en http://localhost:${PORT}`);
});
