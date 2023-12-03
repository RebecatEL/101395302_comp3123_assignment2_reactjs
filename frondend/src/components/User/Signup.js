import React, { Component } from 'react'
import AxiosApi from '../../api/AxiosApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
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
        const { username, password, email } = this.state
        const data = {
            username,
            password,
            email
        }
        try {
            const response = await AxiosApi.post('/api/v1/user/', data, { withCredentials: true });
            console.log(response);
            if (response.data) {
                alert('Created user successfully')
            }
        
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                this.setState({ error: error.response.data.message });
            } else {
                this.setState({ error: 'An unexpected error occurred.' });
            }
        }
    }



  render = () => {
    const { error } = this.state;
    return (
        
        <div>
        <div>
            
            <div>
            <h1>Register</h1>
            </div>
            <form onSubmit={(e) => this.onSubmitForm(e)} > 
                <div className="form-group">
                <label>Username</label>
                    <input 
                        required
                        name='username'
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
                        onChange={(e) => this.onValueChanged(e)}  />

                </div>

                <div className="form-group">
                <label>Password</label>
                    <input 
                        required
                        name='password'
                        type="password"
                        className="form-control"
                        onChange={(e) => this.onValueChanged(e)} />

                </div>
                <div className="form-group">
                    <input 
                        name='btnSubmit'
                        type="submit"
                        value="Register" 
                        className="btn btn-primary"/>
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
