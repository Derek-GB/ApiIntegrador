const { pool } = require('../MySQL/basedatos');

const selectAll = () => pool.query('CALL pa_SelectAllProducto');
const selectById = (id) => pool.query('CALL pa_SelectProducto(?)', [id]);
const insert = (data) => pool.query('CALL pa_InsertProducto(?, ?, ?, ?, ?, ?)', data);
const update = (id, descripcion, cantidad) => pool.query('CALL pa_UpdateProducto(?, ?, ?)', [id, descripcion, cantidad]);
const remove = (id) => pool.query('CALL pa_DeleteProducto(?)', [id]);

module.exports = { selectAll, selectById, insert, update, remove };