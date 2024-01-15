// import axios from '../utils/baseAxios';

// //! BLOG
// export const getAllBlogs = async () => {
//     return await axios.get(`blog`);
// };

// export const getBlogById = async (blogId) => {
//     return await axios.get(`blog/${blogId}`);
// };

// export const postBlog = async (blogId, token, blogData) => {};

// export const updateBlog = async (blogId, token, updatedBlogData) => {
//     return await axios.patch(`blog/${blogId}`, updatedBlogData, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// export const deleteBlog = async (blogId, token) => {
//     return await axios.delete(`blog/${blogId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// //! LIKE
// export const likeBlog = async (blogId, token) => {
//     return await axios.post(
//         `blog/${blogId}/like`,
//         {},
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         },
//     );
// };

// //! COMMENT
// export const postComment = async (blogId, commentContent, token) => {
//     return await axios.post(
//         `blog/${blogId}/comment`,
//         { content: commentContent },
//         { headers: { Authorization: `Bearer ${token}` } },
//     );
// };

// export const updateComment = async (blogId, commentId, editedCommentContent, token) => {
//     return await axios.put(
//         `blog/${blogId}/comment/${commentId}`,
//         { content: editedCommentContent },
//         { headers: { Authorization: `Bearer ${token}` } },
//     );
// };

// export const deleteComment = async (blogId, commentId, token) => {
//     return await axios.delete(`/blog/${blogId}/comment/${commentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
// };

// //! TAG
// export const getBlogsByTag = async (tag) => {
//     return await axios.get(`blog/get-blog-by-tag/${tag}`);
// };

// export const getAllTags = async () => {
//     return await axios.get(`tag`);
// };

// //upload file
// export const uploadFile = (file, token, urlUpload) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return axios.post(urlUpload, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// export const sentPostToServer = (data, token, urlblog) => {
//     return new Promise(async (resolve, reject) => {
//         const headers = {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         };
//         try {
//             const response = await axios.post(urlblog, data, { headers });
//             resolve(response.data);
//         } catch (error) {
//             console.error(error);
//             reject(error);
//         }
//     });
// };
