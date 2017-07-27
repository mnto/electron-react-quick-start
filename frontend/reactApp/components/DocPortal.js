import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';
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

  openNav() {
    var width = document.getElementById("portal").offsetWidth;
    var margin = ((width - 250) * 0.075 + 250).toString() + 'px';
    console.log('OPEN MARGIN', margin);
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = margin;
    document.getElementById("main").style.marginRight = margin;
    document.getElementById("sideBtn").style.zIndex = "-1";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    var width = document.getElementById("portal").offsetWidth;
    var margin = (width * 0.075).toString() + 'px';
    console.log('CLOSE MARGIN', margin);
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = margin;
    document.getElementById("main").style.marginRight = margin;
    document.getElementById("sideBtn").style.zIndex = "1";
  }

  render(){
    return(
      <div id="portal">
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
        <div className="navbar">
          <button id="sideBtn" className="waves-effect waves-light btn" onClick={this.openNav}>
            <i className="material-icons left">menu</i>
          </button>
        </div>
          {/* <div className="navbar-fixed"> */}
             {/* <nav>
               <div className="nav-wrapper">
                 <a href="#!" className="brand-logo">Logo</a>
               </div> */}

             {/* </nav> */}
          {/* <button onClick={(e) => this.logout(e)}
            className="waves-effect waves-light btn col s2 offset-s10">
            <i className="material-icons right">directions_run</i>Logout
          </button> */}
        {/* </div> */}
        <div id="main" className="container">
          <div className="row">
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
      </div>
    );
  }
}

export default DocPortal;
