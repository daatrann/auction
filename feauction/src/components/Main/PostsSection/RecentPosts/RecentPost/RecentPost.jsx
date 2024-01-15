import React from 'react';
import './RecentPost.scss';
import { handleTimeFormat } from '../../../../../utils/TimeFormat';

const truncateString = (str) => {
    if (str.length > 80) {
        return str.slice(0, 80) + '...';
    } else {
        return str;
    }
};

const RecentPost = (props) => {
    const { data } = props;
    const tags = data.tags || [];

    const imgUrl =
        data.imageUrl ||
        'https://jthemes.net/themes/wp/genz/wp-content/themes/genz//assets/imgs/page/homepage1/img-news-1.jpg';

    return (
        <div className="card-list-posts wow animate__ animate__fadeIn animated" style={{ visibility: 'visible' }}>
            <div className="card-image hover-up" style={{ visibility: 'visible' }}>
                <a href={`/blog/${data.id}`}>
                    <img src={imgUrl} alt="Genz" />
                </a>
            </div>
            <div className="card-info">
                <span className="mr-10 bg-gray-800 btn btn-tag hover-up" style={{ visibility: 'visible' }}>
                    {data.likeCount} likes
                </span>
                <span className="bg-gray-800 btn btn-tag hover-up" style={{ visibility: 'visible' }}>
                    {data.cmtCount} comments
                </span>
                <a href={`/blog/${data.id}`}>
                    <h4 className="mb-20 mt-15 color-white" style={{ visibility: 'visible' }}>
                        {data.title}
                    </h4>
                </a>
                <div className="mt-20 sub-info">
                    <div className="col-7">
                        {tags.length >= 1 &&
                            tags.slice(0, 2).map((tag, index) => {
                                return (
                                    <a className="text-sm color-gray-700 mr-15" href={`/tag/${tag.tag}`} key={index}>
                                        # {tag.tag}
                                    </a>
                                );
                            })}
                    </div>
                </div>
                <div className="">
                    <span className="text-sm color-gray-700 timeread">{handleTimeFormat(data.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default RecentPost;
