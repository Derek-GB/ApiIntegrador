const { Router } = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = Router();

const personasController = require('../controllers/personasController');

/**
 * @swagger
 * /api/personas/all:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener todas las personas
 *     responses:
 *       200:
 *         description: Personas obtenidas correctamente
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/all', personasController.getAllPersonas);

/**
 * @swagger
 * /api/personas/id/{id}:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', personasController.getPersona);

/**
 * @swagger
 * /api/personas/discapacidad/id/{id}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de discapacidad por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de discapacidad
 *     responses:
 *       200:
 *         description: Resumen de discapacidad obtenido exitosamente
 *       400:
 *          description: Se espera un id de discapacidad
 *       404:
 *         description: Discapacidad no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', personasController.getResumenDiscapacidad);

// /**
//  * @swagger
//  * /api/personas:
//  *   post:
//  *     tags:
//  *       - Personas
//  *     summary: Insertar una nueva persona
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - tieneCondicionSalud
//  *               - discapacidad
//  *               - firma
//  *               - idFamilia
//  *               - nombre
//  *               - primerApellido
//  *               - segundoApellido
//  *               - tipoIdentificacion
//  *               - numeroIdentificacion
//  *               - nacionalidad
//  *               - parentesco
//  *               - esJefeFamilia
//  *               - fechaNacimiento
//  *               - genero
//  *               - sexo
//  *               - telefono
//  *               - estaACargoMenor
//  *             properties:
//  *               tieneCondicionSalud:
//  *                 type: boolean
//  *               descripcionCondicionSalud:
//  *                 type: string
//  *                 nullable: true
//  *               discapacidad:
//  *                 type: boolean
//  *               tipoDiscapacidad:
//  *                 type: string
//  *                 nullable: true
//  *               subtipoDiscapacidad:
//  *                 type: string
//  *                 nullable: true
//  *               paisOrigen:
//  *                 type: string
//  *                 nullable: true
//  *               autoidentificacionCultural:
//  *                 type: string
//  *                 nullable: true
//  *               puebloIndigena:
//  *                 type: string
//  *                 nullable: true
//  *               firma:
//  *                 type: string
//  *               idFamilia:
//  *                 type: integer
//  *               nombre:
//  *                 type: string
//  *               primerApellido:
//  *                 type: string
//  *               segundoApellido:
//  *                 type: string
//  *               tipoIdentificacion:
//  *                 type: string
//  *               numeroIdentificacion:
//  *                 type: string
//  *               nacionalidad:
//  *                 type: string
//  *               parentesco:
//  *                 type: string
//  *               esJefeFamilia:
//  *                 type: boolean
//  *               fechaNacimiento:
//  *                 type: string
//  *                 format: date
//  *               genero:
//  *                 type: string
//  *               sexo:
//  *                 type: string
//  *               telefono:
//  *                 type: string
//  *               contactoEmergencia:
//  *                 type: string
//  *                 nullable: true
//  *               observaciones:
//  *                 type: string
//  *                 nullable: true
//  *               estaACargoMenor:
//  *                 type: boolean
//  *               idUsuarioCreacion:
//  *                 type: integer
//  *                 nullable: true
//  *     responses:
//  *       201:
//  *         description: Persona registrada correctamente
//  *       400:
//  *         description: Faltan datos requeridos
//  *       500:
//  *         description: Error al insertar persona
//  */

