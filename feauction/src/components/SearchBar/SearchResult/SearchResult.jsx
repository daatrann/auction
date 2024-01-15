import React from 'react';
import './SearchResult.scss';

const SearchResult = (props) => {
    const { data } = props;
    const Tags = data.tags;
    console.log(data.id);

    return (
        <a href={`/blog/${data.id}`}>
            <div
                className="search-result hover-up hover-neon wow animate__ animate__fadeIn animated"
                data-wow-delay="0.1s"
            >
                <div className="result-info">
                    <a className="color-gray-500 search-result-title" href={`/blog/${data.id}`}>
                        {data.title}
                    </a>
                    <div className="search-result-tags">
                        {Tags.slice(0, 2).map((data, index) => {
                            return (
                                <a className="color-gray-700" href={`/blog/${data.id}`} key={data.id}>
                                    #{data.tag}&nbsp;
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default SearchResult;
