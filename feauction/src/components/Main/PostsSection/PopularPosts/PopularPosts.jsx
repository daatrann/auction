import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopularPost from './PopularPost/PopularPost';
import './PopularPosts.scss';
import { getAllBlogs } from '../../../../services/BlogServices';

const PopularPosts = () => {
    const [blogData, setBlogData] = useState([]);
    const [isBlogDataFetched, setIsBlogDataFetched] = useState(false);

    useEffect(() => {
        getAllBlogs()
            .then((response) => {
                setBlogData(
                    response.data.sort((a, b) => {
                        return b.view > a.view ? 1 : -1;
                    }),
                );
                setIsBlogDataFetched(true);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="border-gray-800 box-sidebar bg-gray-850">
            <div className="head-sidebar wow animate__ animate__fadeIn animated" style={{ visibility: 'visible' }}>
                <h5 className="line-bottom">Popular Posts</h5>
            </div>
            <div className="content-sidebar">
                <div className="list-posts">
                    {isBlogDataFetched &&
                        blogData.slice(0, 5).map((data, index) => {
                            return <PopularPost data={data} key={index}></PopularPost>;
                        })}
                </div>
            </div>
        </div>
    );
};

export default PopularPosts;
