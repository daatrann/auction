import React from 'react';
import './CommentItem.scss';
import { handleTimeFormat } from '../../../../../utils/TimeFormat';

const CommentItem = (props) => {
    const { data } = props;
    const authorImg =
        'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg';
    return (
        <div
            className="border-gray-800 item-comment wow animate__ animate__fadeIn animated"
            style={{ visibility: 'visible' }}
        >
            <a href={`/blog/${data.blogId}`}>
                <p className="mb-20 color-gray-500">“ {data.content} “</p>
            </a>
            <div className="box-author-small">
                <a href={`/user/${data.userId}`}>
                    <img src={authorImg} alt="Genz" />
                </a>
                <div className="author-info">
                    <a href={`/user/${data.userId}`}>
                        <h6 className="text-sm d-block color-gray-700">{data.user.username}</h6>
                    </a>
                    <span className="text-xs color-gray-700">On {handleTimeFormat(data.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
