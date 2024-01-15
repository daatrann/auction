import { AiTwotoneLike, AiOutlineComment, AiOutlineFileDone } from 'react-icons/ai';
import { fetchData, handleTimeFormat, markOneNoti, putWithToken } from '../../../services/UserServices';
import { urlMarkAll, urlNotification, urlOrigin } from '../../../services/UrlService';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { TbBellRinging2 } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
import { io } from 'socket.io-client';

const Notification = () => {
    const [messages, setMessages] = useState([]);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const numberNoti = messages.filter((ms) => ms.isRead === false).length;

    useEffect(() => {
        fetchData(urlNotification, localStorage.getItem('accessToken')).then((response) => {
            setMessages(response);
        });
    }, []);

    const markAll = () => {
        putWithToken(urlMarkAll, localStorage.getItem('accessToken'))
            .then(() => {
                fetchData(urlNotification, localStorage.getItem('accessToken')).then((response) => {
                    setMessages(response);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    ////// socket.......
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            const socket = io(urlOrigin);
            socket.on('connect', () => {
                console.log('Connected to server');
            });
            socket.emit('join', localStorage.getItem('userId'));

            socket.on(`client_${localStorage.getItem('userId')}`, (data) => {
                setMessages((prev) => data.concat(prev));
            });
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        }
    }, []);

    useEffect(() => {
        localStorage.getItem('accessToken') && fetchData(urlNotification, localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    return (
        <>
            {localStorage.getItem('accessToken') ? (
                <div className="notification">
                    <span className="noti-icon">
                        <MdOutlineNotificationsNone />
                    </span>
                    {numberNoti && <div className="number-item">{numberNoti}</div>}
                    <ul className="list-noti">
                        <h3>Notifications</h3>
                        {messages.length > 0 ? (
                            <div className="list-noti-item">
                                <span className="mark-all" onClick={markAll}>
                                    Mark all
                                </span>
                                {messages.map((item) => {
                                    return (
                                        <li
                                            flag
                                            key={item.id}
                                            onClick={() => {
                                                setFlag(!flag);
                                                item.isRead = true;
                                                markOneNoti(
                                                    `${urlNotification}/${item.id}`,
                                                    localStorage.getItem('accessToken'),
                                                ).then((response) => {
                                                    navigate(response.data);
                                                });
                                            }}
                                        >
                                            <div
                                                className={
                                                    item.type === 'like'
                                                        ? 'blue-color type-noti'
                                                        : item.type === 'post'
                                                        ? 'green-color type-noti'
                                                        : 'type-noti'
                                                }
                                            >
                                                {item.type === 'like' ? (
                                                    <AiTwotoneLike />
                                                ) : item.type === 'comment' ? (
                                                    <AiOutlineComment />
                                                ) : (
                                                    <AiOutlineFileDone />
                                                )}
                                            </div>
                                            <div className="content-noti">
                                                <span className="noti-content-item">{item.content}</span>
                                                <span className="content-time">{handleTimeFormat(item.createdAt)}</span>
                                            </div>
                                            <div className="close-noti">{!item.isRead && <RxDotFilled />}</div>
                                        </li>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="empty">
                                <div>
                                    <TbBellRinging2 />
                                </div>
                                <h1>No Notices Right Now!</h1>
                            </div>
                        )}
                    </ul>
                </div>
            ) : (
                ''
            )}
        </>
    );
};
export default Notification;
