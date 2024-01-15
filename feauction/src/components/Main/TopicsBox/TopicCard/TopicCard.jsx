import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopicCard.scss';

const TopicCard = (data) => {
    const [blogAmount, setBlogAmount] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { tagData } = data;
    const url = `https://bidviet.onrender.com/blog/get-blog-by-tag/${tagData.tag}`;
    const imgUrl = `https://picsum.photos/id/${tagData.id}/500/600/?blur=2`;

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setBlogAmount(response.data[0].length);
                setIsDataFetched(true);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        isDataFetched && (
            <div className="embla__slide">
                <div className="card-style-1">
                    <a href={`/tag/${tagData.tag}`}>
                        <div className="card-image">
                            <img src={imgUrl} alt="Genz" />
                            <div className="card-info">
                                <div className="info-bottom">
                                    <h6 className="mb-5 color-white">{tagData.tag}</h6>
                                    <p className="text-xs color-gray-500">{blogAmount} &nbsp;articles</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    );
};

export default TopicCard;
