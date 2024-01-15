import React from 'react';
import './SocialPreview.scss';
import SocialPreviewData from './SocialPreviewData.json';

const SocialPreview = () => {
    return (
        <div className="box-sidebar bg-gray-850 border-gray-800">
            <div className="head-sidebar">
                <a href="/home">
                    <img
                        src="https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/template/logo.svg"
                        alt="Genz"
                    />
                </a>
                <h6 className="color-gray-700">Follow us on instagram</h6>
            </div>
            <div className="content-sidebar">
                <div className="row mt-30 mb-10">
                    {SocialPreviewData.slice(0, 9).map((data, index) => {
                        return (
                            <div
                                key={index}
                                className="img-item col-sm-4 col-4 mb-20 wow animate__ animate__fadeIn animated"
                                style={{ visibility: 'visible' }}
                            >
                                <a href="/#">
                                    <img className="bdrd-8" src={data.imageUrl} alt="Genz" />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SocialPreview;
