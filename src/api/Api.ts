import axios from 'axios';

const searchBooks = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3100/tests`
    );
    return response.data
    // console.log(response)
  } catch (error) {
    console.error('Error searching for books:', error);
  }
}

export default searchBooks;
