import axios from "axios";

const generatePublicKey = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API}/auth/generate-public-key`
    );
    return response?.data?.data?.publicKey;
  } catch (error) {
    return error.response.data.message;
  }
};

export { generatePublicKey };
