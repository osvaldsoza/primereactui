import React, { Component } from 'react'
import { Chart } from 'primereact/chart'

const generos = [
    { genero: 'Cómedia', qunatidade: 65 },
    { genero: 'Ação', qunatidade: 59 },
    { genero: 'Romance', qunatidade: 80 },
    { genero: 'Drama', qunatidade: 81 },
    { genero: 'Ficção', qunatidade: 56 },
    { genero: 'Terror', qunatidade: 40 },
    { genero: 'Aventura', qunatidade: 23 },
    { genero: 'Fantasia', qunatidade: 55 }
]
class Grafico extends Component {
    render() {
        const data = {
            labels: generos.map(x => {
                return x.genero
            }),
            datasets: [
                {
                    label: 'Número de cópias',
                    backgroundColor: '#42A5F5',
                    data: generos.map(x => {
                        return x.qunatidade
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