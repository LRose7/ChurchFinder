import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val == null && (valid = false);
    });

    return valid;
};

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirmpassword: "",
            formErrors: {
                firstname: "",
                lastname: "",
                email: "",
                username: "",
                password: "",
                confirmpassword: ""
            }
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'firstname':
                formErrors.firstname = value.length < 3 ? 'Minimum 3 characters required'
                    : "";
                break;
            case 'lastname':
                formErrors.lastname = value.length < 3 ? 'Minimum 3 characters required'
                    : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
                break;
            case 'username':
                formErrors.username = value.length < 3 ? 'Minimum 3 characters required'
                    : "";
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'Minimum 6 characters required'
                    : "";
                break;
            case 'confirmpassword':
                formErrors.confirmpassword = value.length < 6 ? 'Minimum 6 characters required'
                    : "";
                break;
            default:
                break;
        }

    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        if (formValid(this.state)) {
            console.log(this.state);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
        axios.post("http://localhost:5000/users/signup", this.state)
            .then(function (response) {
                console.log(response)
                if (response.status ===  200) {
                    window.confirm("You have successfully signed up!")
                    window.location = "/login"
                } else if (response.status !== 200) {
                    window.confirm("Error creating account");
                    window.location = "/signup"
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    };

    render() {
        const { formErrors } = this.state
        const { firstname, lastname, email, username, password, confirmpassword } = this.state

        return (
            <div id='background-container'>
                <img id='home-background-img' src='background.jpg' alt='homepage-background'></img>
                <div className="form-wrapper" class="container">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <fieldset>
                            <legend> <h2>CREATE ACCOUNT</h2> </legend>
                            <div className="firstname">
                                <input
                                    id='firstname-input'
                                    className={formErrors.firstname.length > 0 ? "error" : null}
                                    placeholder="First Name"
                                    type="text"
                                    name="firstname"
                                    noValidate
                                    value={firstname}
                                    onChange={this.handleChange}
                                    required
                                />
                                {formErrors.firstname.length > 0 && (
                                    <span className="errorMessage">{formErrors.firstname}</span>
                                )}
                            </div>
                            <div className="lastname">
                                {/* <label htmlFor="lastname"><b>Last Name: </b></label> */}
                                <input
                                    id='lastname-input'
                                    className={formErrors.lastname.length > 0 ? "error" : null}
                                    placeholder="Last Name"
                                    type="text"
                                    name="lastname"
                                    noValidate
                                    value={lastname}
                                    onChange={this.handleChange}
                                    required
                                />
                                {formErrors.lastname.length > 0 && (
                                    <span className="errorMessage">{formErrors.lastname}</span>
                                )}
                            </div>
                            <div className="email">
                                {/* <label htmlFor="email"><b>Email: </b></label> */}
                                <input
                                    id='email-input'
                                    className={formErrors.email.length > 0 ? "error" : null}
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    noValidate
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="username">
                                {/* <label htmlFor="username"><b>Username: </b></label> */}
                                <input
                                    id='username-input'
                                    className={formErrors.username.length > 0 ? "error" : null}
                                    placeholder="Username"
                                    type="text"
                                    name="username"
                                    noValidate
                                    value={username}
                                    onChange={this.handleChange}
                                    required
                                />
                                {formErrors.username.length > 0 && (
                                    <span className="errorMessage">{formErrors.username}</span>
                                )}
                            </div>
                            <div className="password">
                                {/* <label htmlFor="password"><b>Password: </b></label> */}
                                <input
                                    id='password-input'
                                    className={formErrors.password.length > 0 ? "error" : null}
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="password2">
                                {/* <label htmlFor="password"><b>Confirm Password: </b></label> */}
                                <input
                                    id='confirmpassword-input'
                                    className={formErrors.confirmpassword.length > 0 ? "error" : null}
                                    placeholder=" Repeat Password"
                                    type="password"
                                    name="confirmpassword"
                                    noValidate
                                    value={confirmpassword}
                                    onChange={this.handleChange}
                                    required
                                />
                                {formErrors.confirmpassword.length > 0 && (
                                    <span className="errorMessage">{formErrors.confirmpassword}</span>
                                )}
                            </div>
                            <div className="createAccount">
                                <button type="submit">Sign Up</button>

                                <Link to="/login">Already have an account?</Link>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }

}

export default withRouter(Signup);





