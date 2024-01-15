import React, { useEffect, useState } from 'react';
import './RecentPosts.scss';
import RecentPost from './RecentPost/RecentPost';
import ReactPaginate from 'react-paginate';

import { getAllBlogs } from '../../../../services/BlogServices';

// style="visibility: visible;">

const PaginatedItems = ({ blogData, itemsPerPage }) => {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = blogData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(blogData.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % blogData.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <h2 className="mb-10 color-linear d-inline-block">Recent posts</h2>
            <p className="text-lg color-gray-500">Don't miss the latest trends</p>
            <div className="box-list-posts mt-70">
                {currentItems &&
                    currentItems.map((data, index) => {
                        // return <RecentPost posts={currentPosts} data={data} key={index} />;
                        return <RecentPost data={data} key={index} style={{ visibility: 'visible' }} />;
                    })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={'pagination'}
            />
        </>
    );
};

const RecentPosts = () => {
    const [isBlogDataFetched, setIsBlogDataFetched] = useState(false);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        getAllBlogs()
            .then((response) => {
                setIsBlogDataFetched(true);
                setBlogData(
                    response.data.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }),
                );
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            {isBlogDataFetched ? (
                <PaginatedItems itemsPerPage={5} blogData={blogData} />
            ) : (
                <p className='text-sm color-gray-700"'>Loading....</p>
            )}
        </>
    );
};

export default RecentPosts;
