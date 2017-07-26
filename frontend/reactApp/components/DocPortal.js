import React from 'react';
import axios from 'axios';
import { Button, Icon } from 'react-materialize';
import  NewDocModal from './NewDocModal';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesheets/docPortal.scss';

class DocPortal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: '',
      ownDocs: [],
      collabDocs: [],
      shareDocId: '',
      shareDocPwd: ''
    };
  }

  logout(e) {
    e.preventDefault();
    axios.get('http://localhost:3000/logout')
    .then((resp) => {
      console.log('logging out');
      this.props.history.push('/');
    })
    .catch((err) =>{
      console.log('error logging out', err);
    });
  }
  handleIdChange(e){
    this.setState({
      shareDocId: e.target.value
    });
  }

  handlePwdChange(e){
    this.setState({
      shareDocPwd: e.target.value
    });
  }

  handleIdSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:3000/docs/add-collab', {
      userId: this.state.userId,
      docPwd: this.state.shareDocPwd,
      docId: this.state.shareDocId
    })
    .then((response) => {
      const ownDocs = response.data.ownDocs;
      const collabDocs = response.data.collaborating;
      this.setState({
        ownDocs,
        collabDocs,
        shareDocId: '',
        shareDocPwd: ''
      });
    })
    .catch((err) => {
      console.log("ERROR IN UPDATING STATE IN ID SUBMIT", err);
    });
  }

  componentDidMount(){
    axios.get('http://localhost:3000/userID')
    .then((resp) => {
      this.setState({userId: resp.data.id});
      axios.get('http://localhost:3000/user/' + this.state.userId)
      .then((response) => {
        const ownDocs = response.data.ownDocs;
        const collabDocs = response.data.collaborating;
        this.setState({
          ownDocs,
          collabDocs
        });
        console.log("DOC PORTAL STATE", this.state);
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log("ERROR in loading", err);
    });
  }

  render(){
    return(
      <div className="container docPortal">
        <div className="row">
          <button onClick={(e) => this.logout(e)}
            className="waves-effect waves-light btn col s2 offset-s10">
            <i className="material-icons right">directions_run</i>Logout
          </button>
        </div>
        <div>
          <h4>Your documents</h4>
          <ul>
            {this.state.ownDocs.map(
              (doc) => {
                return <li key={doc._id}><Link to={`/docs/${doc._id}`}><Button floating large waves='light' icon='insert_drive_file' /></Link>{doc.title}</li>;
              }
            )}
          </ul>
        </div>
        <div>
          <h4>Collaborating documents</h4>
          <ul>
            {this.state.collabDocs.map(
              (doc) => {
                return <li key={doc._id}><Link to={`/docs/${doc._id}`}><Button floating large waves='light' icon='insert_drive_file' /></Link>{doc.title}</li>;
              }
            )}
          </ul>
        </div>
        <div className="container">
          <form onSubmit={(e) => this.handleIdSubmit(e) }>
            <div className="row">
              <div className="input-field">
                <input id="docId" type="text" className="validate" onChange={ (e) => { this.handleIdChange(e); }} value={this.state.shareDocId}/>
                <label htmlFor="docId">Shareable Document Id</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <input id="idPwd" type="text" className="validate" onChange={ (e) => { this.handlePwdChange(e); }} value={this.state.shareDocPwd}/>
                <label htmlFor="idPwd">Document Password</label>
              </div>
            </div>
            <button type="submit" className="btn waves-effect waves-light">Collaborate!</button>
          </form>
        </div>
        <NewDocModal id={this.state.userId} history={this.props.history}/>
      </div>
    );
  }
}

export default DocPortal;
