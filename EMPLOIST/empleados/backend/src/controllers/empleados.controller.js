const empleadosCtrl = {};

const Empleado = require('../models/Empleados')



empleadosCtrl.getEmpleado = async (req, res) => {

    const empleado = await Empleado.findById(req.params.id)
    console.log("GET empleado: " + empleado)
    res.json(empleado)


}

// Funcion para ver todos los empleados ne la base de datos
empleadosCtrl.getEmpleados = async (req, res) => {

   const empleados = await Empleado.find();

   console.log('GET Todos los empleados: ' + empleados);
   res.json(empleados);

};

// Funcion para buscar un empleado por ID
empleadosCtrl.busquedaEmpleadoID = async (req, res) => {

    const empleado = await Empleado.findOne({'id': req.params.id});
    
    console.log({message :'GET Empleado por busqueda: ' + req.params.id});

    if(empleado === null){
        res.json([])

    }else{
        res.json([empleado]);

    }

    

};

// Funcion para buscar empleados por el mismo nombre
empleadosCtrl.busquedaEmpleadoNombre = async (req, res) => {
    
    const empleados = await Empleado.find({nombreCompleto: { $regex : req.params.id }});
    
    console.log({message :'GET Empleado por Nombre: ' + req.params.id});
    res.json(empleados);

};

// Funcion para crear las un nuevo empleado
empleadosCtrl.nuevoEmpleado = async (req, res) => {
    
    const { id, nombre, apellido1, apellido2, telefono, email, foto, idJefe, fechaContratacion } = req.body;

    const nuevoEmpleado = new Empleado({

        id: id,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        telefono: telefono,
        email: email,
        foto: foto,
        idJefe: idJefe,
        nombreCompleto: nombre + " " + apellido1 + " " +  apellido2,
        fechaContratacion: fechaContratacion

    });
    
    await nuevoEmpleado.save();

    console.log(nuevoEmpleado);
    res.json({message :'\n POST Nuevo empleado!'});

};

// Funcion para actualizar un nuevo empleado
empleadosCtrl.empleadoActualizado = async (req, res) => {
    
    const { id, nombre, apellido1, apellido2, telefono, email, foto, idJefe, fechaContratacion } = req.body;

    await Empleado.findByIdAndUpdate(req.params.id, {

        id: id,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        telefono: telefono,
        email: email,
        foto: foto,
        idJefe: idJefe,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        fechaContratacion: fechaContratacion

    });
     
    res.json({message :'PUT Empleado Actualizado'});

};

// Funcion para eliminar un empleado
empleadosCtrl.empleadoEliminado = async (req, res) => {

    await Empleado.findByIdAndDelete(req.params.id);

    res.json({message :'DELETE Empleado Eliminado'});

};

module.exports = empleadosCtrl;