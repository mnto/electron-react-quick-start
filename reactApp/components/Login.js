import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then((resp) => {
      console.log('success', resp);
    })
    .catch((err) => {
      console.log('error logging in', err);
    });
  }

  onUsernameChange(event) {
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
      <div className="row">
        <form className="col s12" onSubmit={(e) => this.onSubmit(e)}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_box</i>
              <input id="username" type="text" placeholder="Username" className="validate" value={this.state.username} onChange={(e) => this.onUsernameChange(e)}/>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" placeholder="Password" className="validate" value={this.state.password} onChange={(e) => this.onPasswordChange(e)}/>
            </div>
            <input className="btn waves-effect waves-light green accent-3" type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
