import './AuthenSocial.scss';
import facebook from '../../assets/img/img-login/facebook.svg';
import google from '../../assets/img/img-login/google.svg';
import twitter from '../../assets/img/img-login/twitter-color.svg';
import jwtDecode from 'jwt-decode';

import { useState } from 'react';
import { notifyLogin } from '../../services/EventSetrvices';
import { useNavigate } from 'react-router-dom';
import { sendDataToServer } from '../../services/UserServices';
import { urlSocial } from '../../services/UrlService';
import { GoogleLogin } from '@react-oauth/google';
// import LoginSocialFacebok from 'react-facebook-login';

const AuthenSocial = () => {
    const navigate = useNavigate();
    //init formvalueSocial
    const initialValueSocial = { socialId: '', email: '', name: '', social: '' };
    const [formValueSocial, setFormValueSocial] = useState(initialValueSocial);

    //handle login google
    const handleLoginGG = (response) => {
        formValueSocial.name = jwtDecode(response.credential).name;
        formValueSocial.email = jwtDecode(response.credential).email;
        formValueSocial.socialId = jwtDecode(response.credential).sub;
        formValueSocial.social = 'google';
        
        // sendDataToServer(formValueSocial)
        sendDataToServer(formValueSocial, urlSocial) //send form data to take token
            .then((data) => {
                localStorage.setItem('accessToken', data.access_token);
                navigate('/home');
            })
            .catch((err) => {
                notifyLogin();
            })
    };

    return (
        <div className="box-login-other">
            <div className="box-login-gmail btn-facebook">
                <a className="btn" href="/page-login#">
                    <img src={facebook} alt="facebook" />
                </a>
            </div>
            <div className="box-login-gmail twittwr">
                <a className="btn">
                    <img src={twitter} alt="twitter" />
                </a>
            </div>
            <div className="box-login-gmail parent-login">
                <a className="btn">
                    <img src={google} alt="google" />
                </a>
                <div className="children-login">
                    <GoogleLogin
                        onSuccess={handleLoginGG}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        theme="dark"
                        icon="false"
                    />
                </div>
            </div>
        </div>
    );
};
export default AuthenSocial;
