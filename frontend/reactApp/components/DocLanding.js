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
        console.log("OWNER", data.doc.owner);
        this.setState({
          document: data.doc,
          userId: data.doc.owner
        });
      }
      else {
        console.log("DOCUMENT NOT FOUND", data.error);
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
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
