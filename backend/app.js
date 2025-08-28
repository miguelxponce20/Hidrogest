const path = require("path");
const dotenv = require("dotenv");


dotenv.config({ path: path.resolve(__dirname, "../.env") });

const express = require('express')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor de Backend corriendo en el puerto ${PORT}`);
});
