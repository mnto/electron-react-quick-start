import React from 'react';
import axios from 'axios';
import User from '../../backend/models/models';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }



  onSubmit = () => {
    // const hashed = this.hashPassword(this.state.password);
    // const newUser = new User({
    //   username: this.state.username,
    //   password: hashed
    // });
    //
    // newUser.save()
    // .then(() => {
    //   this.setState({
    //     username: '',
    //     password: ''
    //   });
    // })
    // .catch((err) => {
    //   console.log("Error saving to database", err);
    // });

    axios.post('/register', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      console.log('success', response);
    })
    .catch((error) => {
      console.log("ERROR WITH REGISTRATION", error);
    });

  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    });
  };

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
                <i className="material-icons prefix">account_box</i>
                <input id="icon_prefix" type="text" className="validate" onChange={(e) => this.handleUsernameChange(e)}></input>
                <label for="icon_prefix">Username</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">lock</i>
                <input id="icon_telephone" type="password" className="validate" onChange={(e) => this.handlePasswordChange(e)}></input>
                <label for="icon_telephone">Password</label>
              </div>
            </div>
            <input className="btn waves-effect waves-light green accent-3" type="submit" name="action">
              Register
              <i className="material-icons right">send</i>
            </input>
          </form>
           <a class="waves-effect btn-flat" href="/login">Back to login</a>
        </div>
    );
  }
}

export default Register;
