import React, { Component } from 'react'
///yg dibawah urang udah install lewat cmd urang lupa kata katanya pokoknya ada axios semacam guzzle
///terus kalo perlu dipanggil kaya dibawah
import axios from 'axios'
///yg dibawah urang udah install lewat cmd urang lupa kata katanya pokoknya ada react-router-dom
///terus kalo perlu dipanggil kaya dibawah
//kalo di html pake tag a buat kalo disini pake link link
import { Link } from 'react-router-dom'
///yg dibawah urang udah install lewat cmd urang lupa kata katanya pokoknya ada react-bootstrap-sweetalert
///terus kalo perlu dipanggil kaya dibawah
import SweetAlert from 'react-bootstrap-sweetalert';
 
export default class ArticleCreate extends Component {
     
    constructor (props) {
        super(props)
        this.state = {
          //ini buat nampung value yg udah di input di tag input
            title: '',
            content: '',
          //ini buat alert doang  
            alert: null,
          //ini bisi ada error  
            errors: []
        }
        //ini buat manggil classnya atau semacamnya
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
    
    ///nah ini buat di tag input misal udah di ketik nanti di ambil valuenya
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    ///ini  buat nanti kalo berhasil berhasil horew anjing
    goToHome(){
      ///biar bagus pake sweet biar manis bisa liat google kalo mau custom sweetalert react
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                ///nah ini kalo berhasil/mijit confrim nanti ke class onSucces
                onConfirm={() => this.onSuccess() }
                //kalo ga jadi ngejalanin class hidealert
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
                >
                Created article successfully
            </SweetAlert>
        );
        ///nah ini buat yg di state alert tadikan alertnya null ku urang masukin getalert
        this.setState({
            alert: getAlert()
        });
    }
 
    //ini class onSucces
    onSuccess() {
    //ini buat pindah route  
        this.props.history.push('/');
    }
    
    //ini class hideALert
    hideAlert() {
        this.setState({
            alert: null
        });
    }
    
    //ini buat tambah data
    handleCreateNewArticle (event) {
    //jangan lupa prevent...  
        event.preventDefault()
    ///nah ini yg dibawah teh ngaset title anu di state ku anu tadi di input    
        const article = {
          title: this.state.title,
          content: this.state.content
        }
    ///nah ini buat pasti paham    
        axios.post('/api/article/store', article).then(response => { 
            var msg = response.data.success;
            if(msg == true){
                return this.goToHome();
            }
        })
    }
 

  /// ini bisi error urang ini liat gugel tapi gajalan pinter pinter weh
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }
 
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
            <span className='invalid-feedback'>
                <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }
 
    render () {
        return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Create new project</div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewArticle}>
                      <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input
                          id='title'
                          type='text'
                          className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                          name='title'
                          value={this.state.title}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('title')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content'>Project content</label>
                        <textarea
                          id='content'
                          className={`form-control ${this.hasErrorFor('content') ? 'is-invalid' : ''}`}
                          name='content'
                          rows='10'
                          value={this.state.content}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('content')}
                      </div>
                      <Link
                        className='btn btn-secondary'
                        to={`/`}
                        >Back
                      </Link>
                      &nbsp;
                      &nbsp;
                      <button className='btn btn-primary'>Create</button>
                      {this.state.alert}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}