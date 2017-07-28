import React from 'react';
import MyEditor from './MyEditor';
import styles from '../../assets/stylesheets/docLanding.scss';
import axios from 'axios';
import { convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';


class DocLanding extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      docId: '',
      userId: '',
      document: '',
    };

  }

  componentWillMount(){
    const docId = this.props.match.params.docId;
    this.setState({ docId });
    console.log('ID', docId);
    axios.get('http://localhost:3000/docs/'+ docId)
    .then(({ data }) => {
      if (data.success) {
<<<<<<< HEAD
        console.log("OWNER", data.doc.owner);
        this.setState({
          document: data.doc,
          userId: data.doc.owner
        });
=======
        this.setState({document: data.doc});
        console.log('DOCUMENT', this.state.document);
>>>>>>> master
      }
      else {
        console.log("DOCUMENT NOT FOUND", data.error);
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
<<<<<<< HEAD
  }

  render(){
    const doc = this.state.document;
    const docId = this.state.docId;
    const userId = this.state.userId;

    return(
      <div className="container page">
        <div className="row">
          <Link to={'/user/' + userId}><Button waves='light'>Back to Document Portal</Button></Link>
          {doc && <div className="description col s12">
            <h2>{doc.title}</h2>
            <p><span className="bold">Shareable ID:</span> {docId} </p>
            <p><span className="bold">Created by </span> {doc.owner.fName + ' ' + doc.owner.lName}
                <span className="bold"> on</span> {new Date(doc.dateCreated).toLocaleDateString()}
            </p>
            <div><span className="bold">Collaborators:</span>
              {doc.collabs.map(collab => <p key={collab._id}>{collab.fName + ' ' + collab.lName}</p>)}
            </div>
          </div>}
          {!doc && <div className="description col s12">
            Loading...
          </div>}
        </div>
        <MyEditor
          id={docId}
          user={userId}
          doc={doc}
          history={this.props.history}
          onChange={this.onChange}
        />
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <p>Taking desktop note taking app to another aesthetic</p>
            </div>
=======
  }

  onBack(e) {
    e.preventDefault();
    console.log('state in back', this.state);
    this.props.history.push('/user/' + this.props.id);
  }

  render(){
    var id = this.state.id;
    var doc = this.state.document;
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <button
              className="left waves-effect waves-light btn col s4"
              onClick={(e) => this.onBack(e)}>
              <i className="material-icons left">chevron_left</i>
              Portal
            </button>
            <a href="#" className="brand-logo center">Nodebook</a>
            <form className="right">
              <div className="input-field">
                <input id="search" type="search" required/>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
>>>>>>> master
          </div>
        </nav>
        <div className="container page">
          <div className="row">
            {doc && <div className="description col s12">
              <h2>{doc.title}</h2>
              <p><span className="bold">Shareable ID:</span> {id} </p>
              <p><span className="bold">Created by </span> {doc.owner.fName + ' ' + doc.owner.lName}
                  <span className="bold"> on</span> {new Date(doc.dateCreated).toLocaleDateString()}
              </p>
              <div><span className="bold">Collaborators:</span>
                <ul>
                  {doc.collabs.map(collab => <li key={doc._id}>{collab.fName + ' ' + collab.lName}</li>)}
                  <li>{doc.owner.fName + ' ' + doc.owner.lName}</li>
                </ul>
              </div>
            </div>}
            {!doc && <div className="description col s12">
              Loading...
            </div>}
          </div>
          <MyEditor
            id={id}
            doc={this.state.document}
            history={this.props.history}
            onChange={this.onChange}
            socket={this.state.socket}
          />
          <footer className="page-footer">
            <div className="container">
              <div className="row">
                <p>Taking desktop note taking app to another aesthetic</p>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
              © 2017 Copyright Demi, Minh, Julia, Audrey
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default DocLanding;
