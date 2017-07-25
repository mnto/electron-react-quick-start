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
    axios.post('/new-doc', {
      title: this.state.title,
      password: this.state.password
    })
    .then((resp) => {
      console.log('success', resp);
    })
    .catch((err) => {
      console.log('error loging in', err);
    });
  }

  onTitleChange(event) {
    this.setState({
      username: event.target.value
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
          header='Modal Header'
          trigger={<Button waves='light'>Click to create document<Icon right>add</Icon></Button>}>
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
                  <input className="btn waves-effect waves-light green accent-3" type="submit" value="Create new document" />
                </div>
              </form>
            </div>
        </Modal>
      </div>
    );
  }
}

export default NewDocModal;
