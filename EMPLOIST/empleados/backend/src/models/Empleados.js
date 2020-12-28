const {Schema, model} = require('mongoose');

const empleadoSchema = new Schema({

    id: {

        type: String,
        require: true,
        unique: true

    },

    nombre: {

        type: String,
        require: true,

    },

    apellido1: {

        type: String,
        require: true,

    },

    apellido2: {

        type: String,
        require: true,

    },

    nombreCompleto: String,

    telefono: {

        type: String,
        require: true,
        unique: true

    },

    email: {

        type: String,
        require: true,
        unique: true

    },

    foto: {

        type: String,
        require: true

    },

    idJefe: {

        type: String,
        require: true

    },

    fechaContratacion: {

        type: Date,
        require: true

    }

},{
    timestamps: true

})

module.exports = model('Empleados', empleadoSchema);