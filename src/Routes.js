// Routes.js
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import StacksComponent from './Components/StacksComponent';
import Stacks from './Components/Stacks';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={StacksComponent} />
      <Route path="/stacks" component={Stacks} />

      {/* Add more routes as needed */}
    </Router>
  );
};

export default Routes;
