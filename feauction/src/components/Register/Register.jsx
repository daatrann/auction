import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifyRegister } from '../../services/EventSetrvices';
import './Register.scss';
import { ToastContainer } from 'react-toastify';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { sendDataToServer } from '../../services/UserServices';
import { urlSignUp } from '../../services/UrlService';
import AuthenSocial from '../AuthenticationSocial/AuthenSocial';

function RegisterForm() {
    const navigate = useNavigate();
    const [typePassRegister, setTypePassRegister] = useState(true);
    const [formError, setFormError] = useState({});

    const initialValues = { username: '', email: '', password: '', confirmpassword: '' };
    const dataSend = { username: '', email: '', password: '' };

    const [formValues, setFormValues] = useState(initialValues);

    //handel submit
    const handleSubmit = (e) => {
        setFormError(validate(formValues));
        e.preventDefault();

        if (!Object.keys(formError).length) {
            sendDataToServer(formValues, urlSignUp) //send form data to take token
                .then((data) => {
                    localStorage.setItem('accessToken', data.access_token);
                    navigate('/home');
                })
                .catch((err) => {
                    notifyRegister();
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        validate(formValues);
    };

    const validate = (value) => {
        const error = {};

        //regex email
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!value.username) {
            error.username = 'Username is required';
        } else {
            dataSend.username = value.username;
        }

        if (!value.confirmpassword || value.confirmpassword !== value.password) {
            error.confirmpassword = 'Password is not correct';
        }

        if (!value.fullname) {
            error.fullname = 'Fullname is required';
        }

        if (!value.email) {
            error.email = 'Email is required';
        } else if (!regex.test(value.email)) {
            error.email = 'this is not a valid email format !';
        } else {
            dataSend.email = value.email;
        }

        if (!value.password) {
            error.password = 'Password is required';
        } else if (value.password.length < 4) {
            error.password = 'Password must be more than 4 characters !';
        } else if (value.password.length > 20) {
            error.password = 'Password cannot exceed more than 20 characters !';
        } else {
            dataSend.password = value.password;
        }
        return error;
    };

    return (
        <div className="cover-home">
            <div className="container">
                <div className="main-text">
                    <h2>Register</h2>
                </div>

                <div className="box-form-login">
                    <div className="form-login">
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="form-control"
                                    value={formValues.fullname}
                                    onChange={handleChange}
                                    name="fullname"
                                />
                                <p>{formError.fullname}</p>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    name="email"
                                />

                                <p>{formError.email}</p>
                            </div>

                            <div className="form-group">
                                <input
                                    type="identity"
                                    placeholder="Identity"
                                    className="form-control"
                                    value={formValues.identity}
                                    onChange={handleChange}
                                    name="identity"
                                />

                                <p>{formError.identity}</p>
                            </div>

                            <div className="form-group">
                                <input
                                    type="phone"
                                    placeholder="Phone Number"
                                    className="form-control"
                                    value={formValues.phone}
                                    onChange={handleChange}
                                    name="phone"
                                />

                                <p>{formError.phone}</p>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="User name"
                                    className="form-control"
                                    value={formValues.username}
                                    onChange={handleChange}
                                    name="username"
                                />

                                <p>{formError.username}</p>
                            </div>

                            <div className="form-group passrel">
                                <input
                                    type={typePassRegister ? 'password' : 'text'}
                                    placeholder="Password"
                                    className="form-control"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    name="password"
                                />

                                <p>{formError.password}</p>
                                <span className="view" onClick={() => setTypePassRegister(!typePassRegister)}>
                                    {typePassRegister ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </span>
                            </div>

                            <div className="form-group passrel">
                                <input
                                    type={typePassRegister ? 'password' : 'text'}
                                    placeholder="Confirm password"
                                    className="form-control"
                                    value={formValues.confirmpassword}
                                    onChange={handleChange}
                                    name="confirmpassword"
                                />
                                <p>{formError.confirmpassword}</p>
                                <span className="view" onClick={() => setTypePassRegister(!typePassRegister)}>
                                    {typePassRegister ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </span>
                            </div>
                            <div>
                                <ToastContainer
                                    position="bottom-right"
                                    top={8000}
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="dark"
                                />
                            </div>

                            <div className="form-group">
                                <a className="color-white" href="/page-login#"></a>
                            </div>

                            <div className="form-group">
                                <button className="btn" type="submit">
                                    Create an account
                                </button>
                            </div>

                            <div className="form-group">
                                <span className="forgetpw">Already have an account?</span>

                                <a className="color-linear" href="user/login">
                                    Sign In
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="box-line">
                        <span>Or, sign in with your ...</span>
                    </div>
                    <AuthenSocial />
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;
