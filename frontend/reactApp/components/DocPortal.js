import React from 'react';
import axios from 'axios';
import { Button, Icon } from 'react-materialize';
import  NewDocModal from './NewDocModal';


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
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log("ERROR in loading", err);
    });
  }

  // componentDidMount(){
  //   axios.get('http://localhost:3000/userID')
  //   .then((resp) => {
  //     console.log("componentDidMount RESP ID", resp.id);
  //     this.setState({userId:resp.id});
  //     axios.get('http://localhost:3000/user/' + this.state.userId)
  //     .then((response) => response.json())
  //     .then(jsonResp => {
  //       const ownDocs = jsonResp.ownDocs;
  //       const collabDocs = jsonResp.collaborating;
  //       this.setState({
  //         ownDocs,
  //         collabDocs
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("error finding documents", err);
  //     });
  //   });
  // }

  render(){
    return(
      <div>
        <div>
          <a href="/logout" className="waves-effect waves-light btn"><i className="material-icons right">directions_run</i>Logout</a>
        </div>
        <div>
          <h4>Your documents</h4>
          <ul>
            {this.state.ownDocs.map(
              (doc) => {
                return <li><Button floating large node='a' href={'/documents/' + doc.id} waves='light' icon='insert_drive_file' />{doc.name}</li>;
              }
            )}
          </ul>
        </div>
        <div>
          <h4>Collaborating documents</h4>
          <ul>
            {this.state.collabDocs.map(
              (doc) => {
                return <li><Button floating large node='a' href={'/documents/' + doc.id} waves='light' icon='insert_drive_file' />{doc.name}</li>;
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
