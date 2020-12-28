import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class newEmpleado extends Component {

    state = {
        fecha: new Date(),
        ID: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        telefono: '',
        idJefe: '',
        foto:'foto por defecto'
        
    }

    async componentDidMount() {




    }

     onSubmit = async (e) =>  {


        e.preventDefault();

        const nuevoEmpleado = {
            id: this.state.ID,
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,
            telefono: this.state.telefono,
            email: this.state.email,
            foto: this.state.foto,
            idJefe: this.state.idJefe,
            fechaContratacion: this.state.fecha

        }
        
       const empleado = await axios.post('http://localhost:4000/api/empleados/', nuevoEmpleado)
       console.log(empleado)
       window.location.href = "/"

        

    }

    onInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value

        })

    }

    onChangeDate = fecha => {
        this.setState({fecha})

    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Añadir Empleado Nuevo!</h4>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="ID"
                                name="ID"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>
                        
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="nombre"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder= "Primer apellido"
                                name="apellido1"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder= "Segundo apellido"
                                name="apellido2"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder= "Numero Telefonico"
                                name="telefono"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder= "Correo Electronico"
                                name="email"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder= "ID Manager"
                                name="idJefe"
                                onChange={this.onInputChange}
                                required

                            />

                        </div>

                        <div className="from-group">
                            <DatePicker
                            className = "form-control"
                            selected={this.state.fecha}
                            onChange={this.onChangeDate}

                            
                            />

                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">
                            Añadir

                        </button>

                    </form>


                </div>



            </div>
        )
    }
}
