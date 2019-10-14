import React, { Component } from 'react';
import './App.css';
import { Button } from '../node_modules/primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const generos = [
  { label: 'Cómedia', value: 0 },
  { label: 'Ação', value: 1 },
  { label: 'Romance', value: 2 },
  { label: 'Drama', value: 3 },
  { label: 'Ficção', value: 4 }
]

const filmes = [
  { titulo: 'O Senhor dos Aneis', diretor: 'Peter jackson', quantidade: 4, genero: 'Aventura' },
  { titulo: 'O Senhor dos Aneis', diretor: 'Peter jackson', quantidade: 4, genero: 'Aventura' },
  { titulo: 'O Senhor dos Aneis', diretor: 'Peter jackson', quantidade: 4, genero: 'Aventura' },
  { titulo: 'O Senhor dos Aneis', diretor: 'Peter jackson', quantidade: 4, genero: 'Aventura' }
]

const initialState = {
  genero: '',
  titulo: '',
  diretor: '',
  quantidade: ''
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeSelect = (e) => {
    this.setState({ genero: e.target.value });
  }
  handleClickSalvar = () => {
    console.log(this.state.genero, this.state.titulo, this.state.diretor)
  }

  handleExcluir = () => {
    console.log('this.state.filmeSelected')
  }

  actionTemplate(rowData, column) {
    return <div className="d-flex">
      <Button type="button" icon="pi pi-trash" className="p-button-secondary" style={{ marginRight: '2px' }} onClick={this.handleExcluir}></Button>
      <Button type="button" icon="pi pi-pencil" className="p-button-secondary"></Button>
    </div>;
  }

  handleRowSelect = (e) => {
    this.setState({ filmeSelected:e.value });
  }

  render() {
    return (
      <div className='container'>

        <h2 style={{ marginBottom: '20px' }}>Novo Filme</h2>
        <span className="p-float-label" style={{ marginBottom: '20px' }}>
          <InputText id="in" value={this.state.titulo} onChange={this.handleChangeField} name="titulo" className="p-inputtext" />
          <label htmlFor="in">Título</label>
        </span>
        <span className="p-float-label" style={{ marginBottom: '20px' }}>
          <InputText id="in" value={this.state.diretor} onChange={this.handleChangeField} name="diretor" className="p-inputtext" />
          <label htmlFor="in">Diretor</label>
        </span>
        <span className="p-float-label" style={{ marginBottom: '20px' }}>
          <InputText keyfilter="int" id="in" value={this.state.quantidade} onChange={this.handleChangeField} name="quantidade" className="p-inputtext" />
          <label htmlFor="in">Quantidade</label>
        </span>
        <Dropdown
          optionLabel="label"
          value={this.state.genero}
          options={generos}
          onChange={this.handleChangeSelect}
          placeholder="Generos"
        />
        <div>
          <Button
            style={{ marginTop: '10px' }}
            label="Salvar"
            icon="pi pi-check"
            iconPos="right"
            onClick={this.handleClickSalvar}
          />
        </div>

        <DataTable header="Filmes" value={filmes} onSelectionChange={this.handleRowSelect} selectionMode="single" selection={this.state.filmeSelected}>
          <Column field="titulo" header="Título" />
          <Column field="diretor" header="Diretor" />
          <Column field="genero" header="Gênero" />
          <Column body={this.actionTemplate} style={{ textAlign: 'center', width: '6em' }} />
        </DataTable>
      </div>
    );

  }
}

export default App;
