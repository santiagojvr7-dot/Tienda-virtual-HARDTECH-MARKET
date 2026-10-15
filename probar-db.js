
const pool = require("./database");

async function probarConexion() {
    try {
        const resultado = await pool.query("SELECT NOW() AS fecha");

        console.log("¡Conexión con PostgreSQL exitosa!");
        console.log("Hora de la base de datos:", resultado.rows[0].fecha);
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error.message);
    } finally {
        await pool.end();
    }
}

probarConexion();
