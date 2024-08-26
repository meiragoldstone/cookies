import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
//import './custom.scss'
import Home from './Pages/Home';
import About from './Pages/About';
import Create from './Pages/Create';
import Retrieve from './Pages/Retrieve';
import Update from './Pages/Update';
import Layout from './Layout/Layout';

const App = () => {
    return (
        <Router>
          <Layout />
              <Routes>
                  <Route path="/" element = {<Home />} />
                  <Route path="/About" element ={<About />} />
                  <Route path="/Create" element ={<Create />} />
                  <Route path="/Retrieve" element ={<Retrieve />} />
                  <Route path="/Update" element ={<Update />} />
              </Routes>
        </Router>
    );
};

export default App;
