import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

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
        <form className="col s12" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_box</i>
              <input id="username" type="text" className="validate" onChange={(e) => this.onUsernameChange(e)}/>
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="text" className="validate" onChange={(e) => this.onPasswordChange(e)}/>
              <label htmlFor="password">Password</label>
            </div>
            <a className="waves-effect waves-light btn">submit</a>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
