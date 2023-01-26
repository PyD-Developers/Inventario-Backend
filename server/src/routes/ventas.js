const { Router } = require('express');
const { Productos, Insumos } = require('../db');

const router = Router();

//.........................................................................................//
// PUT /ventas
router.put('/', async (req, res) => {
	try {
		let edit = req.body;
		console.log(edit, 'edit');
		edit.map(async (element) => {
			if (element !== null) {
				let prod = await Productos.findByPk(element.id);
				console.log(prod, 'prod');
				console.log(element, 'element');

				await prod.update({
					...prod,
					stock: Number(prod.stock) - Number(element.stock)
				});
			}
		});
		return res.status(200).send('Venta realizada con exito');
	} catch (error) {
		console.log('ERROR EN RUTA PUT VENTAS');
	}
});

module.exports = router;
