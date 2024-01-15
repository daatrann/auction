import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopularTags.scss';
import PopularTagItem from './PopularTagItem/PopularTagItem.jsx';
// import PopularTagsData from './PopularTagsData.json';

const PopularTags = (props) => {
    const { currentTag } = props || '';
    const [data, setData] = useState([]);
    const url = 'https://bidviet.onrender.com/tag';

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="popular-tags row mt-70 mb-50">
            {data
                .filter((tagData) => tagData.tag !== currentTag)
                .slice(0, 6)
                .map((tagData, index) => {
                    return <PopularTagItem tagData={tagData} key={index} />;
                })}
        </div>
    );
};

export default PopularTags;
