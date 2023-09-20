import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import StackComponents from './Components/stackComponents/StackComponents';
import Stacks from './Components/stacks/Stacks';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/stacks" component={Stacks} />
      <Route path="/components" component={StackComponents} />
    </Router>
  );
};

export default Routes;
