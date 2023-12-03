import React, { Component } from 'react'
import AxiosApi from '../../api/AxiosApi';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class EmployeeAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        salary: 0,
        error: ''
    }
}

onValueChanged = (event) => {
  event.preventDefault()
  this.setState({
      [event.target.name]: event.target.value,
      error: ''
  })
}

onSubmitForm = async (event) => {
  event.preventDefault()
  const { first_name, last_name, email, gender, salary } = this.state
  const data = {
      first_name,
      last_name,
      email,
      gender,
      salary
  }
  try {
      const response = await AxiosApi.post('/api/v1/emp/employees', data , { withCredentials: true });
      alert('Employee added successfully')
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
    return (
       <div>
        <div>
            <div>
            <h1>Add Employee</h1>
            </div>
            <form onSubmit={(e) => this.onSubmitForm(e)} > 
                <div className="form-group">
                <label>First Name</label>
                    <input 
                        required
                        name='first_name'
                        type="text"
                        className="form-control"
                        onChange={(e) => this.onValueChanged(e)}  />


                </div>
                <div className="form-group">
                <label>Last Name</label>
                    <input 
                        required
                        name='last_name'
                        type="text"
                        className="form-control"
                        onChange={(e) => this.onValueChanged(e)}  />

                </div>

                <div className="form-group">
                <label>Email</label>
                    <input 
                        required
                        name='email'
                        type="text"
                        className="form-control"
                        onChange={(e) => this.onValueChanged(e)} />

                </div>
                <div className="form-group">
                <label>Gender - Male/ Female</label>
                    <input 
                        required
                        name='gender'
                        type="text"
                        className="form-control"
                        onChange={(e) => this.onValueChanged(e)} />
                </div>
                <div className="form-group">
                <label>Salary</label>
                    <input 
                        required
                        name='salary'
                        type="text"
                        className="form-control"
                        onChange={(e) => this.onValueChanged(e)} />
                </div>

                <br />
                <div>
                    <input 
                        name='btnSubmit'
                        type="submit"
                        value="Create" 
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
