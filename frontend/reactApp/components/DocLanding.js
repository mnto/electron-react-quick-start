import React from 'react';
import TextEditor from './TextEditor';
import styles from '../../assets/stylesheets/docLanding.scss';
import axios from 'axios';
import io from 'socket.io-client';
import { convertFromRaw, convertToRaw, EditorState} from 'draft-js';


class DocLanding extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: null,
      document: null,
      editorState: EditorState.createEmpty(),
      socket: io('http://localhost:3000/')
    };
  }
  onChange(editorState) {
    console.log('ON CHANGE');
    this.setState({editorState: editorState});
    const rawCS= convertToRaw(this.props.editorState.getCurrentContent());
    const strCS = JSON.stringify(rawCS);
    this.state.socket.emit("sendContentState", strCS);
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

  componentDidMount(){
    const docId = this.props.match.params.docId;
    this.setState({id: docId});
    console.log('ID', docId);
    axios.get('http://localhost:3000/docs/'+ docId)
    .then(({data}) => {
      if (data.success) {
        console.log('DOC', data);
        this.setState({document: data.doc});
        console.log("THIS IS THE STATE", this.state);
        var newState;
        if (data.doc.text) {
          const rawCS =  JSON.parse(data.doc.text);
          const contentState = convertFromRaw(rawCS);
          newState = EditorState.createWithContent(contentState);
        }
        else {
          newState = EditorState.createEmpty();
        }
        self.setState({editorState: newState});
      }
      else {
        console.log("DOCUMENT NOT FOUND");
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
    this.state.socket.on('connect', () => {
      console.log('CONNECTED TO SOCKETS');
      this.state.socket.emit("documentId", this.props.id);
    });
    this.state.socket.on('errorMessage', message => {
      console.log("ERROR", message);
    });
    this.state.socket.on('sendBackContentState', socketStr => {
      const socketRaw =  JSON.parse(socketStr);
      const socketCS = convertFromRaw(socketRaw);
      const socketState = EditorState.createWithContent(socketCS);
      self.setState({editorState: socketState});
    });
  }

  onBack(e) {
    //e.preventDefault();
    this.setState({buttonClicked: true});
    console.log('state in back', this.state);
    // if (this.state.saveFlag && this.state.buttonClicked) {
    this.props.history.push('/user/' + this.props.id);
    // }
    // else {
    //   alert("You haven't saved your changes yet");
    // }
  }

  onSave(e) {
    e.preventDefault();
    const rawCS= convertToRaw(this.state.editorState.getCurrentContent());
    const strCS = JSON.stringify(rawCS);
    axios.post('http://localhost:3000/docs/save/' + this.props.id, {
      text: strCS
    })
    .then(resp => {
      console.log(resp);
      // this.setState({saveFlag: true});
    })
    .catch(err => {
      console.log(err);
    });
  }

  render(){
    var id = this.state.id;
    var doc = this.state.document;

    return(
      <div className="container page">
        <div className="row">
          {doc && <div className="description col s12">
            <button
              className="waves-effect waves-light btn col s5"
              onClick={(e) => this.onBack(e)}>
              <i className="material-icons left">chevron_left</i>
              Back to Document Portal
            </button>
            <button
              onClick={(e) => this.onSave(e)}
              className="btn waves-effect waves-light col s4 offset-s4">
              Save Changes
              <i className="material-icons left">save</i>
            </button>
            <h2>{doc.title}</h2>
            <h6>Shareable ID: {id} </h6>
            <p>Created by {doc.owner.username} on {doc.dateCreated}</p>
            {/* <p>Collaborators: {collabs}</p> */}
          </div>}

          {!doc && <div className="description col s12">
            Loading...
          </div>}

        </div>
        <TextEditor
          id={id}
          doc={this.state.document}
          history={this.props.history}
          onChange={this.onChange}
          editorState={this.state.editorState}
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
