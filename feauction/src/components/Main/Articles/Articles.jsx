import React, { useState, useEffect, useContext } from 'react';
import './Articles.scss';
import ArticleCard from './ArticleCard/ArticleCard';
import { UserContext, BlogContext } from '../Main';

const Articles = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('accessToken')));
    const { userContextValue } = useContext(UserContext);
    const { blogContextValue } = useContext(BlogContext);
    const sortedBlogsData = blogContextValue.sort((a, b) => {
        return b.likeCount > a.likeCount ? 1 : -1;
    });

    return (
        <div className="articles-container mt-70">
            {sortedBlogsData !== undefined &&
                (userContextValue[0] !== undefined || !isLoggedIn) &&
                sortedBlogsData.slice(0, 5).map((cardData, index) => {
                    if (index <= 1)
                        return (
                            <div
                                key={index}
                                className="col-lg-6 wow animate__animated animate__fadeIn article-item"
                                data-wow-delay=".1s"
                            >
                                <ArticleCard cardData={cardData} key={index} />
                            </div>
                        );
                    else
                        return (
                            <div
                                key={index}
                                className="col-lg-4 wow animate__animated animate__fadeIn article-item"
                                data-wow-delay=".2s"
                            >
                                <ArticleCard cardData={cardData} key={index} />
                            </div>
                        );
                })}
        </div>
    );
};

export default Articles;
