const productoService = require('../services/productoService.js');

const getAllMethod = async (req, res) => {
  try {
    const data = await productoService.getAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getMethod = async (req, res) => {
  try {
    const data = await productoService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const postMethod = async (req, res) => {
  try {
    const data = await productoService.create(req.body);
    res.status(201).json({ success: true, message: 'Producto insertado', data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const putMethod = async (req, res) => {
  try {
    const data = await productoService.update(req.body);
    res.json({ success: true, message: 'Producto actualizado', data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteMethod = async (req, res) => {
  try {
    await productoService.remove(Number(req.params.id));
    res.json({ success: true, message: `Producto con ID ${req.params.id} eliminado` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAllMethod, getMethod, postMethod, putMethod, deleteMethod };