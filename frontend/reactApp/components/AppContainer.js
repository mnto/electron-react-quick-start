import React from 'react';
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import DocPortal from './DocPortal';
import DocLanding from './DocLanding';

class AppContainer extends React.Component {
  render() {
    console.log('app container');
    return (
      <HashRouter history={hashHistory}>
        <Switch>
            <Route exact={true} path="/register" component={Register}/>
            <Route exact={true} path="/documents" component={DocPortal}/>
            <Route exact={true} path="/documents/:documentId" component={DocLanding}/>
            <Route exact={true} path="/" component={Login}/>
            <Route render={() => <h1>404, Sorry fam.</h1>} />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppContainer;
