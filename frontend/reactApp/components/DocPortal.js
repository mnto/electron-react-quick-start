import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';
import  NewDocModal from './NewDocModal';
import styles from '../../assets/stylesheets/docPortal.scss';


class DocPortal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: '',
      ownDocs: [],
      collabDocs: []
    };
  }

  logout(e) {
    e.preventDefault();
    axios.get('http://localhost:3000/logout')
    .then((resp) => {
      console.log('logging out');
      this.props.history.push('/');
    })
    .catch((err) =>
      console.log('error logging out', err)
    );
  }

  componentDidMount(){
    axios.get('http://localhost:3000/userID')
    .then((resp) => {
      this.setState({userId: resp.id});
      axios.get('http://localhost:3000/user/' + this.state.userId)
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
    });
  }

  render(){
    return(
      <div className="container docPortal">
        <div className="row">
          <button onClick={(e) => this.logout(e)}
            className="waves-effect waves-light btn col s2 offset-s10">
            <i className="material-icons right">directions_run</i>Logout
          </button>
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
        <NewDocModal id={this.state.userId}/>
      </div>
    );
  }
}

export default DocPortal;
