import React, { useState, useEffect } from 'react';
import './ScrollUp.scss';

const ScrollUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <a id="scrollUp" href="#top" onClick={scrollToTop}>
                    <i className="fi fi-rr-arrow-small-up"></i>
                </a>
            )}
        </>
    );
};

export default ScrollUp;
