import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Createbill from './components/Createbill';
import Editbill from './components/Editbill';
import billHome from './components/billHome';
import NavBarbill from './components/NavBarbill';
import billDetails from './components/billDetails';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

       <div className="container">
         <NavBarbill/>
         <Route path="/" exact component={billHome}></Route>
         <Route path="/add"component={Createbill}></Route>
         <Route path="/edit/:id"component={Editbill}></Route>
         <Route path="/bill/:id"component={billDetails}></Route> 


       </div>
           
      </BrowserRouter>
  
    )
  }
}