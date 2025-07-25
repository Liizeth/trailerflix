const express = require('express');
require('dotenv').config({ path: __dirname + '/../.env' });

const routes = require('./routes/index');

const app = express();
app.use(express.json());

app.use("/ingenias", routes);



app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada en app" });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});