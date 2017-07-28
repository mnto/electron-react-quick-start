import React from 'react';
import MyEditor from './MyEditor';
import styles from '../../assets/stylesheets/docLanding.scss';
import axios from 'axios';
import io from 'socket.io-client';
import { convertFromRaw, convertToRaw, EditorState} from 'draft-js';


class DocLanding extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      document: '',
      // editorState: EditorState.createEmpty(),
      socket: io('http://localhost:3000/')
    };
  }

    //
    // componentDidMount() {
    //   // this.props.socket.emit('started', 'hello world!');
    //   //GET MOST RECENT FROM DOC DB
    //   console.log("PROPS", this.props);
    //   var self = this;
    //   //Axios call to get the document
    //   axios.get('http://localhost:3000/docs/' + this.props.id)
    //   .then(({ data }) => {
    //     if (data.success) {
    //       console.log("DATA DOC", data.doc);
    //       var newState;
    //       if (data.doc.text) {
    //         const rawCS =  JSON.parse(data.doc.text);
    //         const contentState = convertFromRaw(rawCS);
    //         newState = EditorState.createWithContent(contentState);
    //       }
    //       else {
    //         newState = EditorState.createEmpty();
    //       }
    //       self.setState({editorState: newState});
    //     }
    //     else {
    //       console.log("ERROR LOADING");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //
    //   this.state.socket.on('connect', () => {
    //     console.log('CONNECTED TO SOCKETS');
    //     this.state.socket.emit("documentId", this.props.id);
    //   });
    //   this.state.socket.on('errorMessage', message => {
    //     console.log("ERROR", message);
    //   });
    //   this.state.socket.on('sendBackContentState', socketStr => {
    //     const socketRaw =  JSON.parse(socketStr);
    //     const socketCS = convertFromRaw(socketRaw);
    //     const socketState = EditorState.createWithContent(socketCS);
    //     self.setState({editorState: socketState});
    //   });
    //
    // }

  componentWillMount(){
    const docId = this.props.match.params.docId;
    this.setState({id: docId});
    console.log('ID', docId);
    axios.get('http://localhost:3000/docs/'+ docId)
    .then(({data}) => {
      if (data.success) {
        this.setState({document: data.doc});
        console.log('DOCUMENT', this.state.document);
      }
      else {
        console.log("DOCUMENT NOT FOUND");
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
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
            <button id="sideBtn" className="btn" onClick={this.openNav}></button>
            <form className="right">
              <div className="input-field">
                <input id="search" type="search" required/>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
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
