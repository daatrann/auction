import 'animate.css';
import './Header.scss';
import Notification from './Notification/notification';
import React, { useEffect, useState, useContext, createContext } from 'react';
import SideNav from './SideNav/SideNav';
import SearchBar from '../SearchBar/SearchBar';
import UserProfile from './UserProfile/UserProfile';
import axios from 'axios';

export const UserContext = createContext();

const Header = () => {
    const [userContextValue, setUserContextValue] = useState({}); //* userData
    const userInfoUrl = 'https://bidviet.onrender.com/user/profile';
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('accessToken')));
    const accessToken = localStorage.getItem('accessToken');

    const [ToggleSideNav, showSideNav] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        isLoggedIn &&
            axios
                .get(userInfoUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setUserContextValue(response.data);
                })
                .catch((error) => console.log(error));
    }, []);

    return (
        <UserContext.Provider value={{ userContextValue, setUserContextValue }}>
            <header className="header header-stick sticky-bar stick">
                <div className="header-container">
                    <div className="header-main">
                        <div className="header-logo">
                            <a href="/" className="header-logo-item">
                                <img
                                    // src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/logo.svg"
                                    alt="BidViet Auction"
                                />
                            </a>
                        </div>
                        <div className="nav">
                            <nav className={ToggleSideNav ? 'nav-menu sidenav-active' : 'nav-menu'}>
                                <ul className="menu" id="menu">
                                    <li className="menu-item menu-item-has-children">
                                        <a className="active" href="/" data-toggle="sub-menu">
                                            Home
                                        </a>
                                    </li>

                                    {localStorage.getItem('accessToken') ? (
                                        <li className="menu-item menu-item-has-children">
                                            <a href="/product" data-toggle="sub-menu">
                                                Product Bid
                                            </a>
                                        </li>
                                    ) : (
                                        ''
                                    )}

                                    <li className="menu-item menu-item-has-children">
                                        <a href="/contact" data-toggle="sub-menu">
                                            Contact
                                        </a>
                                    </li>

                                    {localStorage.getItem('roleUser') === 'blogger' ? (
                                        <li className="menu-item menu-item-has-children">
                                            <a href={`/user/${userId}`} data-toggle="sub-menu">
                                                My blogs
                                            </a>
                                        </li>
                                    ) : (
                                        ''
                                    )}

                                    {localStorage.getItem('roleUser') === 'admin' ? (
                                        <li className="menu-item menu-item-has-children">
                                            <a href="/admin" data-toggle="sub-menu">
                                                Admin
                                            </a>
                                        </li>
                                    ) : (
                                        ''
                                    )}
                                    {!isLoggedIn && (
                                        <>
                                            <li className="menu-item menu-item-has-children">
                                                <a className="active" href="/user/signup" data-toggle="sub-menu">
                                                    Create an account!
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>

                        <SideNav className="sidenav" />

                        <div className="header-right">
                            <SearchBar />
                            <Notification />
                            {!localStorage.getItem('accessToken') ? (
                                <a href="user/login" className="btn btn-linear">
                                    Login
                                </a>
                            ) : (
                                <UserProfile />
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </UserContext.Provider>
    );
};

export default Header;
