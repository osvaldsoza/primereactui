import React, { Component } from 'react'
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
  { label: 'Ficção Científica', value: 4 },
  { label: 'Terror', value: 5 },
  { label: 'Aventura', value: 6 },
  { label: 'Fantasia', value: 7 },
]

const filmes = [
  { titulo: 'O Senhor dos Aneis', diretor: 'Peter jackson', quantidade: 14, genero: 'Aventura' },
  { titulo: 'Vingadores:Ultimato', diretor: 'Anthony Russo e Joe Russo', quantidade: 10, genero: 'Fantasia' },
  { titulo: 'It: A Coisa', diretor: 'Andy Muschietti', quantidade: 5, genero: 'Terror' },
  { titulo: 'John Wick 3: Parabellum', diretor: 'Chad Stahelski', quantidade: 8, genero: 'Ação' },
  { titulo: 'Rambo: Até o Fim', diretor: 'Adrian Grunberg', quantidade: 6, genero: 'Ação' },
  { titulo: 'Velozes e Furiosos: Hobbs & Shaw', diretor: 'David Leitch', quantidade: 18, genero: 'Ação' },
  { titulo: 'Star Wars: A Guerra dos Clones', diretor: ' Chad Stahelski', quantidade: 28, genero: 'Ficção Científica' },
  { titulo: 'Pense como Eles', diretor: 'Tim Story', quantidade: 10, genero: 'Comédia' },
  { titulo: 'Policial em Apuros', diretor: 'Tim Story', quantidade: 3, genero: 'Comédia' },
  { titulo: 'The Perfect Match', diretor: 'Bille Woodruff', quantidade: 2, genero: 'Romance' }
]

class Filmes extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.setState({ filmes })
  }

  handleClickMergeFilme = () => {
    let filmes = [...this.state.filmes]
    if (this.ehNovoFilme) {
      filmes.push(this.state.filme)
    } else {
      filmes[this.findSelectedfilmeIndex()] = this.state.filme
    }
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

  handleOnChangeField = (property, value) => {
    let filme = this.state.filme;
    filme[property] = value;
    this.setState({ filme })
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
      filme: { titulo: '', diretor: '', quantidade: '', genero: '' },
      displayFormFilme: true
    })
  }

  handleOnSelectionChange = (e) => this.setState({ selectedfilme: e.value })

  handleChangeSelect = (e) => {
    this.setState({ genero: e.target.value });
  }

  render() {

    let btnNovoFilme = <div className="p-clearfix" style={{ width: '100%' }}>
      <Button style={{ float: 'left' }} label="Novo Filme" icon="pi pi-plus" onClick={this.handleClickNovoFilme} />
    </div>

    let actionsButtons = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Excluir" icon="pi pi-times" onClick={this.handleClickExcluirFilme} className="p-button-danger p-button-raised p-button-rounded" />
      <Button label={this.ehNovoFilme ? "Salvar" : "Atualizar"} icon="pi pi-check" onClick={this.handleClickMergeFilme} className="p-button-warning p-button-raised p-button-rounded" />
    </div>

    return (
      <div className='container'>
        <div className="content-section implementation">
          <DataTable
            value={this.state.filmes}
            paginator={true}
            rows={15}
            responsive={true}
            header="Filmes"
            footer={btnNovoFilme}
            selectionMode="single" selection={this.state.selectedfilme}
            onSelectionChange={this.handleOnSelectionChange}
            onRowSelect={this.handleFilmeSelected}>
            <Column field="titulo" header="Título" />
            <Column field="diretor" header="Diretor" />
            <Column field="quantidade" header="Cópias" />
            <Column field="genero" header="Gênero" sortable={true} />
          </DataTable>

          <Dialog
            visible={this.state.displayFormFilme}
            width="300px"
            header="Filme"
            modal={true}
            footer={actionsButtons}
            onHide={() => this.setState({ displayFormFilme: false })}>
            {
              this.state.filme &&

              <div className="p-grid p-fluid">
                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="titulo">Titulo</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id="titulo" onChange={(e) => { this.handleOnChangeField('titulo', e.target.value) }} value={this.state.filme.titulo} name="titulo" />
                </div>

                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="diretor">Diretor</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id="diretor" onChange={(e) => { this.handleOnChangeField('diretor', e.target.value) }} value={this.state.filme.diretor} name="diretor" />
                </div>

                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="quantidade">Quantidade</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText keyfilter="int" id="quantidade" onChange={(e) => { this.handleOnChangeField('quantidade', e.target.value) }} value={this.state.filme.quantidade} name="quantidade" />
                </div>

                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="genero">Genero</label></div>
                <div className="p-col-8" style={{ padding: '.5em' }}>
                  <Dropdown
                    id="value"
                    optionLabel="label"
                    value={this.state.filme.genero}
                    options={generos}
                    onChange={(e) => { this.handleOnChangeField('label', e.target.value) }}
                  />
                </div>
              </div>
            }
          </Dialog>
        </div>
      </div>
    )
  }
}

export default Filmes
