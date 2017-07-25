import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import DocPortal from './DocPortal.js';
import DocLanding from './DocLanding.js';
import Home from './Home.js';

class AppContainer extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact={true} path="/" component={Login}/>
            <Route exact={true} path="/register" component={Register}/>
            <Route exact={true} path="/documents" component={DocPortal}/>
            <Route exact={true} path="/documents/:documentId" component={DocLanding}/>
            <Route render={() => <h1>404, Sorry fam.</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppContainer;
