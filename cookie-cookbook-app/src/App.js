import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'Layout/Layout';
import Home from 'Pages/Home';
import About from 'Pages/About';
import Create from 'Pages/Create';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Layout />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/create" component={Create} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;