// router.post('/', postMethod);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     tags:
 *       - Personas
 *     summary: Insertar múltiples personas
 *     description: Inserta una o más personas con sus datos personales, condiciones de salud, especiales y poblacionales.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: array
 *             minItems: 2
 *             items:
 *               type: object
 *               required:
 *                 - tieneCondicionSalud
 *                 - discapacidad
 *                 - firma
 *                 - idFamilia
 *                 - nombre
 *                 - primerApellido
 *                 - segundoApellido
 *                 - tipoIdentificacion
 *                 - numeroIdentificacion
 *                 - nacionalidad
 *                 - parentesco
 *                 - esJefeFamilia
 *                 - fechaNacimiento
 *                 - genero
 *                 - sexo
 *                 - telefono
 *                 - estaACargoMenor
 *                 - idUsuarioCreacion
 *               properties:
 *                 tieneCondicionSalud:
 *                   type: boolean
 *                   example: true
 *                 descripcionCondicionSalud:
 *                   type: string
 *                   nullable: true
 *                   example: "Hipertensión"
 *                 discapacidad:
 *                   type: boolean
 *                   example: false
 *                 tipoDiscapacidad:
 *                   type: string
 *                   nullable: true
 *                   example: "Motora"
 *                 subtipoDiscapacidad:
 *                   type: string
 *                   nullable: true
 *                   example: "Parálisis parcial"
 *                 paisOrigen:
 *                   type: string
 *                   nullable: true
 *                   example: "Nicaragua"
 *                 autoidentificacionCultural:
 *                   type: string
 *                   nullable: true
 *                   example: "Afrodescendiente"
 *                 puebloIndigena:
 *                   type: string
 *                   nullable: true
 *                   example: "Bribri"
 *                 firma:
 *                   type: file
 *                   format: image/jpeg
 *                   description: Firma digital en base64 o archivo binario
 *                 idFamilia:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Juan"
 *                 primerApellido:
 *                   type: string
 *                   example: "Pérez"
 *                 segundoApellido:
 *                   type: string
 *                   example: "Rodríguez"
 *                 tipoIdentificacion:
 *                   type: string
 *                   enum: [Cédula, DIMEX, Permiso laboral, Pasaporte, No presenta]
 *                   example: "Cédula"
 *                 numeroIdentificacion:
 *                   type: string
 *                   example: "123456789"
 *                 nacionalidad:
 *                   type: string
 *                   example: "Costarricense"
 *                 parentesco:
 *                   type: string
 *                   example: "Padre"
 *                 esJefeFamilia:
 *                   type: boolean
 *                   example: true
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   example: "1980-05-15"
 *                 genero:
 *                   type: string
 *                   example: "Masculino"
 *                 sexo:
 *                   type: string
 *                   enum: [Masculino, Femenino, Otro]
 *                   example: "Masculino"
 *                 telefono:
 *                   type: string
 *                   example: "88889999"
 *                 contactoEmergencia:
 *                   type: string
 *                   nullable: true
 *                   example: "Ana María 87001122"
 *                 observaciones:
 *                   type: string
 *                   nullable: true
 *                   example: "Usa medicamentos diariamente"
 *                 estaACargoMenor:
 *                   type: boolean
 *                   example: false
 *                 idUsuarioCreacion:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       201:
 *         description: Todas las personas fueron registradas correctamente
 *       207:
 *         description: Algunas personas se registraron con éxito, otras fallaron
 *       400:
 *         description: El cuerpo de la solicitud no es un arreglo válido
 *       500:
 *         description: Error en el registro de todas las personas
 */

