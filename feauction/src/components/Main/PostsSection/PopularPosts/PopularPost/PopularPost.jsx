import React from 'react';
import './PopularPost.scss';

const PopularPost = (props) => {
    const { data } = props;
    const imgUrl =
        data.imageUrl ||
        'https://jthemes.net/themes/wp/genz/wp-content/themes/genz/assets/imgs/page/homepage1/img-post2.jpg';

    return (
        <div className="item-post wow animate__ animate__fadeIn animated" style={{ visibility: 'visible' }}>
            <div className="border-gray-800 info-post">
                <a href={`/blog/${data.id}`}>
                    <h6 className="color-white wow animate__ animate__fadeIn animated">{data.title}</h6>
                </a>
                <div className="info-view d-inline-block">
                    <span className="color-gray-700">{data.view} views</span>
                </div>
            </div>
        </div>
    );
};

export default PopularPost;
