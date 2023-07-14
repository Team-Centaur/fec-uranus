import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const getReviewMetadata = async (id) => {
  try {
    const response = await axios.get(
      'http://localhost:3001/reviews/meta',
      {
        params: { product_id: id },
        headers: {
          Authorization: apiKey,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default getReviewMetadata;
