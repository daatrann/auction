import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScrollUp from '../../components/ScrollUp/ScrollUp';
import ProfileMain from '../../components/ProfileMain/ProfileMain';
import WithAuthorization from '../../components/withAuthorization';

const Profile = () => {
    const { _id } = useParams();
    return (
        <>
            <Header />
            <ProfileMain userId={_id} />
            <ScrollUp />
            <Footer />
        </>
    );
};
export default WithAuthorization(['blogger', 'admin'])(Profile);
