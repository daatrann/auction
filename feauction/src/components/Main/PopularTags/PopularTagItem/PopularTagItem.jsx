import React from 'react';
import './PopularTagItem.scss';

const PopularTagItem = (props) => {
    const { tagData } = props;
    const imgUrl = `https://picsum.photos/id/${tagData.id}/300`;

    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
            <a href={`/tag/${tagData.tag}`}>
                <div
                    className="card-style-2 hover-up hover-neon wow animate__ animate__fadeIn animated"
                    data-wow-delay="0.1s"
                >
                    <div className="card-image">
                        <img src={imgUrl} alt={tagData.tag} />
                    </div>
                    <div className="card-info">
                        <div className="color-gray-500" href={`tag/${tagData.tag}`}>
                            {tagData.tag}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default PopularTagItem;
