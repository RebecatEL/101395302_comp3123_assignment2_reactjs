import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './components/User/Signup';
import NavBar from './components/topnavbar/topnavbar';
import EmployeeList from './components/Dashboard/EmployeeList';
import EmployeeDetail from './components/Dashboard/EmployeeDetail';
import EmployeeAdd from './components/Dashboard/EmployeeAdd';
import EmployeeUpdate from './components/Dashboard/EmployeeUpdate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {

  return (
    <div className="App">
    <NavBar />
    <Routes>
          <Route path="/" element={ <Login /> }/>
          <Route path="/signup" element={ <Signup /> }/>
          <Route path="/employee/list" element={ <EmployeeList /> }/>
          <Route path="/employee/add" element={ <EmployeeAdd /> }/>
          <Route path="/employee/details/:id" element={ <EmployeeDetail /> }/>
          <Route path="/employee/update/:id" element={ <EmployeeUpdate /> }/>
    </Routes>
    </div>
  );
}

export default App;
