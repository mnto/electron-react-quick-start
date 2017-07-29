import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesheets/register.scss';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      fName: '',
      lName: ''
    };
  }

  // when user clicks on Register, makes a post request to the back end to create a new user
  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/register', {
      username: this.state.username,
      password: this.state.password,
      fName: this.state.fName,
      lName: this.state.lName
    })
      .then(() => {
        console.log("Successful registration! Going to login page.");
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log("Error with registration", err);
      });

  }

  // sets user' username in state according to the input field
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  // sets user's password in state according to the input field
  handlePasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  // sets user's first name in state according to the input field
  handleFirstNameChange(event) {
    this.setState({
      fName: event.target.value
    });
  }

  // sets user's last name in state according to the input field
  handleLastNameChange(event) {
    this.setState({
      lName: event.target.value
    });
  }

  render(){
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Nodebook</a>
          </div>
        </nav>
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
                <div className="input-field col s6">
                  <input id="icon_telephone" type="text" className="validate" onChange={(e) => this.handleFirstNameChange(e)} />
                  <label htmlFor="icon_telephone">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="icon_telephone" type="text" className="validate" onChange={(e) => this.handleLastNameChange(e)} />
                  <label htmlFor="icon_telephone">Last Name</label>
                </div>
              </div>
              <div>
                <button className="btn center-align waves-effect waves-light blue darken-1 accent-3 col s4 offset-s4 reg-btn" type="submit" name="action">
                  <i className="material-icons right">send</i>
                  Register!
                </button>
                <Link className="btn center-align waves-effect waves-light col s4 offset-s4 back-btn" to="/">
                  <i className="material-icons left">chevron_left</i>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
