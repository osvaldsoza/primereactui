import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Message } from 'primereact/message';

class Filmes extends Component {
  constructor() {
    super();
    this.state = {
      genero: '',
      filmes:[]
    }
  }

  componentDidMount() {
    this.handleGetFilmes();
  }

  handleGetFilmes = () => {
    axios.get('https://megasul-filmes-api.herokuapp.com/filmes')
      .then((res) => {
        this.setState({ filmes: res.data })
      })
  }

  handleClickMergeFilme = () => {
    axios.post('https://megasul-filmes-api.herokuapp.com/filmes', this.state.filme)
      .then((res) => {
        this.handleGetFilmes()
      })
    this.setState({ selectedfilme: null, filme: '', displayFormFilme: false })
  }

  handleClickExcluirFilme = () => {
    let id = this.state.selectedfilme.id

    axios.delete(`https://megasul-filmes-api.herokuapp.com/filmes/${id}`)
      .then((res) => {
        this.handleGetFilmes()
      }).catch(error => console.log(error))

    this.setState({
      selectedfilme: null,
      filme: null,
      displayFormFilme: false
    })
  }

  handleOnChangeField = (property, value) => {
    let filme = this.state.filme;
    filme[property] = typeof value === 'object' ? value.label : value;
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
      filme: { titulo: '', diretor: '', qtdCopias: '', genero: '' },
      displayFormFilme: true
    })
  }

  handleOnSelectionChange = (e) => this.setState({ selectedfilme: e.value, genero: e.value.genero })

  render() {
    let btnNovoFilme = <div className="p-clearfix" style={{ width: '100%' }}>
      <Button
        style={{ float: 'left' }}
        label="Novo Filme"
        icon="pi pi-plus"
        onClick={this.handleClickNovoFilme}
      />
    </div>

    let corButton = this.ehNovoFilme ? "p-button-success" : "p-button-warning"
    let actionsButtons = <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Excluir"
        icon="pi pi-times"
        disabled={this.ehNovoFilme}
        onClick={this.handleClickExcluirFilme}
        className="p-button-danger p-button-raised p-button-rounded"
      />
      <Button
        label={this.ehNovoFilme ? "Salvar" : "Atualizar"}
        icon="pi pi-check"
        onClick={this.handleClickMergeFilme}
        disabled={this.ehNovoFilme && (this.state.filme.titulo === '' || 
        this.state.filme.diretor  === '' || 
        this.state.filme.qtdCopias === '' || this.state.filme.genero === '')}
        className={`${corButton} p-button-raised p-button-rounded`}
      />
    </div>

    return (
      <div className='container'>
        <div className="content-section implementation">
          <DataTable
            value={this.state.filmes}
            paginator={true}
            rows={6}
            responsive={true}
            header={this.state.filmes.length > 0 ? "Filmes" : "Não há registros para serem exibidos"}
            footer={btnNovoFilme}
            selectionMode="single"
            selection={this.state.selectedfilme}
            onSelectionChange={this.handleOnSelectionChange}
            onRowSelect={this.handleFilmeSelected}>
            <Column field="titulo" header="Título" />
            <Column field="diretor" header="Diretor" />
            <Column field="qtdCopias" header="Número de Cópias" />
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
                <div className="p-col-3" style={{ padding: '.75em' }}><label htmlFor="titulo">Titulo</label></div>
                <div className="d-flex p-col-9" style={{ padding: '.5em' }}>
                  <InputText id="titulo" className="p-error" onChange={(e) => { this.handleOnChangeField('titulo', e.target.value) }} value={this.state.filme.titulo} name="titulo" />
                  {
                    this.state.filme.titulo === '' &&
                    <Message severity="error" text="Campo obrigatório" style={{width:'20em'}} />
                  }
                </div>

                <div className="p-col-3" style={{ padding: '.75em' }}><label htmlFor="diretor">Diretor</label></div>
                <div className="d-flex p-col-9" style={{ padding: '.5em' }}>
                  <InputText id="diretor" className="p-error" onChange={(e) => { this.handleOnChangeField('diretor', e.target.value) }} value={this.state.filme.diretor} name="diretor" />
                  {
                    this.state.filme.diretor === '' &&
                    <Message severity="error" text="Campo obrigatório" style={{width:'20em'}} />
                  }
                </div>

                <div className="p-col-3" style={{ padding: '.75em' }}><label htmlFor="qtdCopias">Número de Cópias</label></div>
                <div className="d-flex p-col-9" style={{ padding: '.5em' }}>
                  <InputText keyfilter="int" className="p-error" id="qtdCopias" onChange={(e) => { this.handleOnChangeField('qtdCopias', e.target.value) }} value={this.state.filme.qtdCopias} name="qtdCopias" />
                  {
                    this.state.filme.qtdCopias === '' &&
                    <Message severity="error" text="Campo obrigatório" style={{width:'20em'}} />
                  }
                </div>

                <div className="p-col-3" style={{ padding: '.75em' }}><label htmlFor="genero">Genero</label></div>
                <div className="d-flex p-col-9" style={{ padding: '.5em' }}>
                  <InputText id="genero" className="p-error" onChange={(e) => { this.handleOnChangeField('genero', e.target.value) }} value={this.state.filme.genero} name="genero" />
                  {
                    this.state.filme.titulo === '' &&
                    <Message severity="error" text="Campo obrigatório" style={{width:'20em'}} />
                  }
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
