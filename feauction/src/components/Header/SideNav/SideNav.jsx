import React, { useState, useEffect } from 'react';
import './SideNav.scss';
import axios from 'axios';

const SideNav = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [ToggleSideNav, showSideNav] = useState(false);
    const [OpenSubmenus, setOpenSubmenus] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('accessToken')));

    const [userData, setUserData] = useState([]);
    const [isUserDataFetched, setIsUserDataFetched] = useState(false);
    const userInfoUrl = 'https://bidviet.onrender.com/user/profile';

    /**
     * If the index is in the array, remove it. If it's not in the array, add it.
     */
    const handleSubmenuToggle = (index) => {
        setOpenSubmenus((prevOpenSubmenus) => {
            /* It's checking if the index is in the array as the submenu is opening. */
            const isOpen = prevOpenSubmenus.includes(index);

            if (isOpen) {
                /* remove index to array as close that submenu */
                return prevOpenSubmenus.filter((i) => i !== index);
            } else {
                /* adding index to array as open that submenu */
                return [...prevOpenSubmenus, index];
            }
        });
    };

    useEffect(() => {
        isLoggedIn &&
            axios
                .get(userInfoUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setUserData(response.data[0]);
                    setIsUserDataFetched(true);
                    localStorage.setItem('roleUser', response.data[0].role.role);
                    localStorage.setItem('userId', response.data[0].id);
                })
                .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="sidenav-wrapper">
                <div className="open-sidenav-container" onClick={() => showSideNav(!ToggleSideNav)}>
                    <div className="open-sidenav-menu .nav-open">
                        <span></span>
                    </div>
                </div>
                <div className="sidenav-content">
                    <div className={ToggleSideNav ? 'nav-sidenav-menu sidenav-active' : 'nav-sidenav-menu'}>
                        <div className="mobile-logo">
                            <a href="#" className="header-logo-item">
                                <img
                                    // src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/logo.svg"
                                    alt="BidViet Auction"
                                />
                            </a>
                        </div>

                        <div
                            className={ToggleSideNav ? 'close-sidenav-menu close-active' : ' close-sidenav-menu'}
                            onClick={() => showSideNav(!ToggleSideNav)}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </div>
                        <ul className="sidenav-menu">
                            {localStorage.getItem('roleUser') === 'admin' ? (
                                <li className="sidenav-menu-item sidenav-menu-item-has-children">
                                    <a className="active" href="#" onClick={() => handleSubmenuToggle(0)}>
                                        Admin
                                    </a>
                                </li>
                            ) : (
                                ''
                            )}
                            <li className="sidenav-menu-item sidenav-menu-item-has-children">
                                <a className="active" href="/home" onClick={() => handleSubmenuToggle(0)}>
                                    Home
                                </a>
                            </li>
                            {isLoggedIn && (
                                <li className="sidenav-menu-item sidenav-menu-item-has-children">
                                    <a href="/postblog">Create Product Bid</a>
                                </li>
                            )}
                            <li className="sidenav-menu-item sidenav-menu-item-has-children">
                                <a href="/product">Product</a>
                            </li>
                            <li className="sidenav-menu-item sidenav-menu-item-has-children">
                                <a href="/contact">Contact</a>
                            </li>
                            {!isLoggedIn && (
                                <li className="sidenav-menu-item sidenav-menu-item-has-children">
                                    <a href="/login">Login</a>
                                </li>
                            )}
                        </ul>

                        {isUserDataFetched && (
                            <div className="sidenav-header">
                                <div className="sidenav-header-top">
                                    <div className="user-account">
                                        <a href="#">
                                            <img
                                                src="https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg"
                                                alt=""
                                            />
                                        </a>
                                        <div className="user-content">
                                            <a>
                                                <h6 className="user-content-name">{userData.username}</h6>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidenav-header-menu">
                                    <ul>
                                        <li>
                                            <a href={`/user/${userData.id}`}>Profile</a>
                                        </li>
                                        <li>
                                            <a href={`/user/${userData.id}`}>My blogs</a>
                                        </li>
                                        <li>
                                            <a href={`/user/${userData.id}`}>Account Setting</a>
                                        </li>
                                        <li>
                                            <a
                                                href="/home"
                                                onClick={() => {
                                                    localStorage.removeItem('accessToken');
                                                    localStorage.removeItem('roleUser');
                                                    localStorage.removeItem('userId')
                                                }}
                                            >
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="sidenav-footer mt-50">
                            <br />
                            Designed by
                            <a href="/home" target="_blank" rel="noopener noreferrer">
                                &nbsp; BidViet Auction
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNav;
