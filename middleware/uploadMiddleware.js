const multer = require("multer");
const path = require("path");
// const fs = require("node:fs/promises");

const getJefeFamilia = (req) => {
  if (!req.body.personas) return null;
  try {
    const personas = JSON.parse(req.body.personas);
    return personas.find((p) => p.esJefeFamilia);
  } catch {
    return null;
  }
};

// Filtro para aceptar solo imágenes .jpg o .png
const fileFilter = (req, file, cb) => {
  const jefe = getJefeFamilia(req);
  if (!jefe || !jefe.numeroIdentificacion) {
    req.firma = {exists: false};
    return cb(null, false);
  }
  const allowed = ["image/jpeg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    req.firma = {exists: true, ruta: "", nombre: "", numeroIdentificacion: ""};
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes JPG o PNG"), false);
  }
};

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ruta = "uploads/firmas";
    req.firma.ruta = ruta;
    cb(null, ruta);
  },
  filename: (req, file, cb) => {
    try {
      const jefe = getJefeFamilia(req);

      if (!jefe || !jefe.numeroIdentificacion) {
        return cb(
          new Error("No se encontró númeroIdentificacion del jefe de familia")
        );
      }

      const ext = path.extname(file.originalname).toLowerCase();
      const fecha = new Date().toISOString().slice(0, 10); // Fecha actual
      const nombre = `${jefe.numeroIdentificacion}-${fecha}${ext}`;
      req.firma.nombre = nombre;
      req.firma.numeroIdentificacion = jefe.numeroIdentificacion;
      cb(null, nombre);
    } catch (error) {
      cb(new Error("Error procesando personas para nombrar el archivo"));
    }
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;