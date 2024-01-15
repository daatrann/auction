import React, { useState, useContext } from 'react';
import './ArticleCard.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../Main';

import { io } from 'socket.io-client';
import { handleTimeFormat } from '../../../../utils/TimeFormat';

const truncateString = (str) => {
    if (str.length > 80) {
        return str.slice(0, 80) + '...';
    } else {
        return str;
    }
};

const ArticleCard = (props) => {
    const { cardData } = props;
    const isLoggedIn = useState(Boolean(localStorage.getItem('accessToken')));
    const { userContextValue } = useContext(UserContext);

    const accessToken = localStorage.getItem('accessToken');
    const tags = cardData.tags;

    const bannerUrl = cardData.imageUrl || 'https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg';
    const authorAvaUrl =
        'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg';

    const hasLikeWithIdOne =
        userContextValue[0] !== undefined &&
        cardData.likes !== undefined &&
        cardData.likes.some((like) => like.userId === userContextValue[0].id);
    const [numLikes, setNumLikes] = useState(cardData.likes.length);
    const [likeStatus, setLikeStatus] = useState(
        hasLikeWithIdOne && Boolean(localStorage.getItem('accessToken')) ? 'unlike' : 'like',
    );
    const [iconStatus, setIconStatus] = useState(
        hasLikeWithIdOne && Boolean(localStorage.getItem('accessToken')) ? faSolidHeart : faHeart,
    );
    const blogId = cardData.id; // Replace with the ID of the post you want to like

    const handleLike = () => {
        if (isLoggedIn) {
            const action = likeStatus === 'like' ? 'unlike' : 'like';

            //!SOCKET
            const data = {
                blogId: cardData.id,
                userIdSent: userContextValue[0].id,
            };

            const socket = io('https://bidviet.onrender.com', {
                extraHeaders: {
                    authorization: `${accessToken}`,
                },
            });
            socket.on('connect', () => {
                console.log('Connected to server');
            });
            socket.emit('notification', data);
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            axios
                .post(
                    `https://bidviet.onrender.com/blog/${blogId}/like`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                )
                .then((response) => {
                    setLikeStatus(action);
                    console.log(`Post ${action}d successfully`);
                    axios
                        .get(`https://bidviet.onrender.com/blog/${blogId}`)
                        .then((response) => {
                            setIconStatus(action === 'unlike' ? faSolidHeart : faHeart);
                            setNumLikes(response.data.likes.length);
                        })
                        .catch((error) => {
                            console.error('Error getting number of likes:', error);
                        });
                })
                .catch((error) => {
                    console.error(`Error ${action}ing post:`, error);
                });
        } else {
            alert('You must log in to like the blog');
        }
    };

    return (
        <div className="card-blog-1 hover-up">
            <div className="mb-20 card-image">
                <a href={`/blog/${cardData.id}`}>
                    <img src={bannerUrl} alt="Genz" />
                </a>
            </div>
            <div className="card-info">
                <div className="sub-info">
                    <div className="col-7">
                        {tags.map((tag, index) => {
                            return (
                                <a className="text-sm color-gray-700" href={`/tag/${tag.tag}`} key={index}>
                                    #{tag.tag}
                                </a>
                            );
                        })}
                    </div>
                </div>
                <a href={`/blog/${cardData.id}`}>
                    <h4 className="mt-20 color-white"> {truncateString(cardData.title)} </h4>
                </a>
                <div className="row align-items-center mt-25 info-container">
                    <div className="col-7">
                        <div className="box-author">
                            <a className="author-ava" href={`/user/${cardData.userId}`}>
                                <img src={authorAvaUrl} alt="Genz" />
                            </a>
                            <div className="author-info">
                                <a href={`/user/${cardData.userId}`}>
                                    <h6 className="author-name color-gray-700">{cardData.user.username}</h6>
                                </a>
                                <p className="text-sm color-gray-700">{handleTimeFormat(cardData.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="dataDis col-5 text-end">
                        <div className="subDis">
                            <span className="numberCount color-gray-700">{numLikes}</span>
                            <FontAwesomeIcon
                                id="like-button"
                                onClick={handleLike}
                                disabled={!likeStatus}
                                className="icon color-gray-500"
                                icon={iconStatus}
                            />
                        </div>
                        <div className="subDis">
                            <span className="numberCount color-gray-700">{cardData.cmtCount}</span>
                            <FontAwesomeIcon className="icon color-gray-500" icon={faComment} />
                        </div>
                        <div className="subDis">
                            <span className="numberCount color-gray-700">{cardData.shareCount}</span>
                            <FontAwesomeIcon className="icon color-gray-500" icon={faShareSquare} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
