import React from 'react';
import './Banner.scss';

import Typewriter from 'typewriter-effect';

const Banner = () => {
    return (
        <div className="banner">
            <div className="row align-items-end">
                <div className="col-lg-6 pt-100 banner-col1">
                    <span
                        className="banner-greet text-sm-bold color-gray-600 wow animate__animated animate__fadeInUp"
                        style={{ visibility: 'visible' }}
                    >
                        Hello Everyone!
                    </span>
                    <h1
                        className="mt-20 mb-20 color-gray-50 wow animate__animated animate__fadeInUp"
                        style={{ visibility: 'visible' }}
                    >
                        I’m
                        <Typewriter
                            options={{ loop: true }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('<span class="typewrite color-linear">Designer</span>')
                                    .pauseFor(1500)
                                    .deleteAll()
                                    .typeString('<span class="typewrite color-linear">Creator</span>')
                                    .pauseFor(1500)
                                    .deleteAll()
                                    .typeString('<span class="typewrite color-linear">Blogger</span>')
                                    .pauseFor(1500)
                                    .deleteAll()
                                    .start();
                            }}
                        />
                    </h1>
                    <div className="row">
                        <div className="col-lg-9">
                            <p
                                className="text-base color-gray-600 wow animate__animated animate__fadeInUp"
                                style={{ visibility: 'visible' }}
                            >
                                I use animation as a third dimension by which to simplify experiences and kuiding thro
                                each and every interaction. I’m not adding motion just to spruce things up, but doing it
                                in ways that.
                            </p>
                        </div>
                    </div>
                    <div
                        className="mt-40 box-subscriber mb-50 wow animate__animated animate__fadeInUp"
                        style={{ visibility: 'visible' }}
                    >
                        <div className="bg-gray-800 inner-subscriber">
                            <form className="d-flex" action="#">
                                <input className="input-sybscriber" type="text" placeholder="Type your email address" />
                                <button className="btn btn-linear btn-arrow-right">
                                    Subscribe
                                    <i className="fi-rr-arrow-small-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 img-container">
                    <div className="banner-img position-relative wow animate__animated animate__fadeIn">
                        <img
                            src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/page/homepage1/banner.png"
                            alt="Genz"
                        />
                        <div className="pattern-1">
                            <img
                                src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/pattern-1.svg"
                                alt="Genz"
                            />
                        </div>
                        <div className="pattern-2">
                            <img
                                src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/pattern-2.svg"
                                alt="Genz"
                            />
                        </div>
                        <div className="pattern-3">
                            <img
                                src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/pattern-3.svg"
                                alt="Genz"
                            />
                        </div>
                        <div className="pattern-4">
                            <img
                                src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/pattern-4.svg"
                                alt="Genz"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
