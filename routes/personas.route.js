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
 * /api/personas/user/{idUsuario}:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener todas las personas asociadas a un usuario
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de personas asociadas al usuario
 *       404:
 *         description: No se encontraron personas para este usuario
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/user/:idUsuario', personasController.getAllPersonasByUsuario);


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
 * /api/personas/resumen/id/{idAlbergue}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de discapacidad por ID
 *     parameters:
 *       - in: path
 *         name: idAlbergue
 *         schema:
 *           type: string
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
router.get('/resumen/id/:id', personasController.getResumenDiscapacidad);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     tags:
 *       - Personas
 *     summary: Registrar múltiples personas con una firma común
 *     description: Inserta una o más personas. La firma se aplica por igual a todas.
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
 *                 description: >
 *                   Array JSON de objetos persona serializado como texto.
 *                   Ejemplo de valor:
 *                   [
 *                     { "nombre": "Juan", "primerApellido": "Pérez", "segundoApellido": "Rodríguez", "idFamilia": 1, "tieneCondicionSalud": true, "descripcionCondicionSalud": "Hipertensión", "discapacidad": false, "tipoDiscapacidad": null, "subtipoDiscapacidad": null, "paisOrigen": "Nicaragua", "autoidentificacionCultural": "Afrodescendiente", "puebloIndigena": "Bribri", "firma": "firma.jpg", "tipoIdentificacion": "Cédula", "numeroIdentificacion": "123456789", "nacionalidad": "Costarricense", "parentesco": "Padre", "esJefeFamilia": true, "fechaNacimiento": "1980-05-15", "genero": "Masculino", "sexo": "Masculino", "telefono": "88889999", "contactoEmergencia": "Ana María 87001122", "observaciones": "Usa medicamentos diariamente", "estaACargoMenor": false, "idUsuarioCreacion": 1 },
 *                     { "nombre": "María", "primerApellido": "González", "segundoApellido": "López", "idFamilia": 1, "tieneCondicionSalud": false, "descripcionCondicionSalud": null, "discapacidad": true, "tipoDiscapacidad": "Motora", "subtipoDiscapacidad": "Parálisis parcial", "paisOrigen": null, "autoidentificacionCultural": null, "puebloIndigena": null, "firma": "firma.jpg", "tipoIdentificacion": "DIMEX", "numeroIdentificacion": "987654321", "nacionalidad": "Nicaragüense", "parentesco": "Madre", "esJefeFamilia": false, "fechaNacimiento": "1985-08-25", "genero": "Femenino", "sexo": "Femenino", "telefono": "89998888", "contactoEmergencia": null, "observaciones": null, "estaACargoMenor": true, "idUsuarioCreacion": 1 }
 *                   ]
 *                 example: |
 *                   [
 *                     {
 *                       "nombre": "Juan",
 *                       "primerApellido": "Pérez",
 *                       "segundoApellido": "Rodríguez",
 *                       "idFamilia": 1,
 *                       "tieneCondicionSalud": true,
 *                       "descripcionCondicionSalud": "Hipertensión",
 *                       "discapacidad": false,
 *                       "tipoDiscapacidad": null,
 *                       "subtipoDiscapacidad": null,
 *                       "paisOrigen": "Nicaragua",
 *                       "autoidentificacionCultural": "Afrodescendiente",
 *                       "puebloIndigena": "Bribri",
 *                       "firma": "firma.jpg",
 *                       "tipoIdentificacion": "Cédula",
 *                       "numeroIdentificacion": "123456789",
 *                       "nacionalidad": "Costarricense",
 *                       "parentesco": "Padre",
 *                       "esJefeFamilia": true,
 *                       "fechaNacimiento": "1980-05-15",
 *                       "genero": "Masculino",
 *                       "sexo": "Masculino",
 *                       "telefono": "88889999",
 *                       "contactoEmergencia": "Ana María 87001122",
 *                       "observaciones": "Usa medicamentos diariamente",
 *                       "estaACargoMenor": false,
 *                       "idUsuarioCreacion": 1
 *                     },
 *                     {
 *                       "nombre": "María",
 *                       "primerApellido": "González",
 *                       "segundoApellido": "López",
 *                       "idFamilia": 1,
 *                       "tieneCondicionSalud": false,
 *                       "descripcionCondicionSalud": null,
 *                       "discapacidad": true,
 *                       "tipoDiscapacidad": "Motora",
 *                       "subtipoDiscapacidad": "Parálisis parcial",
 *                       "paisOrigen": null,
 *                       "autoidentificacionCultural": null,
 *                       "puebloIndigena": null,
 *                       "firma": "firma.jpg",
 *                       "tipoIdentificacion": "DIMEX",
 *                       "numeroIdentificacion": "987654321",
 *                       "nacionalidad": "Nicaragüense",
 *                       "parentesco": "Madre",
 *                       "esJefeFamilia": false,
 *                       "fechaNacimiento": "1985-08-25",
 *                       "genero": "Femenino",
 *                       "sexo": "Femenino",
 *                       "telefono": "89998888",
 *                       "contactoEmergencia": null,
 *                       "observaciones": null,
 *                       "estaACargoMenor": true,
 *                       "idUsuarioCreacion": 1
 *                     }
 *                   ]
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
 * /api/personas/resumen/porAlbergue/{idAlberguePersona}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por albergue
 *     description: Devuelve un resumen con las personas asociadas a un albergue específico.
 *     parameters:
 *       - in: path
 *         name: idAlberguePersona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del albergue para obtener el resumen de personas.
 *         example: 12
 *     responses:
 *       200:
 *         description: Resumen de personas obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idPersona:
 *                         type: integer
 *                         example: 45
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       edad:
 *                         type: integer
 *                         example: 34
 *                       genero:
 *                         type: string
 *                         example: Masculino
 *       400:
 *         description: Parámetro idAlberguePersona no proporcionado.
 *       404:
 *         description: No se encontraron personas para el albergue especificado.
 *       500:
 *         description: Error interno al obtener el resumen de personas.
 */
