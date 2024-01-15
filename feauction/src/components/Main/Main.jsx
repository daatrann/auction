import React, { useContext, createContext, useState, useEffect } from 'react';
import Banner from './Banner/Banner';
import TopicsBox from './TopicsBox/TopicsBox';
import Articles from './Articles/Articles';
import PopularTags from './PopularTags/PopularTags';
import PostsSection from './PostsSection/PostsSection';

import { getAllBlogs } from '../../services/BlogServices';
import { getUserProfile } from '../../services/UserServices';

import './Main.scss';

export const UserContext = createContext();
export const BlogContext = createContext();

const Main = () => {
    const [userContextValue, setUserContextValue] = useState({}); //* userData
    const [blogContextValue, setBlogContextValue] = useState({}); //* Blog data
    const [isUserDataFetched, setIsUserDataFetched] = useState(false);
    const [isBlogDataFetched, setIsBlogDataFetched] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('accessToken')));
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        isLoggedIn &&
            getUserProfile(token)
                .then((res) => {
                    console.log('fetching user/profile at main.jsx');
                    setUserContextValue(res.data);
                    setIsUserDataFetched(true);
                })
                .catch((error) => console.log(error));
        getAllBlogs()
            .then((res) => {
                setBlogContextValue(res.data);
                setIsBlogDataFetched(true);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        isBlogDataFetched && (
            <BlogContext.Provider value={{ blogContextValue, setBlogContextValue }}>
                <UserContext.Provider value={{ userContextValue, setUserContextValue }}>
                    <div className="main">
                        <div className="cover-home1">
                            <div className="container">
                                <div className="row">
                                    <div className="single-col col-xl-1"></div>
                                    <div className="main-col col-xl-10 col-lg-12">
                                        <Banner />

                                        <div id="TopicsBox" className="mb-70">
                                            <TopicsBox />
                                        </div>

                                        <h2 className="mb-10 color-linear d-inline-block wow animate__animated animate__fadeInUp">
                                            Editor's picked
                                        </h2>

                                        <p className="text-lg color-gray-500 wow animate__animated animate__fadeInUp">
                                            Featured and highly rated articles
                                        </p>
                                        {blogContextValue && (isUserDataFetched || !isLoggedIn) && <Articles />}

                                        {/* <div className="text-center mt-50 mb-50">
                                            <a
                                                className="btn btn-linear btn-load-more wow animate__animated animate__zoomIn"
                                                href="#postsSection"
                                            >
                                                Show More Posts<i className="fi-rr-arrow-small-right"></i>
                                            </a>
                                        </div> */}

                                        <h2 className="mb-10 color-linear d-inline-block wow animate__animated animate__fadeInUp mt-50">
                                            Popular Tags
                                        </h2>

                                        <p className="text-lg color-gray-500 wow animate__animated animate__fadeInUp">
                                            Most searched keywords
                                        </p>

                                        <PopularTags />
                                        <PostsSection />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </UserContext.Provider>
            </BlogContext.Provider>
        )
    );
};

export default Main;
