import React from 'react';
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import DocPortal from './DocPortal';
import DocLanding from './DocLanding';
import axios from 'axios';
import History from './History';

class AppContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      id: ''
    };
  }
  componentWillMount(){
    axios.get('http://localhost:3000/userID')
    .then((resp) => {
      if (resp.data.id){
        this.setState({
          loggedIn: true,
          id: resp.data.id
        });
      }
    })
    .catch((err) => {
      console.log("ERROR WITH GETTING USERID FOR APP COMPONENT");
    });

  }
  render() {
    console.log('app container');
    return (
      <HashRouter history={hashHistory}>
        <Switch>
          {/* Use render instead of component to pass down userids  */}
            <Route exact={true} path="/register" component={Register}/>
            <Route exact={true} path="/user/:userId" component={DocPortal}/>
            <Route exact={true} path="/docs/:docId" component={DocLanding}/>
            <Route exact={true} path="/" component={Login}/>
            <Route exact={true} path="/logout" component={Login}/>
            <Route exact={true} path='/history/:docId' component={History}/>
            <Route render={() => <h1>404, Sorry fam.</h1>} />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppContainer;
