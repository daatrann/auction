import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SearchBar.scss';
import SearchResult from './SearchResult/SearchResult';

const SearchBar = () => {
    const [ToggleSearchBox, showSearchBox] = useState(false);
    const searchBoxRef = useRef(null);
    const searchIconRef = useRef(null);
    const [tagData, setTagData] = useState([]);
    const [blogData, setBlogData] = useState([]);

    const blogsUrl = 'https://bidviet.onrender.com/blog';
    const tagsUrl = 'https://bidviet.onrender.com/tag';
    // const baseUrl = 'http://localhost:3000';

    const [userInput, setUserInput] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        axios
            .get(blogsUrl)
            .then((response) => {
                setBlogData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .get(tagsUrl)
            .then((response) => {
                setTagData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const debounce = (fn, delay) => {
        let timer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        };
    };

    const handleSearch = debounce(() => {
        setQuery(userInput);
    }, 500);

    // {
    //     "title": "t3",
    //     "tags": [
    //       {
    //         "tag": "animal",
    //         "id": 4
    //       },
    //       {
    //         "tag": "dog",
    //         "id": 5
    //       }
    //     ]
    // }

    const filteredBlogs =
        blogData.filter((blog) => {
            const titleMatch = blog.title.toLowerCase().includes(query.toLowerCase());

            const blogTags = blog.tags;
            const tagMatch = blogTags.some((tag) => {
                return tag.tag.toLowerCase().includes(query.toLowerCase());
            });

            return titleMatch || tagMatch;
        }) || [];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                searchBoxRef.current &&
                !searchIconRef.current.contains(e.target) &&
                !searchBoxRef.current.contains(e.target)
            ) {
                showSearchBox(false);
                console.log('clicked outside');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchBoxRef]);

    const handleSearchClick = (event) => {
        event.preventDefault();
        showSearchBox(true);
    };

    return (
        <>
            <a ref={searchIconRef} href="#" className="btn btn-search" onClick={handleSearchClick}></a>
            {ToggleSearchBox && (
                <div ref={searchBoxRef} className="form-search">
                    <form>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search blogs"
                            value={userInput}
                            onChange={handleInputChange}
                            onKeyUp={handleSearch}
                        />
                        <span className="btn-search-2" />
                    </form>
                    <div className="form-search-tags text-start mt20">
                        {query === '' && (
                            <>
                                <p className="form-search-title color-white" href="/#">
                                    Popular tags:
                                </p>

                                {tagData.slice(0, 3).map((tag) => {
                                    return (
                                        <a className="form-search-keywords" href={`/tag/${tag.tag}`} key={tag.id}>
                                            #&nbsp;{tag.tag},
                                        </a>
                                    );
                                })}

                                <p className="form-search-title color-white mt-4" href="/#">
                                    Popular blogs:
                                </p>
                                {blogData.slice(0, 3).map((data, index) => {
                                    return <SearchResult data={data} key={index} />;
                                })}
                            </>
                        )}
                    </div>
                    <div className="results-container">
                        {filteredBlogs.length === 0 ? (
                            <p className="no-blog color-gray-500">No blogs found with that name or tag.</p>
                        ) : (
                            query !== '' &&
                            filteredBlogs.slice(0, 5).map((data, index) => {
                                return <SearchResult data={data} key={index} />;
                            })
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchBar;
