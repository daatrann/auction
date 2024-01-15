import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

import { notifyLogin } from '../../services/EventSetrvices';
import { sendDataToServer } from '../../services/UserServices';
import { urlsignIn } from '../../services/UrlService';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import AuthenSocial from '../AuthenticationSocial/AuthenSocial';

function Login() {
    const navigate = useNavigate();
    const [typePass, setTypePass] = useState(true);
    const [formError, setFormError] = useState({});
    const [viewpass, setViewpass] = useState(true);

    // init formvalue
    const initialValues = { userName: '', password: '' };
    const [formValues, setFormValues] = useState(initialValues);

    const handleSubmit = (e) => {
        setFormError(validate(formValues));
        e.preventDefault();

        if (Object.keys(formError).length) {
            sendDataToServer(formValues, urlsignIn)
                .then((data) => {
                    localStorage.setItem('accessToken', data.access_token);
                    navigate('/home');
                })
                .catch((err) => {
                    notifyLogin();
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
        if (!value.email) {
            error.email = 'email is required';
        }
        if (!value.password) {
            error.password = 'Password is required';
        } else if (value.password.length < 4) {
            error.password = 'Password must be more than 4 characters !';
        } else if (value.password.length > 20) {
            error.password = 'Password cannot exceed more than 20 characters !';
        }
        return error;
    };
    const handleChangePassView = () => {
        setViewpass(!viewpass);
        setTypePass(!typePass);
    };

    return (
        <div className="cover-home">
            <div className="container">
                <div className="main-text">
                    <h2> Welcome back !</h2>
                </div>

                <div className="box-form-login">
                    <div className="form-login">
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="form-control"
                                    value={formValues.userName}
                                    name="userName"
                                    onChange={handleChange}
                                />

                                <p>{formError.userName}</p>
                            </div>

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

                            <div className="form-group passrel">
                                <input
                                    type={typePass ? 'password' : 'text'}
                                    placeholder="Password"
                                    className="form-control"
                                    value={formValues.password}
                                    name="password"
                                    onChange={handleChange}
                                />

                                <p>{formError.password}</p>
                                <span className="view" onClick={handleChangePassView}>
                                    {viewpass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </span>
                            </div>
                            <div className="form-group">
                                <a className="color-white">Forgot password?</a>
                            </div>
                            <div className="form-group">
                                <button className="btn" type="submit">
                                    Login
                                </button>
                            </div>

                            <div className="form-group">
                                <span className="forgetpw">Don’t have an account?</span>
                                <a className="color-linear" href="/user/signup">
                                    Sign Up
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
export default Login;
