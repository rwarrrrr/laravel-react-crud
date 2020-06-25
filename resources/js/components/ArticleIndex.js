import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class ArticleIndex extends Component{
    constructor () {
        super()
        this.state = {
        //ini buat nampung api/json data tabel
            articles: [],
            msg: null,
        //ga penting            
            type: null,
            flash:false,
        //alert    
            alert: null,
        }
    }
 
    hideAlert() {
        this.setState({
            alert: null
        });
    }
 
    //nah ini componentDidMount jadi harus ngejalanin / langsung ngejalanin yg ada di dalemnya
    //ada juga componentWillMount kalo ini akan ngejalanin
    //itu mount ada juga Unmount tinggal ganti aja yg mount fungsinya buat setelah melakukan atau jika kosong
    componentDidMount () {
        //ini pasti paham
        axios.get('/api/articles').then(response => {
            //ini buat setState articel yg ada di atas yg aray di isi sama json
            this.setState({
                articles: response.data
            })
        })  
    }
    
    ///ini delete sama kaya pas di tambah
    //liat cara passing datanya ada dibawah di tag link
    confirmDelete(id){
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Hapus Deh"
                cancelBtnText="Nggak Jadi"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Tunggu ..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
                >
                Kalau udah dihapus, nggak bakal balik lagi.
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    deleteItem(id) {
        axios.delete(`/api/article/delete/${id}`).then(response => {
            var msg = response.data.success;
            if(msg == true){
                this.hideAlert();
                this.goToHome();
            }
        })
    }
 
    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
                >
                Deleted article successfully
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }
/// ini buat di tampilan
	render(){
    ///ini buat manggil state biar lebih pendek    
		const { articles } = this.state
		return(
<div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
              
                <div className='card'>
                  <div className='card-header'>All Article</div>
                  <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                      Create new article
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="50" className="text-center">No</th>
                                    <th>Title</th>
                                    <th width="200" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            ///ini buat nampilin data
                            ///articles itu state yg tadi terus .map itu buat nampilin data
                            ///yg di dalam map yg article itu cuman buat nama variabel kaya @foreach($... as $variabel)
                            ///yg i buat id sebenernya bisa pake article juga
                                {articles.map((article, i) => (
                                <tr key={i}>
                                    <td width="50" className="text-center">{i + 1}</td>
                                    ///nih article nama field sama kaya $variabel->title
                                    <td>{article.title}</td>
                                    <td width="200" className="text-center">
                                        <div className="btn-group">
                                        <Link
                                            className='btn btn-primary'
                                            to={`/article/${article.id}`}
                                            >Detail
                                        </Link>
                                        <Link
                                            className='btn btn-success'
                                            to={`/article/edit/${article.id}`}
                                            >Edit
                                        </Link>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => this.confirmDelete(article.id)}
                                            >Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        ////ini buat manggil alert
                        {this.state.alert}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
		);
	}
}