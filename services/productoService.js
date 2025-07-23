const productoModel = require('../models/productoModel');

const getAll = async () => {
  const [rows] = await productoModel.selectAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await productoModel.selectById(id);
  if (rows.length === 0) throw new Error('Producto no encontrado');
  return rows[0];
};

const create = async ({ codigoProducto, nombre, descripcion = null, cantidad, categoria = null, unidadMedida = null }) => {
  if (!codigoProducto || !nombre || cantidad == null) throw new Error('Faltan datos obligatorios');
  const [results] = await productoModel.insert([codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida]);
  const id = results[0]?.id;
  return { id, codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida };
};

const update = async ({ id, descripcion, cantidad }) => {
  if (typeof id !== 'number' || typeof descripcion !== 'string' || typeof cantidad !== 'number') {
    throw new Error('Datos inválidos');
  }
  await productoModel.update(id, descripcion, cantidad);
  return { id, descripcion, cantidad };
};

const remove = async (id) => {
  await productoModel.remove(id);
};

module.exports = { getAll, getById, create, update, remove };