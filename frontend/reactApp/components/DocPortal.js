import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';
import  NewDocModal from './NewDocModal';
import { Link } from 'react-router-dom';


class DocPortal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: '',
      ownDocs: [],
      collabDocs: []
    };
  }

  componentDidMount() {
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

  render(){
    return(
      <div>
        <div>
          <Link to="/logout" className="waves-effect waves-light btn"><i className="material-icons right">directions_run</i>Logout</Link>
        </div>
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
        <NewDocModal id={this.state.userId} history={this.props.history}/>
      </div>
    );
  }
}

export default DocPortal;
