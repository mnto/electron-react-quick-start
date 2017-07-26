import React from 'react';
import TextEditor from './TextEditor';
import { Link } from 'react-router-dom';
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
    console.log("DOCUMENT ID", docId);
    axios.get('http://localhost:3000/docs/'+ docId)
    .then((docResponse) => {
      console.log("FOUND DOCUMENT", docResponse.data);
      this.setState({document: docResponse.data.doc});
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
  }

  render(){
    // const date = (new Date(this.state.document.dateCreated)).toLocaleString();
    return(
      <div className="container page">
        <div className="row">
          <div>
            <Link className="waves-effect waves-light btn col s5" to={`/user/$(this.state.document.owner._id)`}>
              <i className="material-icons left">chevron_left</i>
              Back to Document Portal
            </Link>
          </div>
          <div className="description col s12">
            <h2>Title</h2>
            <h6>Shareable ID: </h6>
            <p>Created by on </p>
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
