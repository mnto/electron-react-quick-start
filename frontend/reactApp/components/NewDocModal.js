import React from 'react';
import axios from 'axios';
import { Button, Modal, Icon } from 'react-materialize';

class NewDocModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      password: ''
    };
  }


  onSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/docs/new', {
      title: this.state.title,
      password: this.state.password,
      owner: this.props.id,
    })
    .then((resp) => {
      console.log('success IN ON CREATE DOC SUBMIT', resp.data.doc);
      this.props.history.push('/docs/' + resp.data.doc._id);
    })
    .catch((err) => {
      console.log('MODAL ERROR', err);
    });
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }


  render() {
    return (
      <div>
        <Modal
          header='Create a new Document'
          trigger={
            <a className="btn-floating right btn-large waves-effect waves-light deep-purple darken-4">
              <i className="material-icons">add</i>
            </a>}>
            <div className="row">
              <form className="col s12" onSubmit={(e) => this.onSubmit(e)}>
                <div className="row">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">create</i>
                    <input id="title" type="text" placeholder="Title" className="validate" value={this.state.title} onChange={(e) => this.onTitleChange(e)}/>
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" type="password" placeholder="Password" className="validate" value={this.state.password} onChange={(e) => this.onPasswordChange(e)}/>
                  </div>
                  <button className="btn waves-effect waves-light blue darken-1 col s2 offset-s5" type="submit">Create</button>
                </div>
              </form>
            </div>
        </Modal>
      </div>
    );
  }
}

export default NewDocModal;
