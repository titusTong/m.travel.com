import React from 'react';
import { Router, Route } from 'dva/router';
import TabBarExample from './components/FootBar/FootBar';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={TabBarExample} />
      </div>
    </Router>
  );
}

export default RouterConfig;
