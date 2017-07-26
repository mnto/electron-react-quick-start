import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    axios.post('http://localhost:3000/register', {
      username: this.state.username,
      password: this.state.password
    })
      .then(() => {
        console.log("Successful registration! Going to login page.");
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
                <i className="material-icons right">send</i>
                Register!
              </button>
            </div>
          </form>
           <Link className="waves-effect btn-flat" to="/">Back to login</Link>
        </div>
    );
  }
}

export default Register;
