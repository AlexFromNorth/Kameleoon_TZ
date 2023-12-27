import axios from 'axios';

export const searchItems = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3100/tests`
    );
    return response.data
  } catch (error) {
    console.error('Error searching for items:', error);
  }
}
export const searchSites = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3100/sites`
    );
    return response.data
  } catch (error) {
    console.error('Error searching for sites:', error);
  }
}

