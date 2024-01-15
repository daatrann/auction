import React from 'react';
import './UserInfo.scss';

const UserInfo = (props) => {
    const { userData } = props;
    const avatar =
        'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg';

    return (
        <div className="user-info">
            <img className="user-ava" src={avatar} alt="Avatar" />
            <div>
                <h2 className="color-linear d-inline-block mb-10 wow animate__animated animate__fadeInUp">
                    {userData.username}
                </h2>
                <p className="text-sm color-gray-500 wow animate__animated animate__fadeInUp">{userData.email}</p>
                <p className="text-sm color-gray-500 wow animate__animated animate__fadeInUp">UserId:{userData.id}</p>
            </div>
        </div>
    );
};

export default UserInfo;