/**
 * @swagger
 * /api/personas:
 *   post:
 *     tags:
 *       - Personas
 *     summary: Insertar múltiples personas con una firma común
 *     description: Inserta una o más personas con sus datos personales. La firma se aplica por igual a todas.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - personas
 *               - firma
 *             properties:
 *               personas:
 *                 type: string
 *                 format: binary
 *                 description: Array JSON de objetos persona serializado como texto
 *                 example: '[
 *   {
 *     "tieneCondicionSalud": true,
 *     "descripcionCondicionSalud": "Hipertensión",
 *     "discapacidad": false,
 *     "tipoDiscapacidad": null,
 *     "subtipoDiscapacidad": null,
 *     "paisOrigen": "Nicaragua",
 *     "autoidentificacionCultural": "Afrodescendiente",
 *     "puebloIndigena": "Bribri",
 *     "firma": "firma.jpg",
 *     "idFamilia": 1,
 *     "nombre": "Juan",
 *     "primerApellido": "Pérez",
 *     "segundoApellido": "Rodríguez",
 *     "tipoIdentificacion": "Cédula",
 *     "numeroIdentificacion": "123456789",
 *     "nacionalidad": "Costarricense",
 *     "parentesco": "Padre",
 *     "esJefeFamilia": true,
 *     "fechaNacimiento": "1980-05-15",
 *     "genero": "Masculino",
 *     "sexo": "Masculino",
 *     "telefono": "88889999",
 *     "contactoEmergencia": "Ana María 87001122",
 *     "observaciones": "Usa medicamentos diariamente",
 *     "estaACargoMenor": false,
 *     "idUsuarioCreacion": 1
 *   },
 *   {
 *     "tieneCondicionSalud": false,
 *     "descripcionCondicionSalud": null,
 *     "discapacidad": true,
 *     "tipoDiscapacidad": "Motora",
 *     "subtipoDiscapacidad": "Parálisis parcial",
 *     "paisOrigen": null,
 *     "autoidentificacionCultural": null,
 *     "puebloIndigena": null,
 *     "firma": "firma.jpg",
 *     "idFamilia": 1,
 *     "nombre": "María",
 *     "primerApellido": "González",
 *     "segundoApellido": "López",
 *     "tipoIdentificacion": "DIMEX",
 *     "numeroIdentificacion": "987654321",
 *     "nacionalidad": "Nicaragüense",
 *     "parentesco": "Madre",
 *     "esJefeFamilia": false,
 *     "fechaNacimiento": "1985-08-25",
 *     "genero": "Femenino",
 *     "sexo": "Femenino",
 *     "telefono": "89998888",
 *     "contactoEmergencia": null,
 *     "observaciones": null,
 *     "estaACargoMenor": true,
 *     "idUsuarioCreacion": 1
 *   }
 * ]'
 *               firma:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen de firma (JPEG, PNG, etc.)
 *     responses:
 *       201:
 *         description: Todas las personas fueron registradas correctamente
 *       207:
 *         description: Algunas personas se registraron con éxito, otras fallaron
 *       400:
 *         description: Datos mal formateados
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", upload.single("firma"), personasController.postPersonas);

// router.post("/prueba", upload.single("firma"), (req, res) => {
//   // Aquí puedes manejar la solicitud de prueba
//   res.json({ message: "Solicitud de prueba recibida", file: req.file });
// });

/**
 * @swagger
 * /api/personas:
 *   put:
 *     tags:
 *       - Personas
 *     summary: Actualizar información de una persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idFamilia
 *               - nombre
 *               - primerApellido
 *               - segundoApellido
 *               - tipoIdentificacion
 *               - numIdentificacion
 *               - nacionalidad
 *               - parentesco
 *               - fechaNacimiento
 *               - genero
 *               - sexo
 *               - telefono
 *               - idCondicionesEspeciales
 *               - idCondicionesPoblacionales
 *               - idFirma
 *               - contactoEmergencia
 *               - observaciones
 *               - idUsuarioCreacion
 *               - fechaCreacion
 *               - idUsuarioModificacion
 *               - fechaMofificacion
 *             properties:
 *               id: { type: integer }
 *               idFamilia: { type: string }
 *               nombre: { type: string }
 *               primerApellido: { type: string }
 *               segundoApellido: { type: string }
 *               tipoIdentificacion: { type: string }
 *               numIdentificacion: { type: string }
 *               nacionalidad: { type: string }
 *               parentesco: { type: string }
 *               fechaNacimiento: { type: string, format: date }
 *               genero: { type: string }
 *               sexo: { type: string }
 *               telefono: { type: string }
 *               idCondicionesEspeciales: { type: integer }
 *               idCondicionesPoblacionales: { type: integer }
 *               idFirma: { type: integer }
 *               contactoEmergencia: { type: string }
 *               observaciones: { type: string }
 *               idUsuarioCreacion: { type: integer }
 *               fechaCreacion: { type: string, format: date-time }
 *               idUsuarioModificacion: { type: integer }
 *               fechaMofificacion: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Persona actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
// router.put('/', personasController.putPersona);

/**
 * @swagger
 * /api/personas/id/{id}:
 *   delete:
 *     tags:
 *       - Personas
 *     summary: Eliminar persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona eliminada correctamente
 *       500:
 *         description: Error al eliminar persona (Contactar equipo de API)
 */
router.delete('/id/:id', personasController.deletePersona);


/**
 * @swagger
 * /api/personas/id/{id}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */

router.get('/id/:id', personasController.getResumenPersonasDinamico);




module.exports = router;
