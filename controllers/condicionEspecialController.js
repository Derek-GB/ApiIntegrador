const { request, response } = require("express");
const condicionEspecialService = require("../service/condicionEspecialService");

const getAllCondicionesEspeciales = async (req = request, res = response) => {
  try {
    const data = await condicionEspecialService.getAllCondicionesEspeciales();
    res.status(200).json({
      success: true,
      data: data[0],
      message: "Condiciones especiales obtenidas exitosamente",
    });
  } catch (error) {
    console.error("Error en getAllCondicionesEspeciales:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las condiciones especiales",
      error: error.message,
    });
  }
};

const getCondicionEspecial = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const result = await condicionEspecialService.getCondicionEspecial(id);
    res.json({
      success: true,
      data: result[0][0],
    });
  } catch (error) {
    console.error("Error en getCondicionEspecial:", error);
    if (error.message === "Condicion especial no encontrado") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      error: "Error al obtener el condicion especial",
    });
  }
};

const postCondicionEspecial = async (req = request, res = response) => {
  let {
    idPersona,
    discapacidad,
    tipoDiscapacidad,
    subtipoDiscapacidad,
    tieneCondicionSalud,
    condicionSaludId,
  } = req.body;
  try {
    const data = await condicionEspecialService.postCondicionEspecial({
      idPersona,
      discapacidad,
      tipoDiscapacidad,
      subtipoDiscapacidad,
      tieneCondicionSalud,
      condicionSaludId,
    });
    res.status(201).json({
      success: true,
      message: "Condicion especial insertada correctamente",
      data: {
        id: data[0][0].id,
        idPersona,
        discapacidad,
        tipoDiscapacidad,
        subtipoDiscapacidad,
        tieneCondicionSalud,
        condicionSaludId,
      },
    });
  } catch (error) {
    console.error("Error al insertar condicion especial:", error);
    res.status(500).json({
      success: false,
      error: "Error al insertar condicion especial",
    });
  }
};

const deleteCondicionEspecial = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de condicion especial no proporcionado",
    });
  }
  try {
    const data = await condicionEspecialService.deleteCondicionEspecial(id);
    res.json({
      success: true,
      message: `Condicion especial con ID ${id} eliminada correctamente`,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error al eliminar condicion especial:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar condicion especial",
    });
  }
};

const getResumenCondicionesEspeciales = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const data = await condicionEspecialService.getResumenCondicionesEspeciales(id);
    if (!data || !data[0] || data[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron personas con condiciones especiales en este albergue',
            });
        }
        
        res.json({
            success: true,
            data: data[0],
            total: data[0].length
        });
  } catch (error) {
    console.error("Error en getCondicionEspecial:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener la condicion especial",
    });
  }
};

module.exports = {
  getAllCondicionesEspeciales,
  getCondicionEspecial,
  postCondicionEspecial,
  deleteCondicionEspecial,
  getResumenCondicionesEspeciales,
};
