import React from 'react';
import { Router, Route } from 'dva/router';
import TabBar from './components/FootBar/FootBar';
import ActiveDetail from './routes/ActiveDetail/ActiveDetail';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={TabBar} />
        <Route path="/ActiveDetail" component={ActiveDetail} />
      </div>
    </Router>
  );
}

export default RouterConfig;
