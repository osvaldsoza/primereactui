import React, {useState} from 'react'

const NavBar = () => {

    const {exibirBars,setExibirBars} = useState(false)

    return (
        <div>
            <nav className="navbar">
                <div style={{ marginLeft: '3.6em' }}>
                    <a className="navbar-brand" href="javascript:;" onClick={() => setExibirBars(!exibirBars)}>
                        <i class="pi pi-bars" style={{ color: '#fff' }}></i>
                    </a>
                </div>
            </nav>
            <ul className="navbar-menu" hidden={!exibirBars}>
                <li className="navbar-title">Locadora</li>
                <li className="navbar-item"><a href="#">Filmes</a></li>
                <li className="navbar-item"><a href="#">Gráfico</a></li>
            </ul>
        </div>
    )
}

export default NavBar