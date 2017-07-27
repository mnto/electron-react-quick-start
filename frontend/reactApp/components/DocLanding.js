import React from 'react';
import TextEditor from './TextEditor';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesheets/docLanding.scss';
import { Button } from 'react-materialize';
import axios from 'axios';
import {} from 'draft-js';


class DocLanding extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: null,
      document: null
    };
  }

  componentWillMount(){
    const docId = this.props.match.params.docId;
    this.setState({id: docId});
    // const {data} = await axios.get('http://localhost:3000/docs/'+ docId);
    // if (data.success) {
    //   console.log("success");
    //   await this.setState({document: data.doc});
    // }
    // else {
    //   console.log("not sucess")
    // }
    axios.get('http://localhost:3000/docs/'+ docId)
    .then(({data}) => {
      if (data.success) {
        this.setState({document: data.doc});
        console.log("THIS IS THE STATE", this.state);
      }
      else {
        console.log("DOCUMENT NOT FOUND");
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
  }

  render(){
    var doc = this.state.document;
    var userId = doc.owner._id;

    return(
      <div className="container page">
        <div className="row">
          {doc && <div className="description col s12">

            <h2>{doc.title}</h2>
            <h6>Shareable ID: {this.state.id} </h6>
            <p>Created by {doc.owner.username} on {doc.dateCreated}</p>
            {/* <p>Collaborators: {collabs}</p> */}
          </div>}

          {!doc && <div className="description col s12">
            Loading...
          </div>}

        </div>
        <TextEditor
          id={userId}
          doc={doc}
          history={this.props.history}
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
