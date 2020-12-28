import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import Empleados, { empleadosList } from './components/empleadosList'
import NewEmpleado from './components/newEmpleado'

function App() {
  return (
    <Router>
      <Navigation />

      <div className="container p-4">

        <Route path='/' exact component={Empleados} />
        <Route path='/crearEmpleado' component={NewEmpleado} />
        <Route path='/editarEmpleado/:id' component={NewEmpleado} />
        <Route path='/buscar/:nombre' component={empleadosList} />


      </div>



    </Router>
  );
}

export default App;
