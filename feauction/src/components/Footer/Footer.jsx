import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer" style={{ visibility: 'visible' }}>
            <div className="container">
                <div className="footer-1 bg-gray-850 border-gray-800">
                    <div className="footer-row">
                        <div className="col-lg-4 mb-30">
                            <a href="/home" style={{ visibility: 'visible' }}>
                                <img
                                    // src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/logo.svg"
                                    alt="BidViet Auction"
                                />
                            </a>
                            <p className="mb-20 mt-20 text-sm color-gray-500 wow animate__ animate__fadeInUp animated">
                                Lorem ipsum dolor sit amet consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                            </p>
                            <h6 className="color-white mb-5 wow animate__ animate__fadeInUp animated">Address</h6>
                            <p className="text-sm color-gray-500 wow animate__ animate__fadeInUp animated">
                                Cau Giay
                                <br />
                                Ha Noi, Viet Nam
                            </p>
                        </div>

                        <div className="col-lg-4 mb-30">
                            <h6 className="text-lg mb-30 color-white wow animate__ animate__fadeInUp animated">
                                Navigation
                            </h6>
                            <div className="row">
                                <div className="col-6 footer-menu-col">
                                    <ul className="menu-footer">
                                        <li className="wow animate__ animate__fadeInUp animated">
                                            <a className="color-gray-500" href="/blog-archive">
                                                All Product
                                            </a>
                                        </li>
                                        <li className="wow animate__ animate__fadeInUp animated">
                                            <a className="color-gray-500" href="/blog-archive">
                                                How It Works
                                            </a>
                                        </li>
                                        <li className="wow animate__ animate__fadeInUp animated">
                                            <a className="color-gray-500" href="/blog-archive">
                                                My Account
                                            </a>
                                        </li>
                                        <li className="wow animate__ animate__fadeInUp animated">
                                            <a className="color-gray-500" href="/blog-archive">
                                                About Company
                                            </a>
                                        </li>
                                        <li className="wow animate__ animate__fadeInUp animated">
                                            <a className="color-gray-500" href="/blog-archive">
                                                Help Center
                                            </a>
                                        </li>
                                        <li className="wow animate__ animate__fadeInUp animated">
                                            <a className="color-gray-500" href="/blog-archive">
                                                Terms and Conditions
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-30">
                            <h4 className="text-lg mb-30 color-white wow animate__ animate__fadeInUp animated">
                                Newsletter
                            </h4>
                            <p className="text-base color-gray-500 wow animate__ animate__fadeInUp animated">
                                Sign up to be first to receive the latest stories inspiring us, case studies, and
                                industry news.
                            </p>
                            <div className="form-newsletters mt-15 wow animate__ animate__fadeInUp animated">
                                <form action="#">
                                    <div className="form-group">
                                        <input
                                            className="input-name border-gray-500"
                                            type="text"
                                            placeholder="Your name"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="input-email border-gray-500"
                                            type="email"
                                            placeholder="Emaill address"
                                        ></input>
                                    </div>
                                    <div className="form-group mt-20">
                                        <button className="btn btn-linear hover-up">
                                            Subscribe
                                            <i className="fi-rr-arrow-small-right"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom border-gray-800">
                        <div className="row">
                            <div className="col-lg-5 text-center text-lg-start">
                                <p className="text-base color-white wow animate__ animate__fadeIn animated">
                                    © Created by
                                    <a
                                        className="copyright"
                                        target="_blank"
                                        rel="noreferrer"
                                        href="http://alithemes.com"
                                    >
                                        {' '}
                                        BidViet Auction
                                    </a>
                                </p>
                            </div>
                            <div className="col-lg-7 text-center text-lg-end socials-container">
                                <div className="box-socials">
                                    <div
                                        className="d-inline-block mr-30 wow animate__ animate__fadeIn animated"
                                        data-wow-delay=".0s"
                                    >
                                        <a
                                            className="icon-socials icon-twitter color-gray-500"
                                            href="https://twitter.com"
                                        >
                                            Twitter
                                        </a>
                                    </div>
                                    <div
                                        className="d-inline-block mr-30 wow animate__ animate__fadeIn animated"
                                        data-wow-delay=".2s"
                                    >
                                        <a
                                            className="icon-socials icon-linked color-gray-500"
                                            href="https://www.linkedin.com"
                                        >
                                            LinkedIn
                                        </a>
                                    </div>
                                    <div
                                        className="d-inline-block mr-10 wow animate__ animate__fadeIn animated"
                                        data-wow-delay=".4s"
                                    >
                                        <a
                                            className="icon-socials icon-insta color-gray-500"
                                            href="https://www.instagram.com"
                                        >
                                            Instagram
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
// style="visibility: visible; animation-delay: 0.4s;"
export default Footer;
