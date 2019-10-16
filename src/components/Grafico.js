import React, { Component } from 'react'
import axios from 'axios'
import { Chart } from 'primereact/chart'

class Grafico extends Component {
    constructor() {
        super()
        this.state = {
            generos: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/filmes/copias')
            .then((res) => {
                const foo = res.data.map(x => ({
                    qtdCopias: x[0],
                    genero: x[1]
                }))
                this.setState({ generos: foo })
            })
    }

    render() {
        const data = {
            labels: this.state.generos.map(x => {
                return x.genero
            }),
            datasets: [
                {
                    label: 'Número de cópias',
                    backgroundColor: '#42A5F5',
                    data: this.state.generos.map(x => {
                        return x.qtdCopias
                    })
                }
            ]
        };

        return (
            <div className="d-flex align-items-center flex-column content-section implementation">
                <h3>Quantidade de Filmes por Gênero</h3>
                <Chart type="bar" data={data} className="chart" />
            </div>
        )
    }
}

export default Grafico