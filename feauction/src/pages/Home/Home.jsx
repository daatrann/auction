import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScrollUp from '../../components/ScrollUp/ScrollUp';
import Main from '../../components/Main/Main';

const Home = () => {
    return (
        <>
            <Header />
            {/* <Main href="top" /> */}
            <ScrollUp />
            <Footer />
        </>
    );
};

export default Home;
