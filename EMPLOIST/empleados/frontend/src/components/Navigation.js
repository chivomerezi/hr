import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdown: "none",
            busqueda:''

        }
    }

    onInputChange = e => {

        this.setState({
            [e.target.name]: e.target.value 
        })
        
        console.log(e.target.value)

    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Empleados HR
                    </Link>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="navbar-brand" to="/crearEmpleado">
                                    Agregar Empleado
                                </Link>

                            </li>
                            

                        </ul>

                        <form className="d-flex">

                            <input className="form-control me-2" 
                                type="search" 
                                placeholder="Buscar" 
                                name="busqueda"
                                onChange={this.onInputChange}
                                value={this.state.busqueda}
                                >

                            </input>

                        </form>

                        <div>
                        <a className="btn btn-outline-success my-2 my-sm-0 ml-3" href={"http://localhost:3000/buscar/" + this.state.busqueda} type="submit" >Buscar</a>

                        </div>
                        


                    </div>
                </div>
            </nav>

        )
    }
}
