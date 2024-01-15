import React, { useState, useEffect } from 'react';
import './ProfileMain.scss';

import UserInfo from './UserInfo/UserInfo';
import { getUserById } from '../../services/UserServices';

const ProfileMain = (props) => {
    const [userData, setUserData] = useState([]);
    const [userBlogData, setUserBlogData] = useState([]);
    const { _id } = props;

    useEffect(() => {
        getUserById(_id)
            .then((response) => {
                setUserData(response.data[0]);
                setUserBlogData(
                    response.data[0].blogs.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }),
                );
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="main">
            <div className="cover-home3">
                <div className="container">
                    <div className="profile-page">
                        <UserInfo userData={userData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMain;
