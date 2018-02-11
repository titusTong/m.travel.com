import React from 'react';
import { Router, Route } from 'dva/router';
import TabBar from './components/FootBar/FootBar';
import ActiveDetail from './routes/ActiveDetail/ActiveDetail';
import ShoppingStore from './routes/ShoppingStore/ShoppingStore';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={TabBar} />
        <Route path="/ActiveDetail" component={ActiveDetail} />
        <Route path="/ShoppingStore" component={ShoppingStore} />
      </div>
    </Router>
  );
}

export default RouterConfig;
