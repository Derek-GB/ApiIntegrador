const fs = require('fs').promises;
const path = require('path');

const rutaInterna = "uploads/firmas";

const prepararFirma = async (firma, identificacion) => {
  const ext = ".png";
  const fecha = new Date().toISOString().slice(0, 10);
  const nombre = `${identificacion}-${fecha}${ext}`;

  const origen = path.join(firma.ruta, firma.nombre);
  const destino = path.join(rutaInterna, nombre);

  await fs.mkdir(rutaInterna, { recursive: true }); // Asegura que exista la carpeta
  await fs.rename(origen, destino); // Mueve el archivo

  firma.ruta = rutaInterna;
  firma.nombre = nombre;
};


module.exports = { prepararFirma };