router.get('/resumen/porAlbergue/:idAlberguePersona', personasController.getResumenPersonasPorAlbergue);

/**
 * @swagger
 * /api/personas/resumen/sexo/{idSexoPersona}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por sexo
 *     description: Devuelve un resumen con las personas agrupadas por un sexo específico.
 *     parameters:
 *       - in: path
 *         name: idSexoPersona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del sexo para filtrar las personas.
 *         example: 1
 *     responses:
 *       200:
 *         description: Resumen de personas por sexo obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idPersona:
 *                         type: integer
 *                         example: 78
 *                       nombre:
 *                         type: string
 *                         example: María Gómez
 *                       edad:
 *                         type: integer
 *                         example: 28
 *                       sexo:
 *                         type: string
 *                         example: Femenino
 *       400:
 *         description: Parámetro idSexoPersona no proporcionado.
 *       404:
 *         description: No se encontraron personas para el sexo especificado.
 *       500:
 *         description: Error interno al obtener el resumen de personas por sexo.
 */
router.get('/resumen/sexo/:idSexoPersona', personasController.getResumenPersonasPorSexo);

/**
 * @swagger
 * /api/personas/resumen/edad/{idEdadPersona}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por edad
 *     description: Devuelve un resumen con las personas filtradas por un rango o categoría de edad específica.
 *     parameters:
 *       - in: path
 *         name: idEdadPersona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría de edad para filtrar las personas.
 *         example: 3
 *     responses:
 *       200:
 *         description: Resumen de personas por edad obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idPersona:
 *                         type: integer
 *                         example: 102
 *                       nombre:
 *                         type: string
 *                         example: Juan López
 *                       edad:
 *                         type: integer
 *                         example: 35
 *       400:
 *         description: Parámetro idEdadPersona no proporcionado.
 *       404:
 *         description: No se encontraron personas para la edad especificada.
 *       500:
 *         description: Error interno al obtener el resumen de personas por edad.
 */
router.get('/resumen/edad/:idEdadPersona', personasController.getResumenPersonasPorEdad);

module.exports = router;
