import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesheets/register.scss';

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
        this.props.history.push('/');
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
      <div className="container register">
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
              <button className="btn waves-effect waves-light green accent-3 col s4 offset-s4 reg-btn" type="submit" name="action">
                <i className="material-icons right">send</i>
                Register!
              </button>
              <Link className="waves-effect btn-flat col s4 offset-s4 back-btn" to="/">
                <i className="material-icons left">chevron_left</i>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
