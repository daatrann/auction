import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopicsBox.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TopicsCarousel from './TopicsCarousel/TopicsCarousel';

const TopicsBox = () => {
    const [tagData, setTagData] = useState([]);
    const url = 'https://bidviet.onrender.com/tag';

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setTagData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="border-gray-800 box-topics bg-gray-850">
            <div className="row">
                <div className="col-lg-2">
                    <h5 className="mb-15 color-white wow animate__ animate__fadeInUp animated" data-wow-delay="0s">
                        Hot topics
                    </h5>
                    <p className="mb-20 color-gray-500 wow animate__ animate__fadeInUp animated" data-wow-delay=".3s">
                        Don't miss out on the latest news about Travel tips, Hotels review, Food guide...
                    </p>
                </div>

                <div className="col-lg-10">
                    <div className="box-swiper">
                        <div className="swiper-container swiper-group-5">
                            {tagData && <TopicsCarousel tagData={tagData} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicsBox;
