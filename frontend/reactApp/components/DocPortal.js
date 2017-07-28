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
    document.body.style.backgroundColor = "white";
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
      //console.log('trying to collaborate', response);
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
        axios.get('http://localhost:3000/users/' + this.state.userId)
        .then((resp) => this.setState({user: resp.data.user}));
      })
      .catch((err) => console.log("Error getting document"));
    })
    .catch((err)=>{
      console.log("ERROR in loading", err);
    });
  }

  openNav() {
    var width = document.getElementById("portal").offsetWidth;
    var marginLeft = ((width - 250) * 0.15 + 250).toString() + 'px';
    var marginRight = ((width - 250) * 0.15).toString() + 'px';
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = marginLeft;
    document.getElementById("main").style.marginRight = marginRight;
    document.getElementById("sideBtn").style.zIndex = "-1";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    var width = document.getElementById("portal").offsetWidth;
    var margin = (width * 0.15).toString() + 'px';
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = margin;
    document.getElementById("main").style.marginRight = margin;
    document.getElementById("sideBtn").style.zIndex = "1";
    document.body.style.backgroundColor = "white";
  }

  onSearch() {
    console.log('searching');
  }

  render(){
    var user = this.state.user;
    return(
      <div id="portal">
        {user && <div id="mySidenav" className="sidenav">
          <div className="background">
            <a className="closebtn" onClick={this.closeNav}>&times;</a>
            <div className="name">{this.state.user.fName + ' ' + this.state.user.lName}</div>
            <div className="username">{this.state.user.username}</div>
          </div>
          <div className="side-footer"><button className="logout-btn" onClick={(e) => this.logout(e)}>Logout</button></div>
        </div>}
        {!user && <div id="mySidenav" className="sidenav">
          Loading...
        </div>}
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Nodebook</a>
            <button id="sideBtn" className="btn" onClick={this.openNav}>
              <i className="material-icons left">menu</i>
            </button>
            <form className="right" onSubmit={this.onSearch}>
              <div className="input-field">
                <input id="search" type="search" required/>
                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                <i className="material-icons">keyboard_return</i>
              </div>
            </form>
          </div>
        </nav>
        <div id="main" className="container">
          <NewDocModal id={this.state.userId} history={this.props.history}/>
          <div className="row myDocs">
            <h4>Your documents</h4>
            {this.state.ownDocs.map(
              (doc) => {
                return (
                  <div key={doc._id} className="col s4 m4">
                    <div className="card deep-purple lighten-3">
                      <div className="card-content white-text">
                        <span className="card-title">{doc.title}</span>
                      </div>
                      <div className="card-action">
                        <Link to={`/docs/${doc._id}`}>Edit</Link>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="row sharedDocs">
            <h4>Shared documents</h4>
            {this.state.collabDocs.map(
              (doc) => {
                return (
                  <div key={doc._id} className="col s4 m4">
                    <div className="card indigo lighten-1">
                      <div className="card-content white-text">
                        <span className="card-title">{doc.title}</span>
                      </div>
                      <div className="card-action">
                        <Link to={`/docs/${doc._id}`}>Edit</Link>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
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
                <input id="idPwd" type="password" className="validate" onChange={ (e) => { this.handlePwdChange(e); }} value={this.state.shareDocPwd}/>
                <label htmlFor="idPwd">Document Password</label>
              </div>
            </div>
            <div className="row"><button type="submit" className="btn waves-effect waves-light col s2 offset-s5">Collaborate!</button></div>
          </form>
        </div>
      </div>
    );
  }
}

export default DocPortal;
