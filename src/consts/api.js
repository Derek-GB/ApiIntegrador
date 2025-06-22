const axios = require('axios');
const url = 'https://apiintegrador-production-8ef8.up.railway.app';

const postMethod = async (path, data) => {
  try {
    const response = await axios.post(`${url}/${path}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
}




