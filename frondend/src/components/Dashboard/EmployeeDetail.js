import React, { Component } from 'react'
import AxiosApi from '../../api/AxiosApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EmployeeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: {}
    }
  }

  componentDidMount() {
    console.log('EmployeeDetail#componentDidMount'); // degug
    const path = window.location.pathname.split('/');
    console.log(path); // degug
    const id = path[3];
    console.log(id); // degug
    this.getEmployee(id);
  }

  getEmployee(eid) {
    AxiosApi.get('/api/v1/emp/employees/' + eid, { withCredentials: true })
      .then(response => {
        this.setState({ employee: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
          <div>
            <h1>Employee Details</h1>
          </div>
              <p>First Name: {this.state.employee.first_name}</p>
              <p>Last Name: {this.state.employee.last_name}</p>
              <p>Email: {this.state.employee.email}</p>

      </div>
    )
  }
}
