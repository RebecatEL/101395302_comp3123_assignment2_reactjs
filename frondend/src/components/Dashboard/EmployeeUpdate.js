import React, { Component } from 'react'
import AxiosApi from '../../api/AxiosApi';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EmployeeUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: {},
      first_name: '',
      last_name: '',
      email: '',
      error: '',
      eid: ''
    }
  }

  componentDidMount() {
    const path = window.location.pathname.split('/');
    const id = path[3];
    this.getEmployee(id);
  }

  getEmployee(eid) {
    AxiosApi.get('/api/v1/emp/employees/' + eid, { withCredentials: true })
      .then(response => {
        this.setState({
          employee: response.data,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          eid: response.data._id
        })
        console.log(response.data); // debug
        console.log(this.state.eid); // debug

      })
      .catch((error) => {
        console.log(error);
      })
  }

  onValueChanged = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
      error: ''
    })
    console.log(this.state);
  }


  onSubmitForm = async (event) => {
    event.preventDefault()
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email
    }

    try {
      const response = await AxiosApi.put(`/api/v1/emp/employees/${this.state.eid}`, data, { withCredentials: true });
      alert('Employee updated successfully')
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data) {
        this.setState({ error: error.response.data.message });
      } else {
        this.setState({ error: 'An unexpected error occurred.' });
      }
    }

  }

  render() {
    const { error } = this.state;
    const { first_name } = this.state;
    const { last_name } = this.state;
    const { email } = this.state;


    return (
      <div className="bodyUser">
        <div className="wrapper">

          <div>
            <h1>Update Employee </h1>
          </div>
          <form onSubmit={(e) => this.onSubmitForm(e)} >
            <div className="form-group">
            <label>First Name</label>
              <input
                required
                name='first_name'
                value={first_name}
                type="text"
                className="form-control"
                onChange={(e) => this.onValueChanged(e)} />
            </div>
            <div className="form-group">
            <label>Last Name</label>
              <input
                required
                name='last_name'
                value={last_name}
                type="text"
                className="form-control"
                onChange={(e) => this.onValueChanged(e)} />
            </div>
            <div className="form-group">
            <label>email</label>
              <input
                required
                name='email'
                type="text"
                value={email}
                className="form-control"
                onChange={(e) => this.onValueChanged(e)} />
            </div>
            <br />
            <div>
              <input
                name='btnSubmit'
                type="submit"
                value="Update" 
                className="btn btn-primary"
                />
              <Link to={'/employee/list'} className="btn btn-danger">Cancel</Link>
            </div>
            <div className="error">
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </form>
        </div>
      </div>

    )
  }
}
