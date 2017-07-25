import React from 'react';
import axios from 'axios';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("IN REGISTER");
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      },
    });

  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  render(){
    return(
        <div className="row">
          <form className="col s12" onSubmit={(e) => this.onSubmit(e)} method="POST" action="/register">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_box</i>
                <input id="icon_prefix" type="text" className="validate" onChange={(e) => this.handleUsernameChange(e)} />
                <label htmlFor="icon_prefix">Username</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">lock</i>
                <input id="icon_telephone" type="password" className="validate" onChange={(e) => this.handlePasswordChange(e)} />
                <label htmlFor="icon_telephone">Password</label>
              </div>
            </div>
            <div>
              <button className="btn waves-effect waves-light green accent-3" type="submit" name="action">
                Register
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
           <a className="waves-effect btn-flat" href="/login">Back to login</a>
        </div>
    );
  }
}

export default Register;
