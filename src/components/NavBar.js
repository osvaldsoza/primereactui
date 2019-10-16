import React, { Component } from 'react'
import Grafico from './Grafico'
import Filmes from './Filmes';


import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class NavBar extends Component {

    constructor() {
        super()
        this.state = {
            exibirBars: false,
            clicouFilmes: false
        }
    }

    handleExibirBars = () => {
        this.setState({ exibirBars: !this.state.exibirBars });
    }

    handleEsconderBars = () => {
        this.setState({ exibirBars: !this.state.exibirBars });
    }

    render() {
        return (
            <Router>
                <nav className="navbar">
                    <div style={{ marginLeft: '3.6em' }}>
                        <b className="navbar-brand" onClick={this.handleExibirBars}>
                            <i class="pi pi-bars" style={{ color: '#fff' }}></i>
                        </b>
                    </div>
                </nav>
                <ul className="navbar-menu" hidden={!this.state.exibirBars}>
                    <li className="navbar-title">Locadora</li>
                    <li className="navbar-item"><Link to="/filmes" onClick={this.handleEsconderBars}>CRUD Filmes</Link></li>
                    <li className="navbar-item"><Link to="/" onClick={this.handleEsconderBars}>Exibir Gráfico</Link></li>
                </ul>

                <Route exact path="/">
                    <Grafico />
                </Route>
                <Route path="/filmes">
                    <Filmes />
                </Route>
            </Router>
        )
    }

}

export default NavBar