import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state;

        axios.post("http://localhost:5000/users/login/", { username: username, password: password })
            .then(function (response) {
                console.log(response)
                if (response.data === "Login successful") {
                    window.confirm("You have successfully logged in!")
                    window.location = "/"
                } else if (response.data !== "Login successful") {
                    window.confirm("Wrong username or password!");
                    window.location = "/login"
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const { username, password } = this.state
        return (
            <div id='background-container'>
                <img id='home-background-img' src='background.jpg' alt='homepage-background'></img>
                <form id="login" onSubmit={this.handleSubmit} class="container" >
                    <fieldset>
                        <legend> <h2>LOGIN</h2> </legend>
                        <div className="form-inputs">
                            <input
                                className='inputs'
                                type='text'
                                placeholder='Enter Username'
                                name='username'
                                value={username}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <div className='form-inputs'>
                            <input
                                className='inputs'
                                type='password'
                                placeholder='Enter Password'
                                name='password'
                                value={password}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <div className='clearfix'>
                            <button type='submit' className='loginbtn'>Login</button>

                            <Link id='signuplink' to="/signup">Don't have an account?</Link>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    };
}

export default withRouter(Login);