import React, { Component } from 'react'
import AxiosApi from '../../api/AxiosApi';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
  }

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees() {

    AxiosApi.get('/api/v1/emp/employees', { withCredentials: true })
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEmployee(eid) {
      AxiosApi.delete('api/v1/emp/employees?eid='+eid)
      this.setState({
        employees: this.state.employees.filter(empl => empl._id !== eid)
      })
      alert("Employee deleted successfully");
      console.log("Employee deleted successfully");

  }




  render() {
    


    return (
      <div >
        <div >
          <h1>Employees List</h1>
        </div>
        <div>
          <Link to='/employee/add' className='btn btn-primary'>Add Employee</Link>
        </div>
        <br />
        <div>
          <table className='table'>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email/ Id</th>
                <th>Actions</th>
              </tr>
            <tbody >
              {
                this.state.employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>
                      <Link to={'/employee/details/'+ employee._id} className='btn btn-primary'>View</Link>

                      <Link to={'/employee/update/'+ employee._id} className='btn btn-success'>Update</Link>

                      <button onClick={() => this.deleteEmployee(employee._id)} className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>  
          </table> 
        </div>

      </div>
    )
  }
}
