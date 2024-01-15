import React from 'react';
import './PostsSection.scss';
import RecentPosts from './RecentPosts/RecentPosts';
import PopularPosts from './PopularPosts/PopularPosts';
import LastComments from './LastComments/LastComments';
import SocialPreview from './SocialPreview/SocialPreview';

const PostsSection = () => {
    return (
        <div className="post-section row mt-70">
            <div className="recent-posts col-lg-8">
                <RecentPosts />
            </div>
            <div className="side-section col-lg-4">
                <PopularPosts />
                <LastComments />
                <SocialPreview />
            </div>
        </div>
    );
};

export default PostsSection;
