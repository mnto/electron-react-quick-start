import React from 'react';
import TextEditor from './TextEditor';
import styles from '../../assets/stylesheets/docLanding.scss';
import { Button } from 'react-materialize';
import axios from 'axios';

class DocLanding extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      document: null
    };
  }

  componentDidMount(){
    const docId = this.props.match.params;
    axios.get('http://localhost:3000/docs/'+ docId)
    .then((docResponse) => {
      console.log("FOUND DOCUMENT");
      this.setState({document: docResponse.doc});
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT");
    });
  }

  render(){
    const date = (new Date(this.state.document.dateCreated)).toLocaleString();
    return(
      <div className="container page">
        <div className="row">
          <div>
            <a className="waves-effect waves-light btn col s5"><i className="material-icons left">chevron_left</i>Back to Document Portal</a>
          </div>
          <div className="description col s12">
            <h2>{this.state.document.title}</h2>
            <h6>Shareable ID: {this.state.document.id}</h6>
            <p>Created by {this.state.document.owner.username} on {date}</p>
            <p>Collaborators: </p>
          </div>
          <div className="btn waves-effect waves-light col s4 offset-s4" type="submit" name="action">
            Save Changes
            <i className="material-icons left">save</i>
          </div>
        </div>
        <TextEditor />
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
