const {Router} = require('express');
const { nuevoEmpleado, getEmpleados, busquedaEmpleadoID, busquedaEmpleadoNombre, empleadoActualizado, empleadoEliminado, getEmpleado} = require('../controllers/empleados.controller');
const router = Router();


router.route('/')
    .get(getEmpleados)
    .post(nuevoEmpleado)

router.route('/:id')
    .delete(empleadoEliminado)
    .put(empleadoActualizado)
    .get(getEmpleado)

router.route('/busquedaId/:id')
    .get(busquedaEmpleadoID)

router.route('/busquedaNombre/:id')
    .get(busquedaEmpleadoNombre)


module.exports = router;