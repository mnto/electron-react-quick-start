import React from 'react';
import axios from 'axios';
// import { Row, Input, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit() {

    axios.post('/register', {
        username: this.state.username,
        password: this.state.password
      })
      .then(() => {
        console.log("Going to registration page!");
      })
      .catch((err) => {
        console.log("Error with registration", err);
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
          <form className="col s12" onSubmit={() => this.onSubmit()} method="POST" action="/register">
            <div className="row">
              <div className="input-field col s6">
                {/* <i className="material-icons prefix">account_box</i> */}
                <input id="username" type="text" className="validate" onChange={(e) => this.handleUsernameChange(e)} />
                <label for="username">Username</label>
              </div>
              <div className="input-field col s6">
                {/* <i className="material-icons prefix">lock</i> */}
                <input id="password" type="password" className="validate" onChange={(e) => this.handlePasswordChange(e)} />
                <label for="password">Password</label>
              </div>
            </div>
            <div>
              <button className="btn waves-effect waves-light green accent-3" type="submit" name="action">
                Register
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
           <Link className="waves-effect btn-flat" to="/">Back to login</Link>
        </div>
    );
  }
}

export default Register;
