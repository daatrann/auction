import React from 'react';
import './UserProfile.scss';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// style="visibility: visible;">

const UserProfile = () => {
    const _id = localStorage.getItem('userId');

    return (
        <div className="user-profile">
            <ul className="menu" id="menu">
                <li className="menu-item menu-item-has-children">
                    <a href={`/user/profile/${_id}`} data-toggle="sub-menu">
                        <FontAwesomeIcon className="user-icon color-gray-500" icon={faCircleUser} />
                        <span className="material-symbols-outlined">Hello</span>
                    </a>
                    <ul className="sub-menu">
                        <li className="menu-item profile-item">
                            <a href={`/user/profile/${_id}`}>Profile</a>
                        </li>
                        <li className="menu-item profile-item">
                            <a href={`/user/profile/${_id}`}>Bid</a>
                        </li>
                        <li className="menu-item profile-item">
                            <a href={`/user/profile/${_id}`}>Articles Saved</a>
                        </li>
                        <li className="menu-item profile-item">
                            <a href={`/user/profile/${_id}`}>Settings</a>
                        </li>
                        <li
                            className="menu-item profile-item"
                            onClick={() => {
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('roleUser');
                                localStorage.removeItem('userId')
                            }}
                        >
                            <a href="/home">Sign Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default UserProfile;
