import React from 'react';
import ContactInfor from '../../components/ContactInfor/ContactInfor';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScrollUp from '../../components/ScrollUp/ScrollUp';

const Contact = () => {
    return (
        <>
            <Header />
            <ContactInfor />
            <ScrollUp />
            <Footer />
        </>
    );
};

export default Contact;
