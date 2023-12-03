import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class NavBar extends Component {
    user= sessionStorage.getItem('username');

    logout(){
        sessionStorage.clear();
        window.location.href = '/';
    }

  render() {
    if(this.user == null){
        return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1 className="navbar-brand" style={{paddingLeft:'10px'}}>Employee Management App</h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active" style={{paddingRight:'10px'}}>
                <Link to="/signup">Signup</Link>
            </li>
            <li className="nav-item active">
            <Link to="/">Login</Link>
            </li>
          </ul>
        </div> 
            </nav>

            </div>
          
        )
    }
    else{
        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1 className="navbar-brand" style={{paddingLeft:'10px'}}>Employee Management App</h1>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
             </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item active" style={{paddingRight:'10px'}}>
          <Link to="/employee/list">Employee List </Link>
            </li>
            <li className="nav-item active" style={{paddingRight:'10px'}}>
            <Link to="/employee/add">Add Employee </Link>
            </li>
            <li className="nav-item active" style={{paddingRight:'10px'}}>
            <Link to="/employee/update">Update Employee </Link>
            </li>
            <li className="nav-item active">
            <Link to="/" onClick={this.logout}>Logout </Link>
              <p>Hi, {this.user}</p>
            </li>
          </ul>
        </div> 
        </nav>
          </div>
        )
    }

  }
}
