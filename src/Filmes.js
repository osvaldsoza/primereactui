import React, { Component } from 'react'
import './App.css'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'


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

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.setState({ filmes })
  }

  handleClickMergeFilme = () => {
    let filmes = [...this.state.filmes]
    if (this.ehNovoFilme)
      filmes.push(this.state.filme)
    else
      filmes[this.findSelectedfilmeIndex()] = this.state.filme

    this.setState({ filmes: filmes, selectedfilme: null, filme: null, displayFormFilme: false })
  }

  handleClickExcluirFilme = () => {
    let index = this.findSelectedfilmeIndex();
    this.setState({
      filmes: this.state.filmes.filter((val, i) => i !== index),
      selectedfilme: null,
      filme: null,
      displayFormFilme: false
    })
  }

  findSelectedfilmeIndex() {
    return this.state.filmes.indexOf(this.state.selectedfilme);
  }

  handleOnChangeField(property, value) {
    let filme = this.state.filme;
    filme[property] = value;
    this.setState({ filme: filme })
  }

  handleFilmeSelected = (e) => {
    this.ehNovoFilme = false;
    this.setState({
      displayFormFilme: true,
      filme: Object.assign({}, e.data)
    })
  }

  handleClickNovoFilme = () => {
    this.ehNovoFilme = true;
    this.setState({
      filme: { titulo: '', diretor: '', quantidade: '', descricao: '' },
      displayFormFilme: true
    })
  }

  handleOnSelectionChange = (e) => this.setState({ selectedfilme: e.value })

  render() {

    let btnNovoFilme = <div className="p-clearfix" style={{ width: '100%' }}>
      <Button style={{ float: 'left' }} label="Novo Filme" icon="pi pi-plus" onClick={this.handleClickNovoFilme} />
    </div>

    let actionsButtons = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Excluir" icon="pi pi-times" onClick={this.handleClickExcluirFilme} />
      <Button label={this.ehNovoFilme ? "Salvar" : "Atualizar"} icon="pi pi-check" onClick={this.handleClickMergeFilme} />
    </div>

    return (
      <div className='container'>
        <div className="content-section implementation">
          <DataTable
            value={this.state.filmes}
            paginator={true}
            rows={15}
            responsive={true}
            header="CRUD Filmes"
            footer={btnNovoFilme}
            selectionMode="single" selection={this.state.selectedfilme}
            onSelectionChange={this.handleOnSelectionChange}
            onRowSelect={this.handleFilmeSelected}>
            <Column field="titulo" header="Título" />
            <Column field="diretor" header="Diretor" />
            <Column field="quantidade" header="Quantidade" />
            <Column field="genero" header="Gênero" sortable={true} />
          </DataTable>

          <Dialog
            visible={this.state.displayFormFilme}
            width="300px"
            header="Detalhes do Filme"
            modal={true}
            footer={actionsButtons}
            onHide={() => this.setState({ displayFormFilme: false })}>
            {
              this.state.filme &&

              <div className="p-grid p-fluid">
                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="titulo">Titulo</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id="titulo" onChange={(e) => { this.handleOnChangeField('titulo', e.target.value) }} value={this.state.filme.titulo} />
                </div>

                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="diretor">Diretor</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id="diretor" onChange={(e) => { this.handleOnChangeField('diretor', e.target.value) }} value={this.state.filme.diretor} />
                </div>

                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="quantidade">Quantidade</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id="quantidade" onChange={(e) => { this.handleOnChangeField('quantidade', e.target.value) }} value={this.state.filme.quantidade} />
                </div>

                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="genero">Genero</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id="genero" onChange={(e) => { this.handleOnChangeField('genero', e.target.value) }} value={this.state.filme.genero} />
                </div>
              </div>
            }
          </Dialog>
        </div>
      </div>
    )
  }
}

export default App
