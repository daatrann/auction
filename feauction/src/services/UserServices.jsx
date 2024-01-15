import axios from '../utils/baseAxios';
import moment from 'moment';

const path = 'user/login';

export const sendDataToServer = async (data, url) => {
    try {
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchData = async (Url, token) => {
    try {
        const response = await axios.get(Url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async (token) => {
    return await axios.get(`${path}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getUserById = async (userId) => {
    return await axios.get(`${path}/${userId}`);
};

export const handleTimeFormat = (timestamp) => {
    return moment(timestamp).format('YYYY-MM-DD [at] h:mm:ss a');
};

export const markOneNoti = (Url, token) => {
    return new Promise((resolve, reject) => {
      axios
        .get(Url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const putWithToken = (url, token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  };
  