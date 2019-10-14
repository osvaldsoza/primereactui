import React, { Component } from 'react';
import './App.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';


const generos = [
  { label: 'Cómedia', value: 0 },
  { label: 'Ação', value: 1 },
  { label: 'Romance', value: 2 },
  { label: 'Drama', value: 3 },
  { label: 'Ficção', value: 4 }
]

const filmes = [
  { titulo: 'O Senhor dos Aneis', diretor: 'Peter jackson', quantidade: 4, genero: 'Aventura' },
  { titulo: 'fgfgfgfg', diretor: 'Peter jackson', quantidade: 4, genero: 'Comedia' },
  { titulo: 'çlçllçllçlçl', diretor: 'Peter jackson', quantidade: 4, genero: 'Suspense' },
  { titulo: 'gflç90yutty', diretor: 'Peter jackson', quantidade: 4, genero: 'Comedia' }
]

const initialState = {
  genero: '',
  titulo: '',
  diretor: '',
  quantidade: '',
  novoFilme: false
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

  handleClickNovo = () => {
    this.setState({ novoFilme: true });
  }

  handleExcluir = () => {
    console.log(this.state.filmeSelected)
  }

  actionTemplate() {
    return <div className="d-flex">
      <Button type="button" icon="pi pi-trash" className="p-button-secondary" style={{ marginRight: '.5em' }} onClick={this.handleExcluir}></Button>
      <Button type="button" icon="pi pi-pencil" className="p-button-secondary"></Button>
    </div>;
  }

  render() {
    return (
      <div className='container'>
        {
          this.state.novoFilme ?
            <div>
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
              <hr />
            </div>
            :
            ''
        }
        <DataTable
          header="Filmes"
          paginator="true"
          responsive="true"
          rows="10"
          value={filmes}
          selectionMode="single"
          selection={this.state.filmeSelected}
          onSelectionChange={e => this.setState({ filmeSelected: e.value })}
        >
          <Column field="titulo" header="Título" />
          <Column field="diretor" header="Diretor" />
          <Column field="genero" header="Gênero"  sortable={true}/>
          <Column body={this.actionTemplate} style={{ textAlign: 'center', width: '7em' }} />
        </DataTable>

        <Button
          style={{ marginTop: '10px' }}
          label="Novo Filme"
          icon="pi pi-check"
          iconPos="right"
          hidden={this.state.novoFilme}
          onClick={this.handleClickNovo}
        />
      </div>
    );

  }
}

export default App;
