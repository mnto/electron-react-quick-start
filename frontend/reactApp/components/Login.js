import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesheets/login.scss';

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
    axios.post('http://localhost:3000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then((resp) => {
      this.props.history.push('/user/'+resp.data.id);
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

  componentDidMount(){
    axios.get('http://localhost:3000/user/logged-in')
    .then((response) => {
      if (response.user){
        this.props.history.push('/documents');
      }
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  render() {
    return (
      <div className="container login">
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
              <button type="submit" className="btn waves-effect waves-light green accent-3 col s2 offset-s5 login-btn">Login</button>
              <Link to="/register" className="btn waves-effect waves-light accent-3 col s2 offset-s5">Register</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
