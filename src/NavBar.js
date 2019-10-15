import React, { Component } from 'react'

class NavBar extends Component {

    constructor(){
        super()
        this.state ={
            exibirBars: false
        }
    }

    handleExibirBars=()=>{
        this.setState({ exibirBars : !this.state.exibirBars  });
    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div style={{ marginLeft: '3.6em' }}>
                        <b className="navbar-brand" href="#" onClick={this.handleExibirBars}>
                            <i class="pi pi-bars" style={{ color: '#fff' }}></i>
                        </b>
                    </div>
                </nav>
                <ul className="navbar-menu" hidden={!this.state.exibirBars}>
                    <li className="navbar-title">Locadora</li>
                    <li className="navbar-item"><a href="/filmes">Filmes</a></li>
                    <li className="navbar-item"><a href="/grafico">Gráfico</a></li>
                </ul>
            </div>
        )
    }

}

export default NavBar