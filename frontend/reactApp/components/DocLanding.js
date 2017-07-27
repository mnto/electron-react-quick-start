import React from 'react';
import MyEditor from './MyEditor';
import styles from '../../assets/stylesheets/docLanding.scss';
import axios from 'axios';
import io from 'socket.io-client';
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
    this.setState({ docId });
    console.log('ID', docId);
    axios.get('http://localhost:3000/docs/'+ docId)
    .then(({ data }) => {
      if (data.success) {
        //console.log('DOC', data);
        console.log("OWNER", data.doc.owner);
        this.setState({
          document: data.doc,
          userId: data.doc.owner
        });
        //console.log("THIS IS THE STATE", this.state);
        // var newState;
        // if (data.doc.text) {
        //   const rawCS =  JSON.parse(data.doc.text);
        //   const contentState = convertFromRaw(rawCS);
        //   newState = EditorState.createWithContent(contentState);
        // }
        // else {
        //   newState = EditorState.createEmpty();
        // }
        // this.setState({editorState: newState});
      }
      else {
        console.log("DOCUMENT NOT FOUND", data.error);
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
    // this.state.socket.on('connect', () => {
    //   console.log('CONNECTED TO SOCKETS');
    //   this.state.socket.emit("documentId", this.state.id);
    // });
    // this.state.socket.on('errorMessage', message => {
    //   console.log("ERROR", message);
    // });
    // this.state.socket.on('sendBackContentState', socketStr => {
    //   const socketRaw =  JSON.parse(socketStr);
    //   const socketCS = convertFromRaw(socketRaw);
    //   const socketState = EditorState.createWithContent(socketCS);
    //   this.setState({editorState: socketState});
    // });
  }

  // onBack(e) {
  //   e.preventDefault();
  //   console.log('state in back', this.state);
  //   // if (this.state.saveFlag && this.state.buttonClicked) {
  //   this.props.history.push('/user/' + this.state.userId);
  //   // }
  //   // else {
  //   //   alert("You haven't saved your changes yet");
  //   // }
  // }

  render(){
    const doc = this.state.document;
    const docId = this.state.docId;
    const userId = this.state.userId;

    return(
      <div className="container page">
        <div className="row">
          {/* <button
            className="waves-effect waves-light btn col s4"
            onClick={(e) => this.onBack(e)}>
            <i className="material-icons left">chevron_left</i>
            Back to Document Portal
          </button> */}
          <Link to={'/user/' + userId}><Button waves='light'>Back to Document Portal</Button></Link>
          {doc && <div className="description col s12">
            <h2>{doc.title}</h2>
            <p><span className="bold">Shareable ID:</span> {docId} </p>
            <p><span className="bold">Created by </span> {doc.owner.fName + ' ' + doc.owner.lName}
                <span className="bold"> on</span> {new Date(doc.dateCreated).toLocaleDateString()}
            </p>
            <div><span className="bold">Collaborators:</span>
              {doc.collabs.map(collab => <p>{collab.fName + ' ' + collab.lName}</p>)}
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
          // editorState={this.state.editorState}
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
    );
  }
}

export default DocLanding;
