import React from 'react';
import './CategoryItem.scss';

const CategoryItem = (props) => {
    const { data } = props;
    const imageUrl = `https://picsum.photos/id/${data.id}/300`;

    return (
        <div
            className="item-cats border-gray-800 card-style-2 hover-up hover-neon wow animate__ animate__fadeIn animated"
            style={{ visibility: 'visible' }}
        >
            <div className="cat-left">
                <div className="image-cat">
                    <a href={`/tag/${data.tag}`}>
                        <img src={imageUrl} alt="Genz" />
                    </a>
                </div>
                <div className="info-cat">
                    <a className="color-gray-500 text-xl" href={`/tag/${data.tag}`}>
                        {data.tag}
                    </a>
                </div>
            </div>
            {/* <div className="cat-right">
                <a className="btn btn-small text-sm color-gray-500 bg-gray-800" href="/blog-archive">
                    {data.postsNum}&nbsp;posts
                </a>
            </div> */}
        </div>
    );
};

export default CategoryItem;
