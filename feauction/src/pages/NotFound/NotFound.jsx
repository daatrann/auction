import React from 'react';
import './NotFound.scss';

const NoPage = () => {
    return (
        <div className="noPage">
            <div className="noPage_logoContainer">
                <div className="noPage_logo">
                    <a href="/home" className="header-logo-item">
                        <img
                            // src=""
                            alt="BidViet Auction"
                        />
                    </a>
                </div>
            </div>
            <div className="noPage_mainContainer">
                <div className="noPage_main">
                    <div className="pattern-1">
                        <img
                            src=""
                            alt="BidViet Auction"
                        />
                    </div>
                    <div className="pattern-2">
                        <img
                            src=""
                            alt="BidViet Auction"
                        />
                    </div>
                    <div className="pattern-3">
                        <img
                            src=""
                            alt="BidViet Auction"
                        />
                    </div>
                    <div className="pattern-4">
                        <img
                            src=""
                            alt="BidViet Auction"
                        />
                    </div>

                    <h1 className="color-linear noPage_title">Page not found</h1>
                    <h4 className="color-linear noPage_subtitle">
                        Hmm, the page you were looking for doesn’t seem to exist anymore.
                    </h4>
                    <div className="noPage_buttonContainer">
                        <div className="noPage_button btn btn-linear">
                            <a href="/home">Back to home</a>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="noPage_footerContainer">
                <p>BidViet Auction</p>
                <p>404</p>
            </footer>
        </div>
    );
};

export default NoPage;
