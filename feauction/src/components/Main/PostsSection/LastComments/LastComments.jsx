// import React, { useState, useEffect } from 'react';
// import './LastComments.scss';
// import axios from 'axios';
// import CommentItem from './CommentItem/CommentItem';
// import { urlLatestComments } from '../../../../services/UrlService';

// const LastComments = () => {
//     const latestCommentsUrl = `${urlLatestComments}?page=1&limit=5`;
//     const [latestCommentsData, setLatestCommentsData] = useState({}); //* latest comments data
//     const [isCommentsDataFetched, setIsCommentsDataFetched] = useState(false);

//     useEffect(() => {
//         axios
//             .get(latestCommentsUrl)
//             .then((response) => {
//                 setLatestCommentsData(response.data.items);
//                 setIsCommentsDataFetched(true);
//             })
//             .catch((error) => console.log(error));
//     }, []);

//     return (
//         <div className="box-sidebar bg-gray-850 border-gray-800">
//             <div className="head-sidebar wow animate__ animate__fadeIn animated" style={{ visibility: 'visible' }}>
//                 <h5 className="line-bottom">Latest Comments</h5>
//             </div>
//             <div className="content-sidebar">
//                 <div className="list-comments">
//                     {isCommentsDataFetched &&
//                         latestCommentsData?.slice(0, 5).map((data, index) => {
//                             return <CommentItem data={data} key={index} />;
//                         })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LastComments;
