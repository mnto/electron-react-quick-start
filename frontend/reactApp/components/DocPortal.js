import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';
import  NewDocModal from './NewDocModal';


class DocPortal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ownDocs: [],
      collabDocs: []
    };
  }

  componentDidMount(){
    axios.get('/user/'+this.props.userId)
    .then((response) => response.json())
    .then(jsonResp => {
      const ownDocs = jsonResp.ownDocs;
      const collabDocs = jsonResp.collaborating;

      this.setState({
        ownDocs,
        collabDocs
      });
    })
    .catch((err) => {
      console.log("error finding documents", err);
    });
  }

  render(){
    return(
      <div>
        <h4>Your documents</h4>
        <ul>
          {this.state.ownDocs.map(
            (doc) => {
              return <li><Button floating large node='a' href={'/documents/' + doc.id} waves='light' icon='insert_drive_file' />{doc.name}</li>;
            }
          )}
        </ul>
        <ul>
          <h4>Collaborating documents</h4>
          {this.state.collabDocs.map(
            (doc) => {
              return <li><Button floating large node='a' href={'/documents/' + doc.id} waves='light' icon='insert_drive_file' />{doc.name}</li>;
            }
          )}
        </ul>
        <Button waves='light' href='/docs/new'>Click to create a new document<Icon left>create</Icon></Button>

      </div>
    );
  }
}

export default DocPortal;
