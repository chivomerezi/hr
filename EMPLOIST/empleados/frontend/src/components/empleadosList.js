import React, { Component } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'timeago.js'

export default class empleadosList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            empleados: [],
            empleado: {},
            estadoModal: false,

            fechaContratacion: new Date(),
            id: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            email: '',
            telefono: '',
            idJefe: '',
            foto: 'foto por defecto',
            _id: ''

        }
    }

    async componentDidMount() {

        if(this.props.match.params.nombre){
            let newEmpleados = await axios.get('http://localhost:4000/api/empleados/busquedaId/' + this.props.match.params.nombre)
            


            if(newEmpleados.data.length === 0){
                newEmpleados = await axios.get('http://localhost:4000/api/empleados/busquedaNombre/' + this.props.match.params.nombre)

            }
        
            this.setState({empleados:newEmpleados.data})

        }else{
            this.getEmpleados()

        }

    }

    handleModal() {
        this.setState({ estadoModal: !this.state.estadoModal })

    }

    replaceModalItem = async index => {

        this.setState({
            id: index,
            _id: index

        });

        const empleado = await axios.get('http://localhost:4000/api/empleados/' + index)

        this.setState({ empleado: empleado })
        await this.rellarDatosModal()
        this.handleModal()

    }

    rellarDatosModal() {
        this.setState({

            fechaContratacion: new Date(this.state.empleado.data.fechaContratacion),
            id: this.state.empleado.data.id,
            nombre: this.state.empleado.data.nombre,
            apellido1: this.state.empleado.data.apellido1,
            apellido2: this.state.empleado.data.apellido2,
            email: this.state.empleado.data.email,
            telefono: this.state.empleado.data.telefono,
            idJefe: this.state.empleado.data.idJefe,
            foto: 'foto por defecto'

        })

    }

    saveModalDetails = async (e) => {

        e.preventDefault();
        const empleadoActualizado = {

            id: this.state.id,
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,
            telefono: this.state.telefono,
            email: this.state.email,
            foto: this.state.foto,
            idJefe: this.state.idJefe,
            fechaContratacion: this.state.fechaContratacion

        }

        await axios.put('http://localhost:4000/api/empleados/' + this.state._id, empleadoActualizado)

        this.getEmpleados()
        this.handleModal()

    }

    async getEmpleados() {
        const empleados = await axios.get('http://localhost:4000/api/empleados/')
        this.setState({ empleados: empleados.data })


    }


    onClickBorrarEmpleado = async (id) => {

        await axios.delete('http://localhost:4000/api/empleados/' + id)
        this.getEmpleados()

    }


    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })

    }

    onChangeDate = fecha => {
        this.setState({ fechaContratacion: fecha })

    }

    render() {

        return (

            <div className="row">
                {

                    this.state.empleados.map(empleado => (

                        <div className="col-md-4 p-2" key={empleado._id} >
                            <div className="card">

                                <div className="card-header">
                                    <h5>{empleado.nombreCompleto}</h5>

                                </div>

                                <div className="card-body">
                                    <p>{"ID: " + empleado.id}</p>
                                    <p>{"Correo: " + empleado.email}</p>

                                </div>

                                <div className="card-footer d-flex justify-content-between">

                                    <button className="btn btn-danger" onClick={() => this.onClickBorrarEmpleado(empleado._id)}>
                                        Eliminar

                                        </button>

                                    <button className="btn btn-info" onClick={() => this.replaceModalItem(empleado._id)}>
                                        info

                                        </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

                <Modal show={this.state.estadoModal} onHide={() => this.handleModal()}>
                    <Modal.Header closeButton>
                        <h6>Infromacion del Empleado</h6>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="card card-body">
                            <h4>Informacion Editable del Empleado</h4>
                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.id}
                                        name="ID"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.nombre}
                                        name="nombre"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.apellido1}
                                        name="apellido1"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.apellido2}
                                        name="apellido2"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.telefono}
                                        name="telefono"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.email}
                                        name="email"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder={this.state.idJefe}
                                        name="idJefe"
                                        onChange={this.onInputChange}
                                        required

                                    />

                                </div>

                                <div className="from-group">
                                    <DatePicker
                                        className="form-control"
                                        selected={this.state.fechaContratacion}
                                        onChange={this.onChangeDate}

                                    />

                                </div>

                                <br />

                                <div className="from-group">
                                    <p> Tiempo en la empresa: {format(this.state.fechaContratacion)}</p>

                                </div>


                            </form>

                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success" onClick={this.saveModalDetails}>Guardar!</button>
                    </Modal.Footer>

                </Modal>

            </div>
        );

    }
}

export { empleadosList